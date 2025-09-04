"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AdminMobileSidebar } from "@/components/admin/admin-mobile-sidebar";

export function AdminHeader() {
  const router = useRouter();
  const [userName, setUserName] = useState("Admin User");
  
  // Fetch user information client-side
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // First check if user is authenticated by getting session
        const { data: session } = await authClient.getSession();
        if (session) {
          // Only fetch user info if user is authenticated
          const response = await fetch("/api/admin/user");
          if (response.ok) {
            const data = await response.json();
            setUserName(data.name || "Admin User");
          }
        }
      } catch (error) {
        // Silently handle errors
      }
    };
    
    fetchUser();
  }, []);
  
  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center gap-2 md:hidden">
          <AdminMobileSidebar />
        </div>
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-lg font-semibold hidden md:block">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm hidden md:inline">Welcome, {userName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}