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
import { Edit, Trash, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for demonstration
const mockCategories = [
  { id: 1, name: "Breakfast", slug: "breakfast", recipeCount: 12 },
  { id: 2, name: "Lunch", slug: "lunch", recipeCount: 18 },
  { id: 3, name: "Dinner", slug: "dinner", recipeCount: 24 },
  { id: 4, name: "Dessert", slug: "dessert", recipeCount: 8 },
  { id: 5, name: "Snacks", slug: "snacks", recipeCount: 15 }
];

export default function AdminCategoriesPage() {
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
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                  <div className="flex gap-2">
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
            <h1 className="font-bold text-3xl">Categories</h1>
            <p className="text-muted-foreground">
              Manage recipe categories
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/categories/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Category
            </Link>
          </Button>
        </div>
      </div>

      {/* Category List */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Recipes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>{category.recipeCount}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
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