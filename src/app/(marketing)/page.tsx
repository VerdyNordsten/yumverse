"use client";

import { RecipeGrid } from "@/components/recipe/recipe-grid"
import { SearchInput } from "@/components/recipe/search-input"
import { Button } from "@/components/ui/button"
import { CategoryPill } from "@/components/recipe/category-pill"
import { Badge } from "@/components/ui/badge"
import { RecipeCardEnhanced } from "@/components/recipe/recipe-card-enhanced"
import { RecipeSliderBanner } from "@/components/layout/recipe-slider-banner"
import { ChefHat, Clock, Search, Users, Heart, Star, Award, Sparkles, CookingPot, Utensils, ArrowRight, List, Tag, Calendar, ShoppingCart, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"

// Mock data for demonstration
const mockRecipes = [
  {
    id: 1,
    slug: "fluffy-pancakes",
    title: "Fluffy Pancakes",
    description: "Light and fluffy pancakes perfect for breakfast",
    coverUrl: "/demo-img.png",
    cookTimeMins: 20,
    servings: 4,
    difficulty: "Easy",
    author: {
      name: "Alice Johnson",
      image: ""
    },
    featured: true,
    avgRating: 4.8,
    favoritesCount: 124
  },
  {
    id: 2,
    slug: "classic-beef-burger",
    title: "Classic Beef Burger",
    description: "Juicy beef burger with fresh toppings",
    coverUrl: "/demo-img.png",
    cookTimeMins: 30,
    servings: 4,
    difficulty: "Medium",
    author: {
      name: "Bob Smith",
      image: ""
    },
    featured: true,
    avgRating: 4.9,
    favoritesCount: 89
  },
  {
    id: 3,
    slug: "vegan-chocolate-cake",
    title: "Vegan Chocolate Cake",
    description: "Rich and moist chocolate cake without any animal products",
    coverUrl: "/demo-img.png",
    cookTimeMins: 60,
    servings: 8,
    difficulty: "Medium",
    author: {
      name: "Carol Williams",
      image: ""
    },
    avgRating: 4.7,
    favoritesCount: 156
  },
  {
    id: 4,
    slug: "caesar-salad",
    title: "Classic Caesar Salad",
    description: "Fresh romaine lettuce with homemade Caesar dressing",
    coverUrl: "/demo-img.png",
    cookTimeMins: 15,
    servings: 2,
    difficulty: "Easy",
    author: {
      name: "Alice Johnson",
      image: ""
    },
    avgRating: 4.6,
    favoritesCount: 72
  },
  {
    id: 5,
    slug: "spaghetti-bolognese",
    title: "Spaghetti Bolognese",
    description: "Traditional Italian pasta with rich meat sauce",
    coverUrl: "/demo-img.png",
    cookTimeMins: 45,
    servings: 4,
    difficulty: "Medium",
    author: {
      name: "Marco Rossi",
      image: ""
    },
    avgRating: 4.8,
    favoritesCount: 203
  },
  {
    id: 6,
    slug: "chicken-tikka-masala",
    title: "Chicken Tikka Masala",
    description: "Creamy Indian curry with tender chicken pieces",
    coverUrl: "/demo-img.png",
    cookTimeMins: 50,
    servings: 4,
    difficulty: "Medium",
    author: {
      name: "Priya Sharma",
      image: ""
    },
    avgRating: 4.9,
    favoritesCount: 187
  }
];

const mockCategories = [
  { slug: "breakfast", name: "Breakfast", count: 12 },
  { slug: "lunch", name: "Lunch", count: 18 },
  { slug: "dinner", name: "Dinner", count: 24 },
  { slug: "dessert", name: "Dessert", count: 15 },
  { slug: "vegan", name: "Vegan", count: 9 },
  { slug: "quick", name: "Quick & Easy", count: 32 }
];

const floatingIcons = [
  { icon: ChefHat, delay: 0 },
  { icon: CookingPot, delay: 0.5 },
  { icon: Utensils, delay: 1 },
  { icon: Sparkles, delay: 1.5 },
  { icon: Star, delay: 2 },
  { icon: Heart, delay: 2.5 }
];

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [floatingElements, setFloatingElements] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Create floating elements for animation
    const elements = [];
    for (let i = 0; i < 20; i++) {
      elements.push({
        id: i,
        icon: floatingIcons[Math.floor(Math.random() * floatingIcons.length)].icon,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 10 + Math.random() * 10
      });
    }
    setFloatingElements(elements);
  }, []);

  // Auto-rotate featured recipes
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Math.ceil(mockRecipes.length / 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // Get current recipes for display
  const displayedRecipes = mockRecipes.slice(currentIndex * 3, currentIndex * 3 + 3);

  return (
    <div className="relative overflow-hidden">
      {/* Floating animated elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {floatingElements.map((element) => {
          const IconComponent = element.icon;
          return (
            <motion.div
              key={element.id}
              className="absolute text-primary/5"
              style={{
                left: `${element.left}%`,
                top: '-50px'
              }}
              animate={{
                y: ['0vh', '100vh'],
                x: ['0px', `${Math.sin(element.id) * 100}px`, '0px'],
                rotate: [0, 360]
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay
              }}
            >
              <IconComponent size={24 + Math.random() * 24} />
            </motion.div>
          );
        })}
      </div>

      <div className="container relative mx-auto px-4 py-8 z-10">
        {/* Recipe Slider Banner */}
        <RecipeSliderBanner />
        
        {/* Stats Section */}
        <motion.section 
          className="mb-24 mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: ChefHat, value: "10K+", label: "Recipes", color: "from-primary/20 to-primary/40", accent: "primary" },
              { icon: Users, value: "50K+", label: "Cooks", color: "from-secondary/20 to-secondary/40", accent: "secondary" },
              { icon: Heart, value: "100K+", label: "Favorites", color: "from-accent/20 to-accent/40", accent: "accent" },
              { icon: Star, value: "4.9", label: "Average Rating", color: "from-muted/20 to-muted/40", accent: "muted" }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className="rounded-3xl bg-gradient-to-br p-8 text-center shadow-xl backdrop-blur-sm border border-primary/10 dark:border-primary/20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    scale: 1.03
                  }}
                >
                  <div className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-r ${stat.color} p-5 shadow-lg`}>
                    <IconComponent className={`h-10 w-10 text-${stat.accent}`} />
                  </div>
                  <motion.p 
                    className="font-bold text-3xl"
                    whileInView={{ 
                      scale: [1, 1.1, 1],
                    }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                  >
                    {stat.value}
                  </motion.p>
                  <p className="mt-2 text-muted-foreground">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* Featured Recipes Showcase */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.5 }}
        >
          <div className="mb-10 text-center">
            <motion.h2 
              className="font-bold text-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.5 }}
            >
              Featured Recipes
            </motion.h2>
            <motion.p 
              className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.5 }}
            >
              Handpicked recipes that will delight your taste buds
            </motion.p>
          </div>
          
          {/* Filter Tabs */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {[
              { id: "all", label: "All Recipes" },
              { id: "quick", label: "Quick Meals" },
              { id: "vegan", label: "Vegan" },
              { id: "trending", label: "Trending" },
              { id: "desserts", label: "Desserts" }
            ].map((tab) => (
              <button
                key={tab.id}
                className={`rounded-full px-6 py-2 text-sm font-medium transition-all duration-300 ${
                  tab.id === "all"
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background text-foreground hover:bg-primary/10"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Enhanced Recipe Cards Showcase */}
          <div className="relative">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {displayedRecipes.map((recipe, index) => (
                <RecipeCardEnhanced key={recipe.id} recipe={recipe} />
              ))}
            </div>
            
            {/* Navigation Dots */}
            <div className="mt-10 flex justify-center gap-2">
              {[...Array(Math.ceil(mockRecipes.length / 3))].map((_, index) => (
                <button
                  key={index}
                  className={`h-3 w-3 rounded-full ${
                    index === currentIndex ? "bg-primary" : "bg-primary/30"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button variant="link" asChild className="text-lg">
              <Link href="/recipes">
                View all recipes
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.section>

        {/* Categories */}
        <motion.section 
          className="mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.5 }}
        >
          <div className="mb-10 text-center">
            <motion.h2 
              className="font-bold text-4xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.8, duration: 0.5 }}
            >
              Popular Categories
            </motion.h2>
            <motion.p 
              className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 0.5 }}
            >
              Browse recipes by category to find exactly what you're craving
            </motion.p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.2, duration: 0.5 }}
          >
            {mockCategories.map((category, index) => (
              <motion.div
                key={category.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.4 + index * 0.1, duration: 0.5 }}
                whileHover={{ 
                  y: -5,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <CategoryPill
                  slug={category.slug}
                  name={category.name}
                  count={category.count}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* How It Works */}
        <motion.section 
          className="mb-24 rounded-3xl bg-gradient-to-r from-background to-accent/10 p-8 shadow-xl border border-primary/10 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.6, duration: 0.5 }}
        >
          <motion.h2 
            className="mb-12 text-center font-bold text-4xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.8, duration: 0.5 }}
          >
            How It Works
          </motion.h2>
          
          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 right-0 top-12 mx-auto h-1 w-4/5 bg-gradient-to-r from-primary/20 to-secondary/20 md:w-3/4"></div>
            
            <div className="relative grid grid-cols-1 gap-12 md:grid-cols-3">
              {[
                { 
                  icon: Search, 
                  title: "🔍 Discover", 
                  desc: "Browse through thousands of recipes from home cooks and chefs around the world.", 
                  color: "from-primary/20 to-primary/40"
                },
                { 
                  icon: ChefHat, 
                  title: "🍳 Cook", 
                  desc: "Follow step-by-step instructions to create delicious meals in your own kitchen.", 
                  color: "from-secondary/20 to-secondary/40"
                },
                { 
                  icon: Users, 
                  title: "🤝 Share", 
                  desc: "Share your own recipes and connect with a community of food enthusiasts.", 
                  color: "from-accent/20 to-accent/40"
                }
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 4 + index * 0.2, duration: 0.5 }}
                    whileHover={{ 
                      y: -10,
                    }}
                  >
                    {/* Timeline node */}
                    <div className="relative mb-8">
                      <div className={`mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r ${item.color} p-6 shadow-lg`}>
                        <IconComponent className="h-12 w-12 text-foreground" />
                      </div>
                      <div className="absolute -bottom-4 left-1/2 h-8 w-8 -translate-x-1/2 rounded-full border-4 border-background bg-primary"></div>
                    </div>
                    
                    <motion.h3 
                      className="mb-4 font-bold text-2xl"
                      whileHover={{ 
                        scale: 1.05,
                      }}
                    >
                      {item.title}
                    </motion.h3>
                    <p className="text-lg text-muted-foreground">
                      {item.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}