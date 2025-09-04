import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          background: '#EBE8E7',
          primary: '#F2C6DE', // pastel pink
          accent: '#F2C76E',  // soft yellow
          secondary: '#9BD59B', // fresh green
          muted: '#FF9B73',   // warm orange
        },
        // Add the requested color palette
        background: {
          DEFAULT: '#EBE8E7', // neutral background
        },
        primary: {
          DEFAULT: '#F2C6DE', // pastel pink
          foreground: '#FFFFFF',
        },
        secondary: {
          DEFAULT: '#9BD59B', // fresh green
          foreground: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#F2C76E', // soft yellow
          foreground: '#000000',
        },
        muted: {
          DEFAULT: '#FF9B73', // warm orange
          foreground: '#000000',
        },
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "food-pattern": "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23F2C6DE' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};

export default config;