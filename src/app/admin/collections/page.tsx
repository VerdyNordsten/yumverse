"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Utensils, Eye, Edit, Trash } from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminProtectedLayout } from "@/components/admin/admin-protected-layout";

// Mock data for demonstration
const mockCollections = [
  {
    id: 1,
    title: "Summer Recipes",
    author: "Alice Johnson",
    recipeCount: 12,
    createdAt: "2023-06-15"
  },
  {
    id: 2,
    title: "Quick Weeknight Dinners",
    author: "Bob Smith",
    recipeCount: 18,
    createdAt: "2023-06-14"
  },
  {
    id: 3,
    title: "Holiday Desserts",
    author: "Carol Williams",
    recipeCount: 8,
    createdAt: "2023-06-13"
  }
];

export default function AdminCollectionsPage() {
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
                    <Skeleton className="h-4 w-12" />
                    <div className="flex gap-1 md:gap-2">
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
      </div>
    );
  }
  
  return (
    <AdminProtectedLayout>
      <div className="py-4 md:py-6">
        <div className="mb-6 md:mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-bold text-2xl md:text-3xl">Collections</h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Manage user collections
              </p>
            </div>
            <Button className="w-full md:w-auto">
              <Utensils className="mr-2 h-4 w-4" />
              Create Collection
            </Button>
          </div>
        </div>

        {/* Collections Table */}
        <div className="mb-6 md:mb-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>All Collections</CardTitle>
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
                      <TableHead>Title</TableHead>
                      <TableHead className="whitespace-nowrap">Author</TableHead>
                      <TableHead className="whitespace-nowrap">Recipes</TableHead>
                      <TableHead className="whitespace-nowrap">Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockCollections.map((collection) => (
                      <TableRow key={collection.id}>
                        <TableCell className="font-medium max-w-[150px] truncate">{collection.title}</TableCell>
                        <TableCell className="whitespace-nowrap">{collection.author}</TableCell>
                        <TableCell>{collection.recipeCount}</TableCell>
                        <TableCell className="whitespace-nowrap">{collection.createdAt}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1 md:gap-2">
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
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