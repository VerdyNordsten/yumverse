import { db } from "@/database/db";
import { recipes, categories, tags, recipeCategories, recipeTags } from "@/database/schema";
import { eq, and, ilike, desc, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") || "";
  const limit = parseInt(searchParams.get("limit") || "10");

  if (!query) {
    return NextResponse.json({ recipes: [], categories: [], tags: [] });
  }

  try {
    // Search recipes
    const recipesResult = await db.select({
      id: recipes.id,
      slug: recipes.slug,
      title: recipes.title,
      description: recipes.description,
      coverUrl: recipes.coverUrl
    })
    .from(recipes)
    .where(and(
      eq(recipes.status, "published"),
      ilike(recipes.title, `%${query}%`)
    ))
    .orderBy(desc(recipes.createdAt))
    .limit(limit);

    // Search categories
    const categoriesResult = await db.select({
      id: categories.id,
      slug: categories.slug,
      name: categories.name
    })
    .from(categories)
    .where(ilike(categories.name, `%${query}%`))
    .limit(limit);

    // Search tags
    const tagsResult = await db.select({
      id: tags.id,
      slug: tags.slug,
      name: tags.name
    })
    .from(tags)
    .where(ilike(tags.name, `%${query}%`))
    .limit(limit);

    return NextResponse.json({
      recipes: recipesResult,
      categories: categoriesResult,
      tags: tagsResult
    });
  } catch (error) {
    console.error("Error searching:", error);
    return NextResponse.json({ error: "Failed to search" }, { status: 500 });
  }
}