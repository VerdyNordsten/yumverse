import { db } from "@/database/db";
import { recipes, categories, tags, recipeCategories, recipeTags, ingredients, steps, users, ratings, favorites } from "@/database/schema";
import { eq, avg, count, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Resolve the params promise
    const { slug } = await params;
    
    // Fetch the recipe with all related data
    const recipeResult = await db.select({
      id: recipes.id,
      slug: recipes.slug,
      title: recipes.title,
      description: recipes.description,
      coverUrl: recipes.coverUrl,
      servings: recipes.servings,
      cookTimeMins: recipes.cookTimeMins,
      difficulty: recipes.difficulty,
      status: recipes.status,
      featured: recipes.featured,
      authorId: recipes.authorId,
      createdAt: recipes.createdAt,
      updatedAt: recipes.updatedAt,
      author: {
        id: users.id,
        name: users.name,
        image: users.image,
        bio: users.bio
      }
    })
    .from(recipes)
    .leftJoin(users, eq(recipes.authorId, users.id))
    .where(and(
      eq(recipes.slug, slug),
      eq(recipes.status, "published")
    ))
    .limit(1);

    if (recipeResult.length === 0) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    const recipe = recipeResult[0];

    // Fetch ingredients
    const recipeIngredients = await db.select({
      id: ingredients.id,
      groupLabel: ingredients.groupLabel,
      name: ingredients.name,
      quantity: ingredients.quantity,
      unit: ingredients.unit
    })
    .from(ingredients)
    .where(eq(ingredients.recipeId, recipe.id));

    // Fetch steps
    const recipeSteps = await db.select({
      id: steps.id,
      stepNumber: steps.stepNumber,
      content: steps.content,
      imageUrl: steps.imageUrl
    })
    .from(steps)
    .where(eq(steps.recipeId, recipe.id))
    .orderBy(steps.stepNumber);

    // Fetch categories
    const recipeCategoriesResult = await db.select({
      id: categories.id,
      slug: categories.slug,
      name: categories.name
    })
    .from(categories)
    .innerJoin(recipeCategories, eq(categories.id, recipeCategories.categoryId))
    .where(eq(recipeCategories.recipeId, recipe.id));

    // Fetch tags
    const recipeTagsResult = await db.select({
      id: tags.id,
      slug: tags.slug,
      name: tags.name
    })
    .from(tags)
    .innerJoin(recipeTags, eq(tags.id, recipeTags.tagId))
    .where(eq(recipeTags.recipeId, recipe.id));

    // Calculate average rating
    const ratingResult = await db.select({
      avg: avg(ratings.value)
    })
    .from(ratings)
    .where(eq(ratings.recipeId, recipe.id));

    const avgRating = ratingResult[0]?.avg ? parseFloat(ratingResult[0].avg) : 0;

    // Count favorites
    const favoritesResult = await db.select({
      count: count()
    })
    .from(favorites)
    .where(eq(favorites.recipeId, recipe.id));

    const favoritesCount = favoritesResult[0]?.count || 0;

    return NextResponse.json({
      ...recipe,
      ingredients: recipeIngredients,
      steps: recipeSteps,
      categories: recipeCategoriesResult,
      tags: recipeTagsResult,
      avgRating,
      favoritesCount
    });
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return NextResponse.json({ error: "Failed to fetch recipe" }, { status: 500 });
  }
}