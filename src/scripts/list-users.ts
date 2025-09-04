import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { users, accounts } from "../database/schema";
import { config } from "dotenv";

// Load environment variables
config();

const main = async () => {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  
  await client.connect();
  const db = drizzle(client);
  
  try {
    // Get all users
    const allUsers = await db.select().from(users);
    
    console.log("All users in the database:");
    for (const user of allUsers) {
      console.log(`- ID: ${user.id}`);
      console.log(`  Name: ${user.name}`);
      console.log(`  Email: ${user.email}`);
      console.log(`  Role: ${user.role}`);
      console.log(`  Email Verified: ${user.emailVerified}`);
      
      // Get accounts for this user
      const userAccounts = await db.select().from(accounts).where(
        accounts.userId === user.id
      );
      
      if (userAccounts.length > 0) {
        console.log("  Accounts:");
        userAccounts.forEach(account => {
          console.log(`    - Provider: ${account.providerId}`);
          console.log(`      Has Password: ${!!account.password}`);
        });
      } else {
        console.log("  Accounts: None");
      }
      
      console.log("---");
    }
  } catch (error) {
    console.error("Error fetching users:", error);
  }
  
  await client.end();
};

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});