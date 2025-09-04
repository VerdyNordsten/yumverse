import { type NextRequest } from "next/server"
import { auth } from "@/lib/auth"

// Custom middleware that avoids dynamic code evaluation
export async function middleware(request: NextRequest) {
  // For now, let's just pass through all requests
  // We'll implement proper auth checking later
  return undefined
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|auth|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ]
}
