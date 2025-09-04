"use client"

import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

import { Button } from "../ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    if (!isMounted) {
        return (
            <Button
                variant="outline"
                size="icon"
                className="relative size-10 overflow-hidden rounded-full"
                onClick={toggleTheme}
            >
                <SunIcon className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        )
    }

    return (
        <Button
            variant="outline"
            size="icon"
            className="relative size-10 overflow-hidden rounded-full"
            onClick={toggleTheme}
        >
            {theme === "dark" ? (
                <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
            ) : (
                <SunIcon className="h-[1.2rem] w-[1.2rem]" />
            )}
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}
