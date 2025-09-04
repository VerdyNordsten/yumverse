const site_url = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const site = {
  name: "Webapp Recipes",
  description: "Discover and share delicious recipes from around the world",
  url: site_url,
  ogImage: `${site_url}/og.jpg`,
  logo: "/logo.svg",
  mailSupport: "hello@recipewebapp.com", // Support email address
  mailFrom: process.env.MAIL_FROM || "noreply@recipewebapp.com", // Transactional email address
  links: {
    twitter: "https://twitter.com/recipewebapp",
    github: "https://github.com/recipewebapp",
    linkedin: "https://www.linkedin.com/company/recipewebapp",
  }
} as const;