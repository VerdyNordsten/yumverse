"use client";

import Image from "next/image";
import { ChefHat } from "lucide-react";

interface RecipeImageProps {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export function RecipeImage({ src, alt, width, height, className }: RecipeImageProps) {
  // If no src is provided, we'll show a placeholder with a food icon
  if (!src) {
    return (
      <div 
        className={`relative flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20 ${className}`}
        style={{ width, height }}
      >
        <ChefHat className="h-1/2 w-1/2 text-primary/30" />
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}