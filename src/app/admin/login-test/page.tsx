"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginPerformanceTest() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginTime, setLoginTime] = useState<number | null>(null);
  const router = useRouter();

  const handleLogin = async () => {
    setIsLoggingIn(true);
    const startTime = performance.now();

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

      // Check if user has admin role
      if (data.user?.role !== "admin") {
        await authClient.signOut();
        toast.error("Access denied. Admin privileges required.");
        return;
      }

      const endTime = performance.now();
      const duration = endTime - startTime;
      setLoginTime(duration);

      toast.success(`Login successful! Time taken: ${duration.toFixed(2)}ms`);
      router.push("/admin/dashboard");
    } catch (error) {
      toast.error("An error occurred during login");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Login Performance Test</CardTitle>
          <CardDescription>
            Test the login performance of the admin dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
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
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button 
            className="w-full" 
            onClick={handleLogin} 
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Logging in..." : "Login"}
          </Button>
          
          {loginTime !== null && (
            <div className="text-center">
              <p className="font-medium">
                Login completed in: <span className="text-primary">{loginTime.toFixed(2)}ms</span>
              </p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}