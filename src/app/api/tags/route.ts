import { db } from "@/database/db";
import { tags } from "@/database/schema";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const allTags = await db.select().from(tags);
    
    return NextResponse.json(allTags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    return NextResponse.json({ error: "Failed to fetch tags" }, { status: 500 });
  }
}