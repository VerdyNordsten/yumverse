"use client";

import { RecipeMeta } from "@/components/recipe/recipe-meta";
import { RatingStars } from "@/components/recipe/rating-stars";
import { FavoriteButton } from "@/components/recipe/favorite-button";
import { IngredientGroup } from "@/components/recipe/ingredient-group";
import { StepItem } from "@/components/recipe/step-item";
import { CategoryPill } from "@/components/recipe/category-pill";
import { TagPill } from "@/components/recipe/tag-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Clock, Users, ChefHat, Edit, Trash, Utensils, Timer, Award, Heart, Share2 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Mock data for demonstration
const mockRecipe = {
  id: 1,
  slug: "fluffy-pancakes",
  title: "Fluffy Pancakes",
  description: "Light and fluffy pancakes perfect for breakfast. These pancakes are incredibly easy to make and always turn out perfect.",
  coverUrl: "/demo-img.png",
  cookTimeMins: 20,
  servings: 4,
  difficulty: "Easy",
  author: {
    id: "user_1",
    name: "Alice Johnson",
    image: "",
    bio: "Professional chef and food blogger"
  },
  categories: [
    { id: 1, slug: "breakfast", name: "Breakfast" },
    { id: 2, slug: "quick", name: "Quick & Easy" }
  ],
  tags: [
    { id: 1, slug: "comfort-food", name: "Comfort Food" },
    { id: 2, slug: "budget-friendly", name: "Budget Friendly" }
  ],
  avgRating: 4.5,
  favoritesCount: 124,
  nutrition: {
    calories: 320,
    protein: "8g",
    carbs: "45g",
    fat: "12g"
  }
};

const mockIngredients = [
  { id: 1, name: "All-purpose flour", quantity: "2", unit: "cups", groupLabel: "Dry Ingredients" },
  { id: 2, name: "Sugar", quantity: "2", unit: "tablespoons", groupLabel: "Dry Ingredients" },
  { id: 3, name: "Baking powder", quantity: "2", unit: "teaspoons", groupLabel: "Dry Ingredients" },
  { id: 4, name: "Salt", quantity: "1/2", unit: "teaspoon", groupLabel: "Dry Ingredients" },
  { id: 5, name: "Milk", quantity: "1 1/2", unit: "cups", groupLabel: "Wet Ingredients" },
  { id: 6, name: "Eggs", quantity: "2", unit: "large", groupLabel: "Wet Ingredients" },
  { id: 7, name: "Butter", quantity: "2", unit: "tablespoons melted", groupLabel: "Wet Ingredients" }
];

const mockSteps = [
  { id: 1, stepNumber: 1, content: "In a large bowl, whisk together flour, sugar, baking powder, and salt." },
  { id: 2, stepNumber: 2, content: "In another bowl, whisk together milk, eggs, and melted butter." },
  { id: 3, stepNumber: 3, content: "Pour the wet ingredients into the dry ingredients and stir until just combined." },
  { id: 4, stepNumber: 4, content: "Heat a lightly oiled griddle or frying pan over medium-high heat." },
  { id: 5, stepNumber: 5, content: "Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake." },
  { id: 6, stepNumber: 6, content: "Cook until bubbles form and the edges are dry, then flip and cook until browned on the other side." }
];

const mockReviews = [
  {
    id: 1,
    user: {
      name: "John Doe",
      avatar: ""
    },
    rating: 5,
    comment: "These pancakes were absolutely delicious! So fluffy and easy to make.",
    date: "2023-05-15"
  },
  {
    id: 2,
    user: {
      name: "Jane Smith",
      avatar: ""
    },
    rating: 4,
    comment: "Great recipe! I added some blueberries and they turned out amazing.",
    date: "2023-05-10"
  }
];

