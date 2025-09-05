import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  // For admin routes, we check for a valid admin session
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow access to admin auth pages
    if (request.nextUrl.pathname.startsWith('/admin/auth')) {
      return NextResponse.next();
    }
    
    try {
      // Check specifically for the better-auth session cookie
      const sessionCookie = request.cookies.get("better-auth.session_token");
      
      if (!sessionCookie) {
        // Redirect to admin login page if no session token
        const adminSignInUrl = new URL("/admin/auth", request.url);
        adminSignInUrl.searchParams.set("callbackUrl", request.url);
        return NextResponse.redirect(adminSignInUrl);
      }
      
      // We can't easily verify the role in middleware without database access
      // The role verification will be handled in the client-side hook and API routes
    } catch (error) {
      // If there's an error checking the session, redirect to login
      const adminSignInUrl = new URL("/admin/auth", request.url);
      adminSignInUrl.searchParams.set("callbackUrl", request.url);
      return NextResponse.redirect(adminSignInUrl);
    }
  }
  
  // Continue with the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};