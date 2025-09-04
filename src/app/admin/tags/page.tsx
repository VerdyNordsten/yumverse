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
import { Edit, Trash, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for demonstration
const mockTags = [
  { id: 1, name: "Gluten-Free", slug: "gluten-free" },
  { id: 2, name: "Spicy", slug: "spicy" },
  { id: 3, name: "Quick", slug: "quick" },
  { id: 4, name: "Vegetarian", slug: "vegetarian" },
  { id: 5, name: "Vegan", slug: "vegan" }
];

export default function AdminTagsPage() {
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
            <h1 className="font-bold text-3xl">Tags</h1>
            <p className="text-muted-foreground">
              Manage recipe tags
            </p>
          </div>
          <Button asChild>
            <Link href="/admin/tags/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Tag
            </Link>
          </Button>
        </div>
      </div>

      {/* Tag List */}
      <Card>
        <CardHeader>
          <CardTitle>All Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell className="font-medium">{tag.name}</TableCell>
                  <TableCell>{tag.slug}</TableCell>
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