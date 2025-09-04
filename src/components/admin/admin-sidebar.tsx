"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  BookOpen, 
  FolderOpen, 
  Tag, 
  Users, 
  Settings,
  Utensils,
  Calendar,
  Heart,
  LogOut
} from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const adminNavItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Recipes",
    href: "/admin/recipes",
    icon: BookOpen,
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderOpen,
  },
  {
    title: "Tags",
    href: "/admin/tags",
    icon: Tag,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Meal Planner",
    href: "/admin/meal-planner",
    icon: Calendar,
  },
  {
    title: "Favorites",
    href: "/admin/favorites",
    icon: Heart,
  },
  {
    title: "Collections",
    href: "/admin/collections",
    icon: Utensils,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const toastId = toast.loading("Logging out...");
    
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.dismiss(toastId);
            toast.success("Logout successful!");
            router.push("/admin/auth");
            router.refresh();
          },
          onError: () => {
            toast.dismiss(toastId);
            toast.error("Logout failed. Redirecting to login...");
            router.push("/admin/auth");
            router.refresh();
          }
        }
      });
    } catch (error) {
      toast.dismiss(toastId);
      toast.error("Logout failed. Redirecting to login...");
      router.push("/admin/auth");
      router.refresh();
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block w-64 border-r">
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Admin Panel
            </h2>
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <div className="space-y-1">
                {adminNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  
                  return (
                    <Button
                      key={item.href}
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={item.href}>
                        <Icon className="mr-2 h-4 w-4" />
                        {item.title}
                      </Link>
                    </Button>
                  );
                })}
                {/* Logout Button - Only one, below Settings */}
                <div className="pt-4 mt-4 border-t">
                  <Button
                    variant="destructive"
                    className="w-full justify-start bg-red-500 hover:bg-red-600 text-white"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    {isLoggingOut ? "Logging out..." : "Logout"}
                  </Button>
                </div>
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </>
  );
}