export default function RecipeDetailPage() {
  const [servings, setServings] = useState(mockRecipe.servings);
  const [isFavorite, setIsFavorite] = useState(false);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockRecipe.title,
        text: mockRecipe.description,
        url: window.location.href
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Recipe Header */}
      <motion.div 
        className="mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1 
          className="mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-3xl text-transparent md:text-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {mockRecipe.title}
        </motion.h1>
        <motion.p 
          className="mx-auto max-w-3xl text-muted-foreground text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {mockRecipe.description}
        </motion.p>
      </motion.div>

      {/* Recipe Image */}
      <motion.div 
        className="mb-8 flex justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="relative rounded-3xl shadow-2xl overflow-hidden">
          <Image
            src={mockRecipe.coverUrl}
            alt={mockRecipe.title}
            width={800}
            height={400}
            className="rounded-3xl object-cover"
          />
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm">Cook Time</p>
                  <p className="text-white font-bold">{mockRecipe.cookTimeMins} mins</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm">Servings</p>
                  <p className="text-white font-bold">{mockRecipe.servings}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 backdrop-blur-sm">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-white text-sm">Difficulty</p>
                  <p className="text-white font-bold">{mockRecipe.difficulty}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recipe Actions */}
      <motion.div 
        className="mb-8 flex flex-wrap items-center justify-center gap-4"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <RatingStars rating={mockRecipe.avgRating} size="lg" />
        </motion.div>
        <motion.div variants={item}>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 border-primary/30"
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`mr-2 h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            {isFavorite ? 'Favorited' : 'Add to Favorites'}
          </Button>
        </motion.div>
        <motion.div variants={item}>
          <Button 
            variant="outline" 
            size="lg" 
            className="bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 border-primary/30"
            onClick={handleShare}
          >
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
        </motion.div>
        <motion.div variants={item}>
          <Button variant="outline" size="lg">
            <Edit className="mr-2 h-5 w-5" />
            Edit
          </Button>
        </motion.div>
      </motion.div>

      {/* Author and Categories/Tags */}
      <motion.div 
        className="mb-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary shadow-lg">
            <span className="text-xl font-bold text-white">
              {mockRecipe.author.name.charAt(0)}
            </span>
          </div>
          <div>
            <p className="font-bold text-xl">{mockRecipe.author.name}</p>
            <p className="text-muted-foreground">
              {mockRecipe.author.bio}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {mockRecipe.categories.map((category) => (
            <CategoryPill
              key={category.id}
              slug={category.slug}
              name={category.name}
            />
          ))}
          {mockRecipe.tags.map((tag) => (
            <TagPill
              key={tag.id}
              slug={tag.slug}
              name={tag.name}
            />
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Ingredients */}
        <motion.div 
          className="lg:col-span-1"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Card className="rounded-2xl shadow-xl border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-2xl pb-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center justify-center gap-2">
                  <Utensils className="h-6 w-6 text-primary" />
                  <h2 className="font-bold text-2xl">Ingredients</h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Serves:</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setServings(Math.max(1, servings - 1))}
                    className="h-8 w-8 p-0"
                  >
                    -
                  </Button>
                  <span className="font-medium w-8 text-center">{servings}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setServings(servings + 1)}
                    className="h-8 w-8 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <IngredientGroup ingredients={mockIngredients} />
            </CardContent>
          </Card>

          {/* Nutrition Facts */}
          <motion.div
            className="mt-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="h-6 w-6 text-primary" />
              <h3 className="font-bold text-xl">Nutrition Facts</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-primary/10 p-3 text-center">
                <p className="text-muted-foreground text-sm">Calories</p>
                <p className="font-bold">{mockRecipe.nutrition.calories}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3 text-center">
                <p className="text-muted-foreground text-sm">Protein</p>
                <p className="font-bold">{mockRecipe.nutrition.protein}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3 text-center">
                <p className="text-muted-foreground text-sm">Carbs</p>
                <p className="font-bold">{mockRecipe.nutrition.carbs}</p>
              </div>
              <div className="rounded-lg bg-primary/10 p-3 text-center">
                <p className="text-muted-foreground text-sm">Fat</p>
                <p className="font-bold">{mockRecipe.nutrition.fat}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Steps */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Card className="rounded-2xl shadow-xl border-0 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-t-2xl pb-4">
              <div className="flex items-center justify-center gap-2">
                <Timer className="h-6 w-6 text-primary" />
                <h2 className="font-bold text-2xl">Steps</h2>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-8">
                {mockSteps.map((step, index) => (
                  <motion.div
                    key={step.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  >
                    <StepItem step={step} />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <motion.div
            className="mt-6 rounded-2xl bg-gradient-to-br from-primary/5 to-secondary/5 p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.5 }}
          >
            <h3 className="mb-4 flex items-center justify-center gap-2 font-bold text-2xl">
              <Users className="h-6 w-6 text-primary" />
              Reviews
            </h3>
            <div className="space-y-4">
              {mockReviews.map((review) => (
                <div key={review.id} className="rounded-lg bg-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                        <span className="text-xs font-bold text-white">
                          {review.user.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium">{review.user.name}</span>
                    </div>
                    <RatingStars rating={review.rating} size="sm" />
                  </div>
                  <p className="mt-2 text-muted-foreground">{review.comment}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{review.date}</p>
                </div>
              ))}
            </div>
            <Button className="mt-4 w-full" variant="outline">
              Add Review
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Related Recipes */}
      <motion.div 
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.5 }}
      >
        <h2 className="mb-6 text-center font-bold text-3xl">Related Recipes</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* We would show related recipes here */}
          <p className="text-muted-foreground text-center">Related recipes would appear here</p>
        </div>
      </motion.div>
    </div>
  );
}