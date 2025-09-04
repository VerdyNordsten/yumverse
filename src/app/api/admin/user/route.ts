import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/database/db";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    // Get the session using better-auth
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session || !session.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    
    // Check if the user has admin role
    const user = await db.query.users.findFirst({
      where: eq(users.id, session.user.id)
    });
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    if (user.role !== "admin") {
      return NextResponse.json({ error: "Access denied. Admin privileges required." }, { status: 403 });
    }
    
    // Return user information
    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error("Failed to get admin user info:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}