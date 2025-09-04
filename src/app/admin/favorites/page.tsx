"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Heart, Eye, Trash } from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminProtectedLayout } from "@/components/admin/admin-protected-layout";

// Mock data for demonstration
const mockFavorites = [
  {
    id: 1,
    recipe: "Fluffy Pancakes",
    user: "Alice Johnson",
    favoritedAt: "2023-06-15"
  },
  {
    id: 2,
    recipe: "Classic Beef Burger",
    user: "Bob Smith",
    favoritedAt: "2023-06-14"
  },
  {
    id: 3,
    recipe: "Vegan Chocolate Cake",
    user: "Carol Williams",
    favoritedAt: "2023-06-13"
  }
];

export default function AdminFavoritesPage() {
  const { isLoading } = useAdminAuth();
  
  if (isLoading) {
    return (
      <div className="py-4 md:py-6">
        <div className="mb-6 md:mb-8">
          <Skeleton className="h-8 w-32 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        
        <div className="mb-6 md:mb-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <Skeleton className="h-5 w-24" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-16" />
                    <div className="flex gap-1 md:gap-2">
                      <Skeleton className="h-8 w-8" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <AdminProtectedLayout>
      <div className="py-4 md:py-6">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-bold text-2xl md:text-3xl">Favorites</h1>
              <p className="text-muted-foreground text-sm md:text-base">
                View and manage user favorites
              </p>
            </div>
          </div>
        </div>

        {/* Favorites Table */}
        <div className="mb-6 md:mb-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>All Favorites</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="w-full md:w-auto">
                    Export
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Recipe</TableHead>
                      <TableHead className="whitespace-nowrap">User</TableHead>
                      <TableHead className="whitespace-nowrap">Favorited At</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockFavorites.map((favorite) => (
                      <TableRow key={favorite.id}>
                        <TableCell className="font-medium max-w-[150px] truncate">{favorite.recipe}</TableCell>
                        <TableCell className="whitespace-nowrap">{favorite.user}</TableCell>
                        <TableCell className="whitespace-nowrap">{favorite.favoritedAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1 md:gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminProtectedLayout>
  );
}