"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar, Eye, Edit, Trash } from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminProtectedLayout } from "@/components/admin/admin-protected-layout";

// Mock data for demonstration
const mockMealPlans = [
  {
    id: 1,
    title: "Weekly Healthy Plan",
    author: "Alice Johnson",
    startDate: "2023-06-15",
    endDate: "2023-06-21",
    recipeCount: 14
  },
  {
    id: 2,
    title: "Family Dinner Plan",
    author: "Bob Smith",
    startDate: "2023-06-14",
    endDate: "2023-06-20",
    recipeCount: 12
  }
];

export default function AdminMealPlannerPage() {
  const { isLoading } = useAdminAuth();
  
  if (isLoading) {
    return (
      <div className="py-4 md:py-6">
        <div className="mb-6 md:mb-8">
          <Skeleton className="h-8 w-40 mb-2" />
          <Skeleton className="h-4 w-56" />
        </div>
        
        <div className="mb-6 md:mb-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <Skeleton className="h-5 w-32" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-16" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[1, 2].map((item) => (
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
              <h1 className="font-bold text-2xl md:text-3xl">Meal Planner</h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Manage meal planning features
              </p>
            </div>
            <Button className="w-full md:w-auto">
              <Calendar className="mr-2 h-4 w-4" />
              Create Plan
            </Button>
          </div>
        </div>

        {/* Meal Plans Table */}
        <div className="mb-6 md:mb-8">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <CardTitle>All Meal Plans</CardTitle>
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
                      <TableHead className="whitespace-nowrap">Start Date</TableHead>
                      <TableHead className="whitespace-nowrap">End Date</TableHead>
                      <TableHead className="whitespace-nowrap">Recipes</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockMealPlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium max-w-[150px] truncate">{plan.title}</TableCell>
                        <TableCell className="whitespace-nowrap">{plan.author}</TableCell>
                        <TableCell className="whitespace-nowrap">{plan.startDate}</TableCell>
                        <TableCell className="whitespace-nowrap">{plan.endDate}</TableCell>
                        <TableCell>{plan.recipeCount}</TableCell>
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