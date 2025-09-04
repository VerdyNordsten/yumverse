"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminSettingsPage() {
  const { isLoading } = useAdminAuth();
  
  if (isLoading) {
    return (
      <div className="py-6">
        <div className="mb-8">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-6 w-64" />
        </div>
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-20 w-full" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-10 w-full" />
              </div>
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-64" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-80" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-4 w-64" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="py-6">
      <div className="mb-8">
        <h1 className="font-bold text-3xl">Settings</h1>
        <p className="text-muted-foreground">
          Manage site configuration
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Site Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Site Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Site Name</Label>
              <Input id="site-name" defaultValue="Yumverse" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">Site Description</Label>
              <Textarea 
                id="site-description" 
                defaultValue="A delightful recipe sharing community" 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-email">Admin Email</Label>
              <Input id="admin-email" type="email" defaultValue="admin@example.com" />
            </div>
            <Button>Save Settings</Button>
          </CardContent>
        </Card>

        {/* Maintenance */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Button variant="destructive">Clear Cache</Button>
              <p className="text-sm text-muted-foreground">
                Clear the application cache to refresh data
              </p>
            </div>
            <div className="space-y-2">
              <Button variant="destructive">Regenerate Thumbnails</Button>
              <p className="text-sm text-muted-foreground">
                Regenerate all recipe image thumbnails
              </p>
            </div>
            <div className="space-y-2">
              <Button variant="destructive">Backup Database</Button>
              <p className="text-sm text-muted-foreground">
                Create a backup of the database
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}