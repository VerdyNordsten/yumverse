"use client";

import { Star } from "lucide-react";

interface RatingStarsProps {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

export function RatingStars({
  rating,
  interactive = false,
  onRatingChange,
  size = "md"
}: RatingStarsProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          className={`${sizeClasses[size]} ${
            index < Math.floor(rating)
              ? "fill-primary text-primary"
              : "text-muted-foreground"
          } ${interactive ? "cursor-pointer hover:fill-primary/50" : ""}`}
          onClick={() => handleClick(index)}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}