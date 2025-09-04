import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Call the signOut API from better-auth
    const response = await auth.api.signOut({
      headers: request.headers
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signout error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}