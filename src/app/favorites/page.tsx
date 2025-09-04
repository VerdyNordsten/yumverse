"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, ChefHat, Utensils, Calendar, List, Tag, Share2 } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 font-bold text-3xl md:text-4xl">Your Favorite Recipes</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
          All your saved recipes in one place. Never lose track of your favorites again.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Favorite Recipes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Heart className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 font-semibold text-xl">No favorites yet</h3>
              <p className="mb-4 max-w-md text-muted-foreground">
                You haven't saved any recipes to your favorites yet. Start exploring and saving recipes you love!
              </p>
              <Button asChild>
                <Link href="/recipes">
                  <ChefHat className="mr-2 h-4 w-4" />
                  Browse Recipes
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Utensils className="h-5 w-5 text-primary" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild variant="outline" className="w-full">
                <Link href="/meal-planner">
                  <Calendar className="mr-2 h-4 w-4" />
                  Plan Meals
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/categories">
                  <List className="mr-2 h-4 w-4" />
                  Browse Categories
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/tags">
                  <Tag className="mr-2 h-4 w-4" />
                  Explore Tags
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Heart className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Click the heart icon on any recipe to save it here</span>
                </li>
                <li className="flex items-start gap-2">
                  <Calendar className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Add favorites to your meal planner for easy cooking</span>
                </li>
                <li className="flex items-start gap-2">
                  <Share2 className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Share your favorite recipes with friends</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}