"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";

interface TagPillProps {
  slug: string;
  name: string;
}

export function TagPill({ slug, name }: TagPillProps) {
  return (
    <Link href={`/tags/${slug}`}>
      <Badge variant="outline" className="rounded-full">
        {name}
      </Badge>
    </Link>
  );
}