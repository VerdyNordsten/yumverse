import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });
    
    if (!session) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    
    return NextResponse.json({
      user: session.user,
      role: session.user.role
    });
  } catch (error) {
    console.error("Session error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}