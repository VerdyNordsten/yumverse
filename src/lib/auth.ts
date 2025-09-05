import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { Pool } from "pg"
import * as schema from "@/database/schema"
import { drizzle } from "drizzle-orm/node-postgres"

// Create database adapter for server-side usage only
const createDatabaseAdapter = () => {
  try {
    if (!process.env.DATABASE_URL) {
      console.warn("No DATABASE_URL provided for server-side auth")
      return undefined
    }

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      // Add connection pooling optimizations
      max: 20,
      min: 5,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    })

    return drizzleAdapter(drizzle(pool, { schema }), {
      provider: "pg",
      usePlural: true,
      schema
    })
  } catch (error) {
    console.error("Error creating database adapter:", error)
    return undefined
  }
}

export const auth = betterAuth({
    baseURL: process.env.NEXT_PUBLIC_APP_URL,
    secret: process.env.BETTER_AUTH_SECRET!,
    database: createDatabaseAdapter(),
    emailAndPassword: {
        enabled: true
    },
    socialProviders: {
        github: {
            clientId: process.env.GITHUB_CLIENT_ID || "",
            clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
        },
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        },
        twitter: {
            clientId: process.env.TWITTER_CLIENT_ID || "",
            clientSecret: process.env.TWITTER_CLIENT_SECRET || ""
        }
    },
    plugins: [],
    // Add session optimization settings
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 1 week
        updateAge: 60 * 60 * 24, // 1 day
    },
    // Add rate limiting to prevent abuse
    rateLimit: {
        window: 60, // 1 minute
        maxRequests: 10,
    }
})