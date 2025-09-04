import { RecipeGrid } from "@/components/recipe/recipe-grid";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Bookmark, Star } from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const mockRecipes = [
  {
    id: 1,
    slug: "fluffy-pancakes",
    title: "Fluffy Pancakes",
    description: "Light and fluffy pancakes perfect for breakfast",
    coverUrl: "/demo-img.png",
    cookTimeMins: 20,
    servings: 4,
    difficulty: "Easy",
    author: {
      name: "Alice Johnson",
      image: ""
    },
    featured: true
  },
  {
    id: 2,
    slug: "classic-beef-burger",
    title: "Classic Beef Burger",
    description: "Juicy beef burger with fresh toppings",
    coverUrl: "/demo-img.png",
    cookTimeMins: 30,
    servings: 4,
    difficulty: "Medium",
    author: {
      name: "Alice Johnson",
      image: ""
    }
  }
];

const mockFavorites = [
  {
    id: 3,
    slug: "vegan-chocolate-cake",
    title: "Vegan Chocolate Cake",
    description: "Rich and moist chocolate cake without any animal products",
    coverUrl: "/demo-img.png",
    cookTimeMins: 60,
    servings: 8,
    difficulty: "Medium",
    author: {
      name: "Carol Williams",
      image: ""
    }
  }
];

const mockCollections = [
  {
    id: 1,
    title: "Quick Weeknight Dinners",
    recipeCount: 12
  },
  {
    id: 2,
    title: "Healthy Breakfast Ideas",
    recipeCount: 8
  },
  {
    id: 3,
    title: "Family Favorites",
    recipeCount: 15
  }
];

export default function UserRecipesPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl">My Recipes</h1>
          <p className="text-muted-foreground">
            Manage your recipes, favorites, and collections
          </p>
        </div>
        <Button asChild>
          <Link href="/submit">Submit Recipe</Link>
        </Button>
      </div>

      <Tabs defaultValue="my-recipes" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="my-recipes" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            My Recipes
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Heart className="h-4 w-4" />
            Favorites
          </TabsTrigger>
          <TabsTrigger value="collections" className="flex items-center gap-2">
            <Bookmark className="h-4 w-4" />
            Collections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-recipes" className="mt-6">
          {mockRecipes.length > 0 ? (
            <RecipeGrid recipes={mockRecipes} />
          ) : (
            <div className="text-center">
              <p className="mb-4 text-muted-foreground">
                You haven't submitted any recipes yet.
              </p>
              <Button asChild>
                <Link href="/submit">Submit Your First Recipe</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="mt-6">
          {mockFavorites.length > 0 ? (
            <RecipeGrid recipes={mockFavorites} />
          ) : (
            <div className="text-center">
              <p className="mb-4 text-muted-foreground">
                You haven't favorited any recipes yet.
              </p>
              <Button asChild>
                <Link href="/recipes">Browse Recipes</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="collections" className="mt-6">
          {mockCollections.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {mockCollections.map((collection) => (
                <div
                  key={collection.id}
                  className="rounded-lg border p-6 hover:bg-muted/50"
                >
                  <h3 className="font-semibold text-lg">{collection.title}</h3>
                  <p className="text-muted-foreground">
                    {collection.recipeCount} recipes
                  </p>
                  <Button variant="link" className="mt-2 p-0" asChild>
                    <Link href={`/collections/${collection.id}`}>View Collection</Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-muted-foreground">
                You haven't created any collections yet.
              </p>
              <Button variant="outline">Create Collection</Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}