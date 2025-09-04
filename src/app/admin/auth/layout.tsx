import { ReactNode } from "react";

interface AdminAuthLayoutProps {
  children: ReactNode;
}

export default function AdminAuthLayout({ children }: AdminAuthLayoutProps) {
  // Simple layout for auth pages - no admin header/sidebar
  return <div>{children}</div>;
}