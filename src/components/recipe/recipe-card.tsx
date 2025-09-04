"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Clock, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface RecipeCardProps {
  id: number;
  slug: string;
  title: string;
  description: string;
  coverUrl: string;
  cookTimeMins: number;
  servings: number;
  difficulty: string;
  author: {
    name: string;
    image?: string;
  };
  featured?: boolean;
}

export function RecipeCard({
  slug,
  title,
  description,
  coverUrl,
  cookTimeMins,
  servings,
  difficulty,
  author,
  featured = false
}: RecipeCardProps) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <Image
          src={coverUrl || "/demo-img.png"}
          alt={title}
          width={400}
          height={200}
          className="h-48 w-full object-cover"
        />
        {featured && (
          <Badge className="absolute left-2 top-2 bg-primary">
            Featured
          </Badge>
        )}
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full bg-background/80 backdrop-blur"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>
      <CardHeader className="p-4">
        <h3 className="line-clamp-1 font-semibold text-lg">{title}</h3>
        <p className="line-clamp-2 text-muted-foreground text-sm">
          {description}
        </p>
      </CardHeader>
      <CardContent className="px-4 pb-2">
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{cookTimeMins} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{servings} servings</span>
          </div>
          <Badge variant="secondary">{difficulty}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-2">
        <div className="flex items-center gap-2">
          {author.image ? (
            <Image
              src={author.image}
              alt={author.name}
              width={32}
              height={32}
              className="rounded-full"
            />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary">
              <span className="text-xs font-medium">
                {author.name.charAt(0)}
              </span>
            </div>
          )}
          <span className="text-sm">{author.name}</span>
        </div>
        <Link href={`/recipes/${slug}`}>
          <Button variant="outline" size="sm">
            View Recipe
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}