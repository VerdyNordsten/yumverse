import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { users } from "../database/schema";
import { config } from "dotenv";
import { verify } from "@node-rs/argon2";
import { eq } from "drizzle-orm";

// Load environment variables
config();

const main = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  
  await client.connect();
  const db = drizzle(client);
  
  try {
    // Check primary admin user
    const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
    const allAdminUsers = await db.select().from(users).where(eq(users.email, adminEmail));
    const adminUser = allAdminUsers[0];
    
    if (adminUser) {
      console.log(`Admin user (${adminEmail}) found:`);
      console.log(`- ID: ${adminUser.id}`);
      console.log(`- Name: ${adminUser.name}`);
      console.log(`- Email: ${adminUser.email}`);
      console.log(`- Role: ${adminUser.role}`);
      console.log(`- Has password hash: ${!!adminUser.passwordHash}`);
      
      if (adminUser.passwordHash) {
        // Test password verification
        const isValid = await verify(adminUser.passwordHash, "admin123");
        console.log(`- Password 'admin123' is valid: ${isValid}`);
        
        const isInvalid = await verify(adminUser.passwordHash, "wrongpassword");
        console.log(`- Password 'wrongpassword' is valid: ${isInvalid}`);
      }
    } else {
      console.log(`Admin user (${adminEmail}) not found in database`);
    }
    
    // Also check Alice Johnson as backup admin
    const allUsers = await db.select().from(users).where(eq(users.email, "alice@example.com"));
    const alice = allUsers[0];
    
    if (alice) {
      console.log("\nAlice Johnson (backup admin) found:");
      console.log(`- ID: ${alice.id}`);
      console.log(`- Name: ${alice.name}`);
      console.log(`- Email: ${alice.email}`);
      console.log(`- Role: ${alice.role}`);
      console.log(`- Has password hash: ${!!alice.passwordHash}`);
      
      if (alice.passwordHash) {
        // Test password verification
        const isValid = await verify(alice.passwordHash, "admin123");
        console.log(`- Password 'admin123' is valid: ${isValid}`);
      }
    } else {
      console.log("\nAlice Johnson not found in database");
    }
  } catch (error) {
    console.error("Error checking users:", error);
  }
  
  await client.end();
};

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});