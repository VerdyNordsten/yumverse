import { Client } from "pg";
import { config } from "dotenv";

// Load environment variables
config();

async function resetDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  
  try {
    await client.connect();
    
    // Drop all tables and types
    console.log("Dropping existing database objects...");
    
    // Drop tables
    await client.query(`
      DROP TABLE IF EXISTS 
        collection_items, 
        collections, 
        comments, 
        favorites, 
        ingredients, 
        ratings, 
        recipe_categories, 
        recipe_tags, 
        recipes, 
        sessions, 
        accounts, 
        verifications, 
        users, 
        categories, 
        tags, 
        steps 
      CASCADE;
    `);
    
    // Drop types
    await client.query(`
      DROP TYPE IF EXISTS 
        difficulty, 
        recipe_status, 
        user_role 
      CASCADE;
    `);
    
    console.log("Database reset successfully!");
  } catch (error) {
    console.error("Error resetting database:", error);
  } finally {
    await client.end();
  }
}

resetDatabase();