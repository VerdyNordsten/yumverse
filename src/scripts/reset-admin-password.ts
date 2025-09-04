import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { users } from "../database/schema";
import { config } from "dotenv";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";

// Load environment variables
config();

const main = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  
  await client.connect();
  const db = drizzle(client);
  
  // Reset password for primary admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const newPassword = process.env.ADMIN_RESET_PASSWORD || "admin123";
  const hashedPassword = await hash(newPassword);
  
  try {
    const result = await db.update(users)
      .set({ passwordHash: hashedPassword, updatedAt: new Date() })
      .where(eq(users.email, adminEmail))
      .returning();
    
    if (result.length > 0) {
      console.log(`Password reset successfully for ${adminEmail}`);
      console.log("New password:", newPassword);
    } else {
      console.log(`User ${adminEmail} not found`);
    }
  } catch (error) {
    console.error("Error resetting password:", error);
  }
  
  await client.end();
};

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});