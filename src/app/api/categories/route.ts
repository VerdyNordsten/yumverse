import { db } from "@/database/db";
import { categories } from "@/database/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allCategories = await db.select().from(categories);
    
    return NextResponse.json(allCategories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}