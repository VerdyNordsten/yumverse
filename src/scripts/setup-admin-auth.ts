import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { users, accounts } from "../database/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../lib/auth";

// Load environment variables
config();

async function createAdminUserWithAuth() {
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
      console.log(`Admin user with email ${adminEmail} already exists.`);
      
      // Update the existing user to ensure admin role
      const [updatedUser] = await db.update(users)
        .set({
          role: "admin",
          emailVerified: true,
          updatedAt: new Date()
        })
        .where(eq(users.email, adminEmail))
        .returning();
      
      console.log("Admin user role updated:", updatedUser.email);
    } else {
      // Create admin user using better-auth
      console.log(`Creating admin user with email: ${adminEmail}`);
      
      try {
        // Try to sign up the user with better-auth first
        const newUser = await auth.api.signUpEmail({
          body: {
            email: adminEmail,
            password: adminPassword,
            name: adminName
          }
        });
        
        if (newUser) {
          // Update the user to ensure admin role
          const [updatedUser] = await db.update(users)
            .set({
              role: "admin",
              emailVerified: true,
              updatedAt: new Date()
            })
            .where(eq(users.email, adminEmail))
            .returning();
          
          console.log("Admin user created and role updated:", updatedUser.email);
          return;
        }
      } catch (signupError: any) {
        // If signup fails because user already exists, we'll handle it below
        if (!signupError.message || !signupError.message.includes("already exists")) {
          throw signupError;
        }
      }
      
      // If we get here, the user already exists in the auth system
      // Update the existing user to ensure admin role
      const [updatedUser] = await db.update(users)
        .set({
          role: "admin",
          emailVerified: true,
          updatedAt: new Date()
        })
        .where(eq(users.email, adminEmail))
        .returning();
      
      console.log("Admin user role updated:", updatedUser.email);
    }
    
    console.log("Admin user setup completed successfully!");
  } catch (error) {
    console.error("Error setting up admin user:", error);
  } finally {
    await client.end();
  }
}

createAdminUserWithAuth();