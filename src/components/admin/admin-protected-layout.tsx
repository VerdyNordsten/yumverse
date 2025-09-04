"use client";

import { ReactNode, useEffect } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

interface AdminProtectedLayoutProps {
  children: ReactNode;
}

export function AdminProtectedLayout({ children }: AdminProtectedLayoutProps) {
  const { isLoading, isAuthenticated } = useAdminAuth();
  const router = useRouter();
  
  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/admin/auth");
    }
  }, [isLoading, isAuthenticated, router]);
  
  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="h-16 border-b">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="flex flex-1">
          <div className="hidden md:block w-64 border-r">
            <Skeleton className="h-full w-full" />
          </div>
          <main className="flex-1 overflow-y-auto p-6">
            <Skeleton className="h-10 w-64 mb-4" />
            <Skeleton className="h-6 w-96 mb-8" />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <Skeleton key={item} className="h-32 w-full" />
              ))}
            </div>
          </main>
        </div>
      </div>
    );
  }
  
  // If user is not authenticated, don't render anything (they'll be redirected)
  if (!isAuthenticated) {
    return null;
  }
  
  // If user is authenticated, show full admin layout
  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}