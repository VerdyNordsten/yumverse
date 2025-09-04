"use client";

import { TagPill } from "@/components/recipe/tag-pill";
import { SearchInput } from "@/components/recipe/search-input";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Mock data for demonstration
const mockTags = [
  { slug: "gluten-free", name: "Gluten-Free" },
  { slug: "spicy", name: "Spicy" },
  { slug: "low-carb", name: "Low-Carb" },
  { slug: "high-protein", name: "High-Protein" },
  { slug: "quick", name: "Quick" },
  { slug: "healthy", name: "Healthy" },
  { slug: "comfort-food", name: "Comfort Food" },
  { slug: "budget-friendly", name: "Budget-Friendly" },
  { slug: "kid-friendly", name: "Kid-Friendly" },
  { slug: "one-pot", name: "One-Pot" },
  { slug: "meal-prep", name: "Meal Prep" },
  { slug: "seasonal", name: "Seasonal" },
  { slug: "dairy-free", name: "Dairy-Free" },
  { slug: "nut-free", name: "Nut-Free" },
  { slug: "sugar-free", name: "Sugar-Free" },
  { slug: "keto", name: "Keto" },
  { slug: "paleo", name: "Paleo" },
  { slug: "mediterranean", name: "Mediterranean" },
  { slug: "asian", name: "Asian" },
  { slug: "mexican", name: "Mexican" }
];

export default function TagsPage() {
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
          Tags
        </h1>
        <p className="text-muted-foreground">
          Browse recipes by tag
        </p>
      </div>

      <div className="mb-8 max-w-2xl mx-auto">
        <SearchInput onSearch={handleSearch} placeholder="Search tags..." />
      </div>

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
  );
}