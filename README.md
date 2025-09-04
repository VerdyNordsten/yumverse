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

6. Start the development server:
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

## Development Workflow

1. Create a new feature branch
2. Implement your changes
3. Run tests to ensure nothing is broken
4. Create a pull request for review

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the MIT License.