"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export function useAdminAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Get the current session
        const { data: session } = await authClient.getSession();
        
        // Check if user is authenticated
        if (!session) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }
        
        // Check if user has admin role by calling our API endpoint
        // This is necessary because the session might not have role info in all cases
        try {
          const response = await fetch("/api/admin/user");
          if (!response.ok) {
            // Sign out the user since they're not authorized
            await authClient.signOut();
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
          }
          
          const userData = await response.json();
          if (userData.role !== "admin") {
            // Sign out the user since they're not authorized
            await authClient.signOut();
            setIsAuthenticated(false);
            setIsLoading(false);
            return;
          }
          
          setIsAuthenticated(true);
        } catch (apiError) {
          // If API check fails, sign out and mark as not authenticated
          await authClient.signOut();
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [router]);
  
  return { isLoading, isAuthenticated };
}