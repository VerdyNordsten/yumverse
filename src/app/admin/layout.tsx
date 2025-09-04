import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  // Simple layout that just renders children
  // Authentication logic is handled by middleware and client components
  return <div className="min-h-screen">{children}</div>;
}