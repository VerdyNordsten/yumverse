"use client";

import { ChefHat, Star, Heart, Utensils } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface UserBadge {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  earnedDate?: string;
}

const userBadges: UserBadge[] = [
  {
    id: "beginner",
    title: "👩‍🍳 Beginner",
    description: "Created your first recipe",
    icon: <Utensils className="h-6 w-6" />,
    earned: true,
    earnedDate: "2025-01-15"
  },
  {
    id: "chef",
    title: "🧑‍🍳 Chef Master",
    description: "Created 50 recipes",
    icon: <ChefHat className="h-6 w-6" />,
    earned: false
  },
  {
    id: "favorite",
    title: "❤️ Favorite Cook",
    description: "Had 100 favorites on your recipes",
    icon: <Heart className="h-6 w-6" />,
    earned: true,
    earnedDate: "2025-03-22"
  },
  {
    id: "star",
    title: "⭐ Star Chef",
    description: "Achieved 4.5+ average rating",
    icon: <Star className="h-6 w-6 fill-yellow-500 text-yellow-500" />,
    earned: true,
    earnedDate: "2025-02-10"
  }
];

export function UserBadges() {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 p-8 shadow-lg">
      <h2 className="mb-6 font-bold text-2xl">🏆 Your Badges</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {userBadges.map((badge) => (
          <div
            key={badge.id}
            className={`relative rounded-2xl p-6 ${
              badge.earned
                ? "bg-gradient-to-br from-background to-accent/10 border border-primary/20"
                : "bg-muted/30 opacity-60"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  badge.earned ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                {badge.icon}
              </div>
              <div>
                <h3 className="font-semibold">{badge.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {badge.description}
                </p>
                {badge.earned && badge.earnedDate && (
                  <Badge variant="secondary" className="mt-2 rounded-full">
                    Earned {badge.earnedDate}
                  </Badge>
                )}
              </div>
            </div>
            {!badge.earned && (
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-black/30">
                <span className="font-bold text-white">Locked</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}