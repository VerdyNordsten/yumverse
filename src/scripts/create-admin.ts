import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { users } from "../database/schema";
import { config } from "dotenv";
import { hash } from "@node-rs/argon2";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

// Load environment variables
config();

const main = async () => {
  // Get admin user details from environment variables or use defaults
  const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";
  const adminName = process.env.ADMIN_NAME || "Admin User";
  
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  
  await client.connect();
  const db = drizzle(client);
  
  try {
    // Check if admin user already exists
    const existingUsers = await db.select().from(users).where(eq(users.email, adminEmail));
    const existingUser = existingUsers[0];
    
    if (existingUser) {
      console.log(`Admin user with email ${adminEmail} already exists. Updating role and password...`);
      
      // Hash the password
      const hashedPassword = await hash(adminPassword);
      
      // Update the existing user
      const [updatedUser] = await db.update(users)
        .set({
          role: "admin",
          passwordHash: hashedPassword,
          emailVerified: true,
          updatedAt: new Date()
        })
        .where(eq(users.email, adminEmail))
        .returning();
      
      console.log("Admin user updated successfully:", updatedUser.email);
    } else {
      // Hash the password
      const hashedPassword = await hash(adminPassword);
      
      // Create admin user
      console.log(`Creating admin user with email: ${adminEmail}`);
      const [newUser] = await db.insert(users).values({
        id: `admin_${uuidv4()}`,
        name: adminName,
        email: adminEmail,
        emailVerified: true,
        passwordHash: hashedPassword,
        role: "admin",
        bio: "Administrator",
        createdAt: new Date(),
        updatedAt: new Date()
      }).returning();
      
      console.log("Admin user created successfully:", newUser.email);
    }
  } catch (error) {
    console.error("Error managing admin user:", error);
  }
  
  await client.end();
};

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});