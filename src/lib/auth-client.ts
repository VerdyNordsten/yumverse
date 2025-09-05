import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: typeof window !== "undefined" ? window.location.origin : "",
    plugins: [],
    fetchOptions: {
        // Add caching and timeout settings for better performance
        cache: "no-store",
        credentials: "include",
        headers: {
            "Cache-Control": "no-cache"
        }
    }
})
