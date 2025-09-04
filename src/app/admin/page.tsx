"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { AdminProtectedLayout } from "@/components/admin/admin-protected-layout";

export default function AdminPage() {
  const router = useRouter();
  const { isLoading, isAuthenticated } = useAdminAuth();

  useEffect(() => {
    // Redirect authenticated users to the dashboard
    if (!isLoading && isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [isLoading, isAuthenticated, router]);

  // If not authenticated, the AdminProtectedLayout will handle showing an unauthorized message
  // If authenticated, we'll redirect to dashboard above
  return (
    <AdminProtectedLayout>
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="text-center">
          <h1 className="font-bold text-2xl md:text-3xl">Admin Panel</h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    </AdminProtectedLayout>
  );
}