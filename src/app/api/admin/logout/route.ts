import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Just return a success response
    // The client-side code will handle the actual sign out
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Admin logout error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal server error", message: "Logout failed" }), 
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}