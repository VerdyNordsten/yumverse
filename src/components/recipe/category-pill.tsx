"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Utensils, Coffee, Salad, Cake, Clock, Leaf } from "lucide-react";

interface CategoryPillProps {
  slug: string;
  name: string;
  count?: number;
}

const categoryIcons = {
  breakfast: Coffee,
  lunch: Utensils,
  dinner: Utensils,
  dessert: Cake,
  vegan: Leaf,
  "quick-and-easy": Clock,
  salad: Salad,
  all: Utensils
};

const categoryColors = {
  breakfast: "from-accent/20 to-accent/40 border-accent/30",
  lunch: "from-primary/20 to-primary/40 border-primary/30",
  dinner: "from-secondary/20 to-secondary/40 border-secondary/30",
  dessert: "from-muted/20 to-muted/40 border-muted/30",
  vegan: "from-green-200/20 to-green-200/40 border-green-200/30",
  "quick-and-easy": "from-yellow-200/20 to-yellow-200/40 border-yellow-200/30",
  salad: "from-green-300/20 to-green-300/40 border-green-300/30",
  all: "from-purple-200/20 to-purple-200/40 border-purple-200/30"
};

export function CategoryPill({ slug, name, count }: CategoryPillProps) {
  const IconComponent = categoryIcons[slug as keyof typeof categoryIcons] || Utensils;
  const colors = categoryColors[slug as keyof typeof categoryColors] || "from-gray-200/20 to-gray-200/40 border-gray-200/30";
  
  return (
    <Link href={`/categories/${slug}`}>
      <div className={`flex items-center gap-3 rounded-2xl bg-gradient-to-r ${colors} p-4 shadow-lg border transition-all duration-300 hover:scale-105 hover:shadow-xl`}>
        <div className="rounded-full bg-white/20 p-2">
          <IconComponent className="h-5 w-5" />
        </div>
        <div>
          <p className="font-semibold">{name}</p>
          {count !== undefined && (
            <Badge variant="secondary" className="mt-1 rounded-full px-2 py-0.5 text-xs">
              {count} recipes
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}