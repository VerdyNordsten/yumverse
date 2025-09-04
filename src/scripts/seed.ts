import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { 
  users, 
  categories, 
  tags, 
  recipes, 
  ingredients, 
  steps
} from "../database/schema";
import { config } from "dotenv";

// Load environment variables
config();

// Database connection
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

const main = async () => {
  await client.connect();
  const db = drizzle(client);

  // Create demo users
  console.log("Seeding users...");
  const demoUsers = [
    {
      id: "user_1",
      name: "Alice Johnson",
      email: "alice@example.com",
      emailVerified: true,
      role: "admin",
      bio: "Professional chef and food blogger"
    },
    {
      id: "user_2",
      name: "Bob Smith",
      email: "bob@example.com",
      emailVerified: true,
      role: "user",
      bio: "Home cook passionate about Italian cuisine"
    },
    {
      id: "user_3",
      name: "Carol Williams",
      email: "carol@example.com",
      emailVerified: true,
      role: "user",
      bio: "Vegan food enthusiast and nutritionist"
    }
  ];

  await db.insert(users).values(demoUsers).onConflictDoNothing();

  // Create categories
  console.log("Seeding categories...");
  const categoryNames = [
    "Breakfast", "Lunch", "Dinner", "Dessert", 
    "Appetizer", "Soup", "Salad", "Vegetarian", 
    "Vegan", "Gluten-Free", "Low-Carb", "High-Protein",
    "Quick & Easy", "Slow Cooker", "Grilling", "Baking"
  ];

  const categoriesData = categoryNames.map(name => ({
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    name
  }));

  await db.insert(categories).values(categoriesData).onConflictDoNothing();

  // Create tags
  console.log("Seeding tags...");
  const tagNames = [
    "gluten-free", "spicy", "low-carb", "high-protein", 
    "quick", "healthy", "comfort-food", "budget-friendly",
    "kid-friendly", "one-pot", "meal-prep", "seasonal",
    "dairy-free", "nut-free", "sugar-free", "keto",
    "paleo", "mediterranean", "asian", "mexican"
  ];

  const tagsData = tagNames.map(name => ({
    slug: name.toLowerCase().replace(/\s+/g, '-'),
    name
  }));

  await db.insert(tags).values(tagsData).onConflictDoNothing();

  // Create demo recipes
  console.log("Seeding recipes...");
  const demoRecipes = [
    {
      slug: "fluffy-pancakes",
      title: "Fluffy Pancakes",
      description: "Light and fluffy pancakes perfect for breakfast",
      coverUrl: "/demo-img.png",
      servings: 4,
      cookTimeMins: 20,
      difficulty: "easy",
      status: "published",
      featured: true,
      authorId: "user_1"
    },
    {
      slug: "classic-beef-burger",
      title: "Classic Beef Burger",
      description: "Juicy beef burger with fresh toppings",
      coverUrl: "/demo-img.png",
      servings: 4,
      cookTimeMins: 30,
      difficulty: "medium",
      status: "published",
      featured: true,
      authorId: "user_2"
    },
    {
      slug: "vegan-chocolate-cake",
      title: "Vegan Chocolate Cake",
      description: "Rich and moist chocolate cake without any animal products",
      coverUrl: "/demo-img.png",
      servings: 8,
      cookTimeMins: 60,
      difficulty: "medium",
      status: "published",
      featured: false,
      authorId: "user_3"
    },
    {
      slug: "caesar-salad",
      title: "Classic Caesar Salad",
      description: "Fresh romaine lettuce with homemade Caesar dressing",
      coverUrl: "/demo-img.png",
      servings: 2,
      cookTimeMins: 15,
      difficulty: "easy",
      status: "published",
      featured: false,
      authorId: "user_1"
    },
    {
      slug: "beef-stir-fry",
      title: "Beef Stir Fry",
      description: "Quick and flavorful beef stir fry with vegetables",
      coverUrl: "/demo-img.png",
      servings: 3,
      cookTimeMins: 25,
      difficulty: "medium",
      status: "published",
      featured: false,
      authorId: "user_2"
    }
  ];

  const insertedRecipes = await db.insert(recipes).values(demoRecipes).returning();

  // Create ingredients for each recipe
  console.log("Seeding ingredients...");
  const recipeIngredients = [
    // Fluffy Pancakes
    [
      { recipeId: insertedRecipes[0].id, name: "All-purpose flour", quantity: "2", unit: "cups" },
      { recipeId: insertedRecipes[0].id, name: "Sugar", quantity: "2", unit: "tablespoons" },
      { recipeId: insertedRecipes[0].id, name: "Baking powder", quantity: "2", unit: "teaspoons" },
      { recipeId: insertedRecipes[0].id, name: "Salt", quantity: "1/2", unit: "teaspoon" },
      { recipeId: insertedRecipes[0].id, name: "Milk", quantity: "1 1/2", unit: "cups" },
      { recipeId: insertedRecipes[0].id, name: "Eggs", quantity: "2", unit: "large" },
      { recipeId: insertedRecipes[0].id, name: "Butter", quantity: "2", unit: "tablespoons melted" }
    ],
    // Classic Beef Burger
    [
      { recipeId: insertedRecipes[1].id, name: "Ground beef", quantity: "1", unit: "lb" },
      { recipeId: insertedRecipes[1].id, name: "Salt", quantity: "1", unit: "teaspoon" },
      { recipeId: insertedRecipes[1].id, name: "Black pepper", quantity: "1/2", unit: "teaspoon" },
      { recipeId: insertedRecipes[1].id, name: "Hamburger buns", quantity: "4", unit: "" },
      { recipeId: insertedRecipes[1].id, name: "Lettuce", quantity: "1", unit: "head" },
      { recipeId: insertedRecipes[1].id, name: "Tomato", quantity: "1", unit: "large" },
      { recipeId: insertedRecipes[1].id, name: "Onion", quantity: "1/2", unit: "sliced" }
    ],
    // Vegan Chocolate Cake
    [
      { recipeId: insertedRecipes[2].id, name: "All-purpose flour", quantity: "2", unit: "cups" },
      { recipeId: insertedRecipes[2].id, name: "Sugar", quantity: "1 1/2", unit: "cups" },
      { recipeId: insertedRecipes[2].id, name: "Cocoa powder", quantity: "3/4", unit: "cup" },
      { recipeId: insertedRecipes[2].id, name: "Baking soda", quantity: "1 1/2", unit: "teaspoons" },
      { recipeId: insertedRecipes[2].id, name: "Salt", quantity: "1/2", unit: "teaspoon" },
      { recipeId: insertedRecipes[2].id, name: "Vegetable oil", quantity: "1/2", unit: "cup" },
      { recipeId: insertedRecipes[2].id, name: "Vanilla extract", quantity: "1", unit: "teaspoon" },
      { recipeId: insertedRecipes[2].id, name: "Apple cider vinegar", quantity: "1", unit: "teaspoon" },
      { recipeId: insertedRecipes[2].id, name: "Water", quantity: "1", unit: "cup" }
    ],
    // Caesar Salad
    [
      { recipeId: insertedRecipes[3].id, name: "Romaine lettuce", quantity: "1", unit: "head" },
      { recipeId: insertedRecipes[3].id, name: "Parmesan cheese", quantity: "1/2", unit: "cup grated" },
      { recipeId: insertedRecipes[3].id, name: "Caesar dressing", quantity: "1/3", unit: "cup" },
      { recipeId: insertedRecipes[3].id, name: "Croutons", quantity: "1", unit: "cup" },
      { recipeId: insertedRecipes[3].id, name: "Lemon juice", quantity: "1", unit: "teaspoon" }
    ],
    // Beef Stir Fry
    [
      { recipeId: insertedRecipes[4].id, name: "Beef sirloin", quantity: "1", unit: "lb sliced" },
      { recipeId: insertedRecipes[4].id, name: "Bell peppers", quantity: "2", unit: "sliced" },
      { recipeId: insertedRecipes[4].id, name: "Broccoli", quantity: "2", unit: "cups" },
      { recipeId: insertedRecipes[4].id, name: "Carrots", quantity: "2", unit: "sliced" },
      { recipeId: insertedRecipes[4].id, name: "Soy sauce", quantity: "3", unit: "tablespoons" },
      { recipeId: insertedRecipes[4].id, name: "Garlic", quantity: "3", unit: "cloves minced" },
      { recipeId: insertedRecipes[4].id, name: "Ginger", quantity: "1", unit: "teaspoon grated" },
      { recipeId: insertedRecipes[4].id, name: "Vegetable oil", quantity: "2", unit: "tablespoons" }
    ]
  ];

  for (const ingredientsList of recipeIngredients) {
    await db.insert(ingredients).values(ingredientsList);
  }

  // Create steps for each recipe
  console.log("Seeding steps...");
  const recipeSteps = [
    // Fluffy Pancakes
    [
      { recipeId: insertedRecipes[0].id, stepNumber: 1, content: "In a large bowl, whisk together flour, sugar, baking powder, and salt." },
      { recipeId: insertedRecipes[0].id, stepNumber: 2, content: "In another bowl, whisk together milk, eggs, and melted butter." },
      { recipeId: insertedRecipes[0].id, stepNumber: 3, content: "Pour the wet ingredients into the dry ingredients and stir until just combined." },
      { recipeId: insertedRecipes[0].id, stepNumber: 4, content: "Heat a lightly oiled griddle or frying pan over medium-high heat." },
      { recipeId: insertedRecipes[0].id, stepNumber: 5, content: "Pour or scoop the batter onto the griddle, using approximately 1/4 cup for each pancake." },
      { recipeId: insertedRecipes[0].id, stepNumber: 6, content: "Cook until bubbles form and the edges are dry, then flip and cook until browned on the other side." }
    ],
    // Classic Beef Burger
    [
      { recipeId: insertedRecipes[1].id, stepNumber: 1, content: "Preheat a grill or skillet to medium-high heat." },
      { recipeId: insertedRecipes[1].id, stepNumber: 2, content: "Season the ground beef with salt and pepper." },
      { recipeId: insertedRecipes[1].id, stepNumber: 3, content: "Form the beef into 4 patties, about 1 inch thick." },
      { recipeId: insertedRecipes[1].id, stepNumber: 4, content: "Place patties on the grill and cook for 4-5 minutes per side for medium doneness." },
      { recipeId: insertedRecipes[1].id, stepNumber: 5, content: "Toast the hamburger buns on the grill for 1-2 minutes." },
      { recipeId: insertedRecipes[1].id, stepNumber: 6, content: "Assemble the burgers with lettuce, tomato, and onion on the bottom bun, add the patty, and top with the other half of the bun." }
    ],
    // Vegan Chocolate Cake
    [
      { recipeId: insertedRecipes[2].id, stepNumber: 1, content: "Preheat the oven to 350°F (175°C). Grease and flour two 9-inch round pans." },
      { recipeId: insertedRecipes[2].id, stepNumber: 2, content: "In a large bowl, whisk together flour, sugar, cocoa powder, baking soda, and salt." },
      { recipeId: insertedRecipes[2].id, stepNumber: 3, content: "In another bowl, mix together oil, vanilla, vinegar, and water." },
      { recipeId: insertedRecipes[2].id, stepNumber: 4, content: "Pour the wet ingredients into the dry ingredients and whisk until smooth." },
      { recipeId: insertedRecipes[2].id, stepNumber: 5, content: "Divide the batter between the prepared pans." },
      { recipeId: insertedRecipes[2].id, stepNumber: 6, content: "Bake for 30-35 minutes, or until a toothpick inserted into the center comes out clean." },
      { recipeId: insertedRecipes[2].id, stepNumber: 7, content: "Cool in pans for 10 minutes, then turn out onto wire racks to cool completely." }
    ],
    // Caesar Salad
    [
      { recipeId: insertedRecipes[3].id, stepNumber: 1, content: "Wash and dry the romaine lettuce. Chop into bite-sized pieces." },
      { recipeId: insertedRecipes[3].id, stepNumber: 2, content: "In a large bowl, whisk together the Caesar dressing and lemon juice." },
      { recipeId: insertedRecipes[3].id, stepNumber: 3, content: "Add the lettuce to the bowl and toss to coat with dressing." },
      { recipeId: insertedRecipes[3].id, stepNumber: 4, content: "Add the croutons and grated Parmesan cheese." },
      { recipeId: insertedRecipes[3].id, stepNumber: 5, content: "Toss gently to combine and serve immediately." }
    ],
    // Beef Stir Fry
    [
      { recipeId: insertedRecipes[4].id, stepNumber: 1, content: "Heat 1 tablespoon of oil in a large skillet or wok over high heat." },
      { recipeId: insertedRecipes[4].id, stepNumber: 2, content: "Add the beef and cook for 3-4 minutes until browned. Remove and set aside." },
      { recipeId: insertedRecipes[4].id, stepNumber: 3, content: "Add the remaining oil to the skillet. Add garlic and ginger, cook for 30 seconds." },
      { recipeId: insertedRecipes[4].id, stepNumber: 4, content: "Add the vegetables and stir-fry for 3-4 minutes until crisp-tender." },
      { recipeId: insertedRecipes[4].id, stepNumber: 5, content: "Return the beef to the skillet. Add soy sauce and stir to combine." },
      { recipeId: insertedRecipes[4].id, stepNumber: 6, content: "Cook for another 2 minutes until everything is heated through and well combined." }
    ]
  ];

  for (const stepsList of recipeSteps) {
    await db.insert(steps).values(stepsList);
  }

  console.log("Seeding completed!");
  await client.end();
};

main().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});