"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
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
  LogOut,
  Menu
} from "lucide-react";
import { useState, useEffect } from "react";
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

export function AdminMobileSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [userName, setUserName] = useState("Admin");
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch user information
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: session } = await authClient.getSession();
        if (session) {
          const response = await fetch("/api/admin/user");
          if (response.ok) {
            const data = await response.json();
            setUserName(data.name || "Admin");
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
      setIsOpen(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Admin Panel</SheetTitle>
          <SheetDescription>
            Navigation menu for admin panel
          </SheetDescription>
        </SheetHeader>
        <div className="flex h-full flex-col">
          <div className="border-b p-4">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
            <p className="text-sm text-muted-foreground truncate">
              Welcome, {userName}
            </p>
          </div>
          <ScrollArea className="flex-1">
            <nav className="space-y-1 p-2">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href={item.href}>
                      <Icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  </Button>
                );
              })}
              {/* Logout Button - More colorful and prominent */}
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
            </nav>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}