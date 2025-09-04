import { pgTable, text, timestamp, boolean, integer, pgEnum as enumPg, serial, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// User roles enum
export const userRoleEnum = enumPg("user_role", ["user", "admin"]);

// User table with additional fields for recipe app
export const users = pgTable("users", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: boolean("email_verified")
        .$defaultFn(() => false)
        .notNull(),
    image: text("image"),
    avatar: text("avatar"),
    avatarUrl: text("avatar_url"),
    bio: text("bio"),
    dietaryPrefs: text("dietary_prefs"),
    role: userRoleEnum("role").default("user").notNull(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull()
});

// User relations
export const usersRelations = relations(users, ({ many }) => ({
    recipes: many(recipes),
    favorites: many(favorites),
    ratings: many(ratings),
    comments: many(comments),
    collections: many(collections)
}));

// Recipe difficulty enum
export const difficultyEnum = enumPg("difficulty", ["easy", "medium", "hard"]);

// Recipe status enum
export const recipeStatusEnum = enumPg("recipe_status", ["draft", "published", "rejected"]);

// Recipes table
export const recipes = pgTable("recipes", {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    description: text("description"),
    coverUrl: text("cover_url"),
    servings: integer("servings"),
    cookTimeMins: integer("cook_time_mins"),
    difficulty: difficultyEnum("difficulty").notNull(),
    status: recipeStatusEnum("status").default("draft").notNull(),
    featured: boolean("featured").default(false).notNull(),
    authorId: text("author_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull()
});

// Recipe relations
export const recipesRelations = relations(recipes, ({ one, many }) => ({
    author: one(users, {
        fields: [recipes.authorId],
        references: [users.id]
    }),
    ingredients: many(ingredients),
    steps: many(steps),
    categories: many(recipeCategories),
    tags: many(recipeTags),
    favorites: many(favorites),
    ratings: many(ratings),
    comments: many(comments),
    collectionItems: many(collectionItems)
}));

// Ingredients table
export const ingredients = pgTable("ingredients", {
    id: serial("id").primaryKey(),
    recipeId: integer("recipe_id")
        .notNull()
        .references(() => recipes.id, { onDelete: "cascade" }),
    groupLabel: text("group_label"),
    name: text("name").notNull(),
    quantity: text("quantity").notNull(),
    unit: text("unit")
});

// Ingredients relations
export const ingredientsRelations = relations(ingredients, ({ one }) => ({
    recipe: one(recipes, {
        fields: [ingredients.recipeId],
        references: [recipes.id]
    })
}));

// Steps table
export const steps = pgTable("steps", {
    id: serial("id").primaryKey(),
    recipeId: integer("recipe_id")
        .notNull()
        .references(() => recipes.id, { onDelete: "cascade" }),
    stepNumber: integer("step_number").notNull(),
    content: text("content").notNull(),
    imageUrl: text("image_url")
});

// Steps relations
export const stepsRelations = relations(steps, ({ one }) => ({
    recipe: one(recipes, {
        fields: [steps.recipeId],
        references: [recipes.id]
    })
}));

// Categories table
export const categories = pgTable("categories", {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull()
});

// Categories relations
export const categoriesRelations = relations(categories, ({ many }) => ({
    recipeCategories: many(recipeCategories)
}));

// Tags table
export const tags = pgTable("tags", {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    name: text("name").notNull()
});

// Tags relations
export const tagsRelations = relations(tags, ({ many }) => ({
    recipeTags: many(recipeTags)
}));

// Recipe-Categories junction table
export const recipeCategories = pgTable("recipe_categories", {
    recipeId: integer("recipe_id")
        .notNull()
        .references(() => recipes.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
        .notNull()
        .references(() => categories.id, { onDelete: "cascade" })
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.recipeId, table.categoryId] })
    };
});

// Recipe-Categories relations
export const recipeCategoriesRelations = relations(recipeCategories, ({ one }) => ({
    recipe: one(recipes, {
        fields: [recipeCategories.recipeId],
        references: [recipes.id]
    }),
    category: one(categories, {
        fields: [recipeCategories.categoryId],
        references: [categories.id]
    })
}));

