import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { users } from "../database/schema";
import { config } from "dotenv";
import { eq } from "drizzle-orm";

// Load environment variables
config();

const main = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  
  await client.connect();
  const db = drizzle(client);
  
  // Update existing users to ensure they have the correct roles
  console.log("Updating user roles...");
  
  // Make sure Alice Johnson is an admin
  await db.update(users)
    .set({ role: "admin" })
    .where(eq(users.email, "alice@example.com"));
    
  // Make sure Bob Smith and Carol Williams are regular users
  await db.update(users)
    .set({ role: "user" })
    .where(eq(users.email, "bob@example.com"));
    
  await db.update(users)
    .set({ role: "user" })
    .where(eq(users.email, "carol@example.com"));
  
  console.log("User roles updated successfully!");
  await client.end();
};

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});