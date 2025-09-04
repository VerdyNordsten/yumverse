"use client";

import { RecipeCard } from "@/components/recipe/recipe-card";

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
}

interface RecipeGridProps {
  recipes: Recipe[];
}

export function RecipeGrid({ recipes }: RecipeGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} {...recipe} />
      ))}
    </div>
  );
}