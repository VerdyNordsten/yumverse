"use client";

import { CategoryPill } from "@/components/recipe/category-pill";
import { SearchInput } from "@/components/recipe/search-input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Mock data for demonstration
const mockCategories = [
  { slug: "breakfast", name: "Breakfast", count: 12 },
  { slug: "lunch", name: "Lunch", count: 18 },
  { slug: "dinner", name: "Dinner", count: 24 },
  { slug: "dessert", name: "Dessert", count: 15 },
  { slug: "appetizer", name: "Appetizer", count: 8 },
  { slug: "soup", name: "Soup", count: 10 },
  { slug: "salad", name: "Salad", count: 14 },
  { slug: "vegetarian", name: "Vegetarian", count: 22 },
  { slug: "vegan", name: "Vegan", count: 9 },
  { slug: "gluten-free", name: "Gluten-Free", count: 7 },
  { slug: "low-carb", name: "Low-Carb", count: 11 },
  { slug: "high-protein", name: "High-Protein", count: 6 },
  { slug: "quick-easy", name: "Quick & Easy", count: 32 },
  { slug: "slow-cooker", name: "Slow Cooker", count: 5 },
  { slug: "grilling", name: "Grilling", count: 13 },
  { slug: "baking", name: "Baking", count: 17 }
];

export default function CategoriesPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text font-bold text-3xl text-transparent">
          Categories
        </h1>
        <p className="text-muted-foreground">
          Browse recipes by category
        </p>
      </div>

      <div className="mb-8 max-w-2xl mx-auto">
        <SearchInput onSearch={handleSearch} placeholder="Search categories..." />
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {mockCategories.map((category) => (
          <CategoryPill
            key={category.slug}
            slug={category.slug}
            name={category.name}
            count={category.count}
          />
        ))}
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-center font-bold text-2xl">Popular Categories</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl mx-auto">
          {mockCategories.slice(0, 8).map((category) => (
            <div key={category.slug} className="rounded-lg border p-6 text-center hover:bg-muted/50 shadow-md transition-shadow">
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <p className="text-muted-foreground">{category.count} recipes</p>
              <Button variant="link" className="mt-2 p-0" asChild>
                <a href={`/categories/${category.slug}`}>View Recipes</a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}