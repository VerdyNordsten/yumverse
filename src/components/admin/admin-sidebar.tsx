"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BookOpen, 
  FolderOpen, 
  Tag, 
  Users, 
  Settings,
  Utensils,
  Calendar,
  Star,
  Heart
} from "lucide-react";

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
  const pathname = usePathname();

  return (
    <div className="pb-12 w-64 border-r">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Admin Panel
          </h2>
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
          </div>
        </div>
      </div>
    </div>
  );
}