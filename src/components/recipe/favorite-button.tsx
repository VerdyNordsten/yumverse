"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useState } from "react";

interface FavoriteButtonProps {
  isFavorited?: boolean;
  favoritesCount?: number;
  onToggle?: () => void;
}

export function FavoriteButton({
  isFavorited = false,
  favoritesCount = 0,
  onToggle
}: FavoriteButtonProps) {
  const [favorited, setFavorited] = useState(isFavorited);
  const [count, setCount] = useState(favoritesCount);

  const handleClick = () => {
    setFavorited(!favorited);
    setCount(favorited ? count - 1 : count + 1);
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleClick}
      className="flex items-center gap-2"
    >
      <Heart
        className={`h-4 w-4 ${favorited ? "fill-primary text-primary" : ""}`}
      />
      <span>{count}</span>
    </Button>
  );
}