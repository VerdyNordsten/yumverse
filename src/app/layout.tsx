import { Providers } from "./providers"
import type { ReactNode } from "react"
import "@/styles/globals.css"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/layout/sections/footer"

import { Inter as FontSans } from "next/font/google";
import "../styles/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          {children}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}

export function AppLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <>
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <FooterSection />
        </>
    )
}