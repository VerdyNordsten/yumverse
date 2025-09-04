"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Heart, Star, ChefHat, Utensils } from "lucide-react";
import { RecipeImage } from "@/components/recipe/recipe-image";
import Link from "next/link";

interface Recipe {
  id: number;
  slug: string;
  title: string;
  description: string;
  coverUrl: string;
  cookTimeMins: number;
  servings: number;
  difficulty: string;
  author: {
    name: string;
    image?: string;
  };
  featured?: boolean;
  avgRating: number;
  favoritesCount: number;
}

interface RecipeCardEnhancedProps {
  recipe: Recipe;
}

export function RecipeCardEnhanced({ recipe }: RecipeCardEnhancedProps) {
  return (
    <motion.div
      className="group relative rounded-3xl bg-gradient-to-br from-background to-background/90 shadow-xl border border-primary/10 overflow-hidden"
      whileHover={{ 
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        scale: 1.02
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative overflow-hidden rounded-t-3xl">
        <RecipeImage
          src={recipe.coverUrl}
          alt={recipe.title}
          width={400}
          height={300}
          className="h-64 w-full object-cover transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        {recipe.featured && (
          <Badge className="absolute left-4 top-4 bg-gradient-to-r from-accent to-yellow-500 text-white rounded-full px-3 py-1">
            🍳 Featured
          </Badge>
        )}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-bold text-xl text-white">{recipe.title}</h3>
          <p className="text-white/90 text-sm">{recipe.description}</p>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{recipe.cookTimeMins} mins</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{recipe.servings} servings</span>
          </div>
          <Badge variant="secondary" className="rounded-full">{recipe.difficulty}</Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(recipe.avgRating)
                      ? "fill-yellow-500 text-yellow-500"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm">{recipe.avgRating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{recipe.favoritesCount}</span>
          </div>
        </div>
        
        <div className="mt-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <span className="text-sm font-bold">
                {recipe.author.name.charAt(0)}
              </span>
            </div>
            <span className="font-medium">{recipe.author.name}</span>
          </div>
          <Button variant="outline" size="sm" className="rounded-full hover:bg-primary hover:text-primary-foreground" asChild>
            <Link href={`/recipes/${recipe.slug}`} className="flex items-center gap-1">
              <Utensils className="h-4 w-4" />
              View Recipe
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}