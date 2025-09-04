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
import { Eye, Edit, Trash } from "lucide-react";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for demonstration
const mockUsers = [
  { 
    id: 1, 
    name: "Alice Johnson", 
    email: "alice@example.com", 
    role: "admin", 
    status: "active",
    joinDate: "2023-01-15"
  },
  { 
    id: 2, 
    name: "Bob Smith", 
    email: "bob@example.com", 
    role: "user", 
    status: "active",
    joinDate: "2023-02-20"
  },
  { 
    id: 3, 
    name: "Carol Williams", 
    email: "carol@example.com", 
    role: "user", 
    status: "inactive",
    joinDate: "2023-03-10"
  }
];

export default function AdminUsersPage() {
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
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
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
            <h1 className="font-bold text-3xl">Users</h1>
            <p className="text-muted-foreground">
              Manage user accounts
            </p>
          </div>
        </div>
      </div>

      {/* User List */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "destructive"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
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