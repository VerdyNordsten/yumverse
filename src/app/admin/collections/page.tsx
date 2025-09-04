"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminCollectionsPage() {
  const { isLoading } = useAdminAuth();
  
  if (isLoading) {
    return (
      <div className="py-6">
        <div className="mb-8">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-6 w-64" />
        </div>
        
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-64" />
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="font-bold text-3xl">Collections</h1>
        <p className="text-muted-foreground">
          Manage recipe collections
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Collections Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Options for managing recipe collections would go here.</p>
        </CardContent>
      </Card>
    </div>
  );
}