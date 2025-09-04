"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { authClient } from "@/lib/auth-client";
import { useAdminAuth } from "@/hooks/use-admin-auth";

export default function AdminAuthPage() {
  const router = useRouter();
  const { isLoading: authLoading, isAuthenticated } = useAdminAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect authenticated users away from the login page
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      router.push("/admin/dashboard");
    }
  }, [authLoading, isAuthenticated, router]);

  // Show loading state
  if (authLoading) {
    return (
      <main className="container mx-auto flex grow flex-col items-center justify-center gap-4 self-center bg-background py-8 sm:py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-2 mx-auto"></div>
          </div>
          <Card>
            <CardHeader>
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </CardFooter>
          </Card>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        fetchOptions: {
          onError: (ctx) => {
            toast.error(ctx.error.message || "Invalid credentials");
          }
        }
      });
      
      if (error) {
        toast.error(error.message || "Invalid credentials");
        return;
      }
      
      // Verify admin role by calling our verification API
      try {
        const response = await fetch("/api/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email })
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          
          // Sign out the user since they're not authorized
          await authClient.signOut();
          
          if (response.status === 403) {
            toast.error("Access denied. Admin privileges required.");
          } else {
            toast.error(errorData.error || "Authentication failed");
          }
          return;
        }
        
        toast.success("Login successful!");
        // Redirect to admin dashboard
        router.push("/admin/dashboard");
        router.refresh();
      } catch (apiError) {
        // Sign out the user since we couldn't verify their role
        await authClient.signOut();
        toast.error("Failed to verify admin privileges");
      }
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="container mx-auto flex grow flex-col items-center justify-center gap-4 self-center bg-background py-8 sm:py-12 px-4">
      <Link href="/" className="absolute top-4 left-4">
        <Button
          variant="outline"
          className="hover:bg-secondary hover:text-secondary-foreground"
          size="sm"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          <span className="hidden sm:inline">Back to Site</span>
          <span className="sm:hidden">Back</span>
        </Button>
      </Link>

      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          <p className="text-muted-foreground text-sm">Access the administration panel</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>
              Enter your email and password to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                      <span className="sr-only">
                        {showPassword ? "Hide" : "Show"} password
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </CardFooter>
        </Card>

        <div className="text-center text-muted-foreground text-xs mt-4">
          <p>
            Only authorized administrators can access this area.
          </p>
        </div>
      </div>
    </main>
  );
}