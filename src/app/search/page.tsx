"use client";

import { useState, useEffect } from "react";
import { RecipeGrid } from "@/components/recipe/recipe-grid";
import { CategoryPill } from "@/components/recipe/category-pill";
import { TagPill } from "@/components/recipe/tag-pill";
import { SearchInput } from "@/components/recipe/search-input";
import { Button } from "@/components/ui/button";

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
    featured: true
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
    featured: true
  }
];

const mockCategories = [
  { slug: "breakfast", name: "Breakfast" },
  { slug: "lunch", name: "Lunch" },
  { slug: "dinner", name: "Dinner" }
];

const mockTags = [
  { slug: "gluten-free", name: "Gluten-Free" },
  { slug: "spicy", name: "Spicy" },
  { slug: "quick", name: "Quick" }
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({
    recipes: mockRecipes,
    categories: mockCategories,
    tags: mockTags
  });

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    // In a real app, this would call an API
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="font-bold text-3xl">Search</h1>
        <p className="text-muted-foreground">
          Find recipes, categories, and tags
        </p>
      </div>

      <div className="mb-8">
        <SearchInput onSearch={handleSearch} placeholder="Search recipes, categories, or tags..." />
      </div>

      {query ? (
        <div>
          {/* Recipe Results */}
          <div className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-bold text-2xl">Recipes</h2>
              <span className="text-muted-foreground">
                {results.recipes.length} results
              </span>
            </div>
            {results.recipes.length > 0 ? (
              <RecipeGrid recipes={results.recipes} />
            ) : (
              <p className="text-muted-foreground">No recipes found for "{query}"</p>
            )}
          </div>

          {/* Category Results */}
          <div className="mb-12">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-bold text-2xl">Categories</h2>
              <span className="text-muted-foreground">
                {results.categories.length} results
              </span>
            </div>
            {results.categories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {results.categories.map((category) => (
                  <CategoryPill
                    key={category.slug}
                    slug={category.slug}
                    name={category.name}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No categories found for "{query}"</p>
            )}
          </div>

          {/* Tag Results */}
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-bold text-2xl">Tags</h2>
              <span className="text-muted-foreground">
                {results.tags.length} results
              </span>
            </div>
            {results.tags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {results.tags.map((tag) => (
                  <TagPill
                    key={tag.slug}
                    slug={tag.slug}
                    name={tag.name}
                  />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No tags found for "{query}"</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-muted-foreground">
            Enter a search term to find recipes, categories, and tags
          </p>
        </div>
      )}
    </div>
  );
}