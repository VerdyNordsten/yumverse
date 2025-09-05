import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/database/db";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    // Get the current session
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    // Type guard to check if session and user exist
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    
    // Check if the user has admin role
    // We can trust the session user ID since it's verified by better-auth
    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id)
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Access denied. Admin privileges required." }, { status: 403 });
    }
    
    // Return success response
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Admin verification error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}