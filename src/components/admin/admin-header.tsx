"use client";

import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

let toastId: string | number | undefined;

export function AdminHeader() {
  const router = useRouter();
  const [userName, setUserName] = useState("Admin User");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
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
  
  const handleLogout = async () => {
    setIsLoggingOut(true);
    toastId = toast.loading("Logging out...");
    
    // Add a small delay to ensure the loading toast is visible
    await new Promise(resolve => setTimeout(resolve, 500));
    
    try {
      // Use the auth client for proper logout handling
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            // Dismiss the loading toast and show success
            toast.dismiss(toastId);
            toast.success("Logout successful!");
            // Keep the loading state for a moment so user sees the success message
            setTimeout(() => {
              setIsLoggingOut(false);
              // Redirect to admin login page after successful logout
              router.push("/admin/auth/sign-in");
              router.refresh();
            }, 1000);
          },
          onError: () => {
            // Dismiss the loading toast and show error
            toast.dismiss(toastId);
            toast.error("Logout failed. Redirecting to login...");
            // Keep the loading state for a moment so user sees the error message
            setTimeout(() => {
              setIsLoggingOut(false);
              // Still redirect to login page even if there's an error
              router.push("/admin/auth/sign-in");
              router.refresh();
            }, 1500);
          }
        }
      });
    } catch (error) {
      // Dismiss the loading toast and show error
      toast.dismiss(toastId);
      toast.error("Logout failed. Redirecting to login...");
      // Keep the loading state for a moment so user sees the error message
      setTimeout(() => {
        setIsLoggingOut(false);
        // Redirect to login page after a short delay
        router.push("/admin/auth/sign-in");
        router.refresh();
      }, 1500);
    }
  };

  return (
    <header className="border-b">
      <div className="flex h-16 items-center px-6">
        <div className="flex flex-1 items-center justify-between">
          <h1 className="text-lg font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm">Welcome, {userName}</span>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoggingOut ? "Logging out..." : "Logout"}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}