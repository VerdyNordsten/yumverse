import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

// This is for server-side usage only, not for middleware
let dbInstance: ReturnType<typeof drizzle> | null = null;

if (typeof window === "undefined") {
  // Only create the database connection on the server-side
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

  dbInstance = drizzle(pool, { schema })
}

export const db = dbInstance!