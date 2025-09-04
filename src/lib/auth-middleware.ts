// Empty auth middleware for Edge runtime compatibility
// We'll handle auth in the main application instead of the middleware
export const authMiddleware = {
  handler: () => undefined
}