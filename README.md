# Webapp Recipes

A modern recipe sharing platform built with Next.js, Drizzle ORM, and PostgreSQL.

## Features

- Browse and search recipes
- Submit your own recipes
- Save favorite recipes
- Rate and review recipes
- Organize recipes into collections
- Admin dashboard for moderation and taxonomy management

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Drizzle ORM, PostgreSQL
- **Authentication**: Better Auth
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- pnpm (recommended)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd recipe-webapp
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Copy `.env.example` to `.env` and fill in the required values:
   ```bash
   cp .env.example .env
   ```

4. Run database migrations:
   ```bash
   pnpm db:migrate
   ```

5. Seed the database with sample data:
   ```bash
   pnpm db:seed
   ```

6. Create an admin user:
   ```bash
   pnpm db:create-admin
   ```

7. Start the development server:
   ```bash
   pnpm dev
   ```

## Database Schema

The application uses PostgreSQL with the following main tables:

- `users` - User accounts and profiles
- `recipes` - Recipe information
- `ingredients` - Recipe ingredients
- `steps` - Recipe preparation steps
- `categories` - Recipe categories
- `tags` - Recipe tags
- `favorites` - User favorite recipes
- `ratings` - User recipe ratings
- `comments` - Recipe comments
- `collections` - User recipe collections
- `collection_items` - Recipes in collections

## Project Structure

```
src/
  app/              # Next.js app router pages
  components/       # React components
  database/         # Database schema and connection
  lib/              # Utility functions
  scripts/          # Helper scripts (seed, migrate)
```

## Authentication

The app uses Better Auth for authentication with two user roles:

- `user` - Can submit recipes, favorite recipes, rate recipes, and create collections
- `admin` - Has all user permissions plus moderation capabilities

### Setup

1. Generate a secret key for Better Auth:
   ```bash
   openssl rand -base64 32
   ```

2. Add the following environment variables to your `.env` file:
   ```env
   BETTER_AUTH_SECRET=your-generated-secret
   DATABASE_URL=your-postgresql-connection-string
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

3. Run the development server:
   ```bash
   pnpm dev
   ```

4. Visit `http://localhost:3000/auth/sign-up` to create your first account

### Admin Setup

To create an admin user, you can use one of the following methods:

1. Using the create-admin script:
   ```bash
   pnpm db:create-admin
   ```
   
   This will create an admin user with the following default credentials:
   - Email: admin@example.com
   - Password: admin123
   - Name: Admin User
   
   You can customize these by setting the following environment variables:
   ```env
   ADMIN_EMAIL=your-admin-email@example.com
   ADMIN_PASSWORD=your-secure-password
   ADMIN_NAME=Your Admin Name
   ```

2. Using the update-roles script:
   ```bash
   pnpm db:update-roles
   ```
   
   This will ensure that alice@example.com is an admin and bob@example.com and carol@example.com are regular users.

3. Resetting the admin password:
   ```bash
   pnpm db:reset-admin-password
   ```
   
   This will reset the password for alice@example.com to "admin123".

### Accessing the Admin Dashboard

Admin users can access the admin dashboard at:
- Login: `/admin/auth/signin`
- Dashboard: `/admin/dashboard`

Use one of these sets of credentials:
1. Email: alice@example.com, Password: admin123 (created during seeding and updated to admin role)
2. Email: admin@example.com, Password: admin123 (created with the create-admin script)

Regular users cannot access the admin dashboard and will be redirected to the main site.

### Protected Routes

The following routes require authentication:
- `/submit` - Submit a new recipe
- `/recipes/mine` - View your recipes, favorites, and collections
- `/admin/*` - Admin dashboard (for admin users only)

## Development Workflow

1. Create a new feature branch
2. Implement your changes
3. Run tests to ensure nothing is broken
4. Create a pull request for review

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.