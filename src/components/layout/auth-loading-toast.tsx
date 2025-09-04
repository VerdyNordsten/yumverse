"use client"

import { toast } from "sonner"
import { useEffect } from "react"

export function WelcomeToast() {
    useEffect(() => {
        toast.success("Welcome! Please sign in or sign up to continue.");
    }, []);
    
    return null
} 