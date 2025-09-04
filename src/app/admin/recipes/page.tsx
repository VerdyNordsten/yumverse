"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for demonstration
const mockRecipes = [
  {
    id: 1,
    title: "Homemade Pizza",
    author: "Bob Smith",
    category: "Dinner",
    status: "published",
    createdAt: "2023-06-15"
  },
  {
    id: 2,
    title: "Chocolate Chip Cookies",
    author: "Carol Williams",
    category: "Dessert",
    status: "published",
    createdAt: "2023-06-14"
  },
  {
    id: 3,
    title: "Vegetable Stir Fry",
    author: "Alice Johnson",
    category: "Lunch",
    status: "draft",
    createdAt: "2023-06-10"
  }
];

export default function AdminRecipesPage() {
  const { isLoading } = useAdminAuth();
  
  if (isLoading) {
    return (
      <div className="py-6">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Skeleton className="h-10 w-48 mb-2" />
              <Skeleton className="h-6 w-64" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-bold text-3xl">Recipes</h1>
            <p className="text-muted-foreground">
              Manage all recipes in the system
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/recipes/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Recipe
            </Link>
          </Button>
        </div>
      </div>

      {/* Recipe List */}
      <Card>
        <CardHeader>
          <CardTitle>All Recipes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRecipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell className="font-medium">{recipe.title}</TableCell>
                  <TableCell>{recipe.author}</TableCell>
                  <TableCell>{recipe.category}</TableCell>
                  <TableCell>
                    <Badge variant={recipe.status === "published" ? "default" : "secondary"}>
                      {recipe.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{recipe.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}