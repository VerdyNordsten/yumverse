"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, ChefHat, Utensils, Plus, Heart, List, ShoppingCart, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function MealPlannerPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="mb-4 font-bold text-3xl md:text-4xl">Meal Planner</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground text-lg">
          Plan your meals for the week. Organize your shopping list and cooking schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Weekly Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Calendar className="mb-4 h-12 w-12 text-muted-foreground" />
              <h3 className="mb-2 font-semibold text-xl">No meals planned yet</h3>
              <p className="mb-4 max-w-md text-muted-foreground">
                Start planning your meals for the week. Add recipes to your planner to organize your cooking schedule.
              </p>
              <Button asChild>
                <Link href="/recipes">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Recipes
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
                <Link href="/favorites">
                  <Heart className="mr-2 h-4 w-4" />
                  Browse Favorites
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/categories">
                  <List className="mr-2 h-4 w-4" />
                  Browse Categories
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link href="/shopping-list">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Shopping List
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Reduce food waste by planning ahead</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Save time and money with organized shopping</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Ensure balanced nutrition throughout the week</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-primary" />
                  <span>Reduce stress with organized meal prep</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}