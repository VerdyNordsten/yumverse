"use client"

import { authClient } from "@/lib/auth-client"
import { AuthUIProvider } from "@daveyplate/better-auth-ui"
import { ThemeProvider } from "next-themes"
import type { ReactNode } from "react"
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "sonner"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthUIProvider authClient={authClient}>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextTopLoader color="var(--primary)" showSpinner={false} />
                    {children}
                    <Toaster />
                </ThemeProvider>
            </QueryClientProvider>
        </AuthUIProvider>
    )
}
