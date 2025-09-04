import { Providers } from "./providers"
import type { ReactNode } from "react"
import "@/styles/globals.css"
import { Navbar } from "@/components/layout/navbar"
import { FooterSection } from "@/components/layout/sections/footer"

export default function RootLayout({
    children
}: Readonly<{
    children: ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script
                    async
                    src="/seline.js"
                    data-token="24cc7b65ecf3469"
                />
            </head>
            <body className="flex min-h-svh flex-col antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    )
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