// Recipe-Tags junction table
export const recipeTags = pgTable("recipe_tags", {
    recipeId: integer("recipe_id")
        .notNull()
        .references(() => recipes.id, { onDelete: "cascade" }),
    tagId: integer("tag_id")
        .notNull()
        .references(() => tags.id, { onDelete: "cascade" })
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.recipeId, table.tagId] })
    };
});

// Recipe-Tags relations
export const recipeTagsRelations = relations(recipeTags, ({ one }) => ({
    recipe: one(recipes, {
        fields: [recipeTags.recipeId],
        references: [recipes.id]
    }),
    tag: one(tags, {
        fields: [recipeTags.tagId],
        references: [tags.id]
    })
}));

// Favorites table
export const favorites = pgTable("favorites", {
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    recipeId: integer("recipe_id")
        .notNull()
        .references(() => recipes.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull()
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.userId, table.recipeId] })
    };
});

// Favorites relations
export const favoritesRelations = relations(favorites, ({ one }) => ({
    user: one(users, {
        fields: [favorites.userId],
        references: [users.id]
    }),
    recipe: one(recipes, {
        fields: [favorites.recipeId],
        references: [recipes.id]
    })
}));

// Ratings table
export const ratings = pgTable("ratings", {
    id: serial("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    recipeId: integer("recipe_id")
        .notNull()
        .references(() => recipes.id, { onDelete: "cascade" }),
    value: integer("value").notNull(), // 1-5 stars
    createdAt: timestamp("created_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull()
});

// Ratings relations
export const ratingsRelations = relations(ratings, ({ one }) => ({
    user: one(users, {
        fields: [ratings.userId],
        references: [users.id]
    }),
    recipe: one(recipes, {
        fields: [ratings.recipeId],
        references: [recipes.id]
    })
}));

// Comments table
export const comments = pgTable("comments", {
    id: serial("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    recipeId: integer("recipe_id")
        .notNull()
        .references(() => recipes.id, { onDelete: "cascade" }),
    body: text("body").notNull(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull()
});

// Comments relations
export const commentsRelations = relations(comments, ({ one }) => ({
    user: one(users, {
        fields: [comments.userId],
        references: [users.id]
    }),
    recipe: one(recipes, {
        fields: [comments.recipeId],
        references: [recipes.id]
    })
}));

// Collections table
export const collections = pgTable("collections", {
    id: serial("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    createdAt: timestamp("created_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: timestamp("updated_at")
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull()
});

// Collections relations
export const collectionsRelations = relations(collections, ({ one, many }) => ({
    user: one(users, {
        fields: [collections.userId],
        references: [users.id]
    }),
    collectionItems: many(collectionItems)
}));

// Collection items table
export const collectionItems = pgTable("collection_items", {
    collectionId: integer("collection_id")
        .notNull()
        .references(() => collections.id, { onDelete: "cascade" }),
    recipeId: integer("recipe_id")
        .notNull()
        .references(() => recipes.id, { onDelete: "cascade" }),
    order: integer("order")
}, (table) => {
    return {
        pk: primaryKey({ columns: [table.collectionId, table.recipeId] })
    };
});

// Collection items relations
export const collectionItemsRelations = relations(collectionItems, ({ one }) => ({
    collection: one(collections, {
        fields: [collectionItems.collectionId],
        references: [collections.id]
    }),
    recipe: one(recipes, {
        fields: [collectionItems.recipeId],
        references: [recipes.id]
    })
}));

// Auth tables (keeping the essential ones)
export const sessions = pgTable("sessions", {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" })
});

export const accounts = pgTable("accounts", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => users.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").notNull(),
    updatedAt: timestamp("updated_at").notNull()
});

export const verifications = pgTable("verifications", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").$defaultFn(
        () => /* @__PURE__ */ new Date()
    ),
    updatedAt: timestamp("updated_at").$defaultFn(
        () => /* @__PURE__ */ new Date()
    )
});
