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
    plugins: []
})