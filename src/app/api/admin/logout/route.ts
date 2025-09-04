import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Sign out the user using better-auth
    const response = await auth.api.signOut({
      headers: request.headers
    });
    
    // Return the response from better-auth which should include proper cookie clearing
    return response || NextResponse.json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Admin logout error:", error);
    return NextResponse.json({ error: "Internal server error", message: "Logout failed" }, { status: 500 });
  }
}