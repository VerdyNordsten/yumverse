import { db } from "@/database/db";
import { recipes, categories, tags, recipeCategories, recipeTags, ingredients, steps, users } from "@/database/schema";
import { eq, and, desc, like, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const tag = searchParams.get("tag") || "";
  const sortBy = searchParams.get("sortBy") || "newest";
  const offset = (page - 1) * limit;

  try {
    // Build the query
    let query = db.select({
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
        image: users.image
      }
    })
    .from(recipes)
    .leftJoin(users, eq(recipes.authorId, users.id))
    .where(and(
      eq(recipes.status, "published"),
      search ? like(recipes.title, `%${search}%`) : undefined
    ));

    // Add category filter if provided
    if (category) {
      query = query.innerJoin(recipeCategories, eq(recipes.id, recipeCategories.recipeId))
                   .innerJoin(categories, eq(recipeCategories.categoryId, categories.id))
                   .where(and(
                     eq(recipes.status, "published"),
                     eq(categories.slug, category),
                     search ? like(recipes.title, `%${search}%`) : undefined
                   ));
    }

    // Add tag filter if provided
    if (tag) {
      query = query.innerJoin(recipeTags, eq(recipes.id, recipeTags.recipeId))
                   .innerJoin(tags, eq(recipeTags.tagId, tags.id))
                   .where(and(
                     eq(recipes.status, "published"),
                     eq(tags.slug, tag),
                     search ? like(recipes.title, `%${search}%`) : undefined
                   ));
    }

    // Add sorting
    switch (sortBy) {
      case "oldest":
        query = query.orderBy(recipes.createdAt);
        break;
      case "popular":
        // For now, we'll sort by featured flag and creation date
        query = query.orderBy(desc(recipes.featured), desc(recipes.createdAt));
        break;
      case "rating":
        // For now, we'll sort by featured flag and creation date
        query = query.orderBy(desc(recipes.featured), desc(recipes.createdAt));
        break;
      default: // newest
        query = query.orderBy(desc(recipes.createdAt));
    }

    // Add pagination
    const result = await query.limit(limit).offset(offset);

    // Get total count for pagination
    const countQuery = db.select({ count: sql<number>`count(*)` })
                         .from(recipes)
                         .where(and(
                           eq(recipes.status, "published"),
                           search ? like(recipes.title, `%${search}%`) : undefined
                         ));
    
    const [{ count }] = await countQuery;

    return NextResponse.json({
      recipes: result,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalRecipes: count,
        hasNextPage: page < Math.ceil(count / limit),
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return NextResponse.json({ error: "Failed to fetch recipes" }, { status: 500 });
  }
}