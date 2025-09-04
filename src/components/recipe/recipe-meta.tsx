"use client";

import { Clock, Users, ChefHat } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RecipeMetaProps {
  cookTimeMins: number;
  servings: number;
  difficulty: string;
}

export function RecipeMeta({ cookTimeMins, servings, difficulty }: RecipeMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <span>{cookTimeMins} mins</span>
      </div>
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-muted-foreground" />
        <span>{servings} servings</span>
      </div>
      <div className="flex items-center gap-2">
        <ChefHat className="h-5 w-5 text-muted-foreground" />
        <Badge variant="secondary">{difficulty}</Badge>
      </div>
    </div>
  );
}