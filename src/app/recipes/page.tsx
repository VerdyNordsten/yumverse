"use client";

import { RecipeGrid } from "@/components/recipe/recipe-grid";
import { SearchInput } from "@/components/recipe/search-input";
import { CategoryPill } from "@/components/recipe/category-pill";
import { TagPill } from "@/components/recipe/tag-pill";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

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
    }
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
    }
  },
  {
    id: 5,
    slug: "beef-stir-fry",
    title: "Beef Stir Fry",
    description: "Quick and flavorful beef stir fry with vegetables",
    coverUrl: "/demo-img.png",
    cookTimeMins: 25,
    servings: 3,
    difficulty: "Medium",
    author: {
      name: "Bob Smith",
      image: ""
    }
  }
];

const mockCategories = [
  { slug: "breakfast", name: "Breakfast" },
  { slug: "lunch", name: "Lunch" },
  { slug: "dinner", name: "Dinner" },
  { slug: "dessert", name: "Dessert" },
  { slug: "vegan", name: "Vegan" },
  { slug: "quick", name: "Quick & Easy" }
];

const mockTags = [
  { slug: "gluten-free", name: "Gluten-Free" },
  { slug: "spicy", name: "Spicy" },
  { slug: "low-carb", name: "Low-Carb" },
  { slug: "high-protein", name: "High-Protein" },
  { slug: "quick", name: "Quick" }
];

export default function RecipesPage() {
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
          All Recipes
        </h1>
        <p className="text-muted-foreground">
          Discover delicious recipes from our community
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row max-w-4xl mx-auto">
        <div className="flex-1">
          <SearchInput onSearch={handleSearch} />
        </div>
        <div className="flex gap-2">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="cook-time">Cook Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>

      {/* Category and Tag Filters */}
      <div className="mb-8 max-w-6xl mx-auto">
        <div className="mb-4">
          <h3 className="mb-2 font-semibold text-center">Categories</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {mockCategories.map((category) => (
              <CategoryPill
                key={category.slug}
                slug={category.slug}
                name={category.name}
              />
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-center">Tags</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {mockTags.map((tag) => (
              <TagPill
                key={tag.slug}
                slug={tag.slug}
                name={tag.name}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Recipe Grid */}
      <div className="max-w-7xl mx-auto">
        <RecipeGrid recipes={mockRecipes} />
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}