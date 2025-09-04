import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Link from "next/link";

// Mock data for demonstration
const mockCollections = [
  {
    id: 1,
    title: "Quick Weeknight Dinners",
    recipeCount: 12,
    description: "Easy and fast recipes for busy weeknights"
  },
  {
    id: 2,
    title: "Healthy Breakfast Ideas",
    recipeCount: 8,
    description: "Nutritious and delicious breakfast recipes to start your day right"
  },
  {
    id: 3,
    title: "Family Favorites",
    recipeCount: 15,
    description: "Recipes that the whole family loves"
  },
  {
    id: 4,
    title: "Vegetarian Delights",
    recipeCount: 10,
    description: "Amazing vegetarian recipes that even meat-eaters will enjoy"
  }
];

export default function CollectionsPage() {
  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-3xl">My Collections</h1>
          <p className="text-muted-foreground">
            Organize your favorite recipes into collections
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Collection
        </Button>
      </div>

      {mockCollections.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockCollections.map((collection) => (
            <Card key={collection.id} className="hover:bg-muted/50">
              <CardHeader>
                <CardTitle>{collection.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  {collection.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {collection.recipeCount} recipes
                  </span>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/collections/${collection.id}`}>View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4 text-muted-foreground">
            You haven't created any collections yet.
          </p>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Your First Collection
          </Button>
        </div>
      )}
    </div>
  );
}