"use client"
import { UserButton } from "@daveyplate/better-auth-ui"
import { Menu, X, Search, Plus, Heart, Calendar, Utensils, Star, Soup } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { ModeToggle } from "./mode-toggle"
import { Button } from "../ui/button"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger
} from "../ui/navigation-menu"
import { Separator } from "../ui/separator"
import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger
} from "../ui/sheet"
import { site } from "@/config/site"
import { useRouter } from "next/navigation"
import { Input } from "../ui/input"
import { authClient } from "@/lib/auth-client"

interface RouteProps {
    href: string
    label: string
    icon?: React.ReactNode
}

const routeList: RouteProps[] = [
    {
        href: "/",
        label: "Home"
    },
    {
        href: "/recipes",
        label: "Recipes"
    },
    {
        href: "/favorites",
        label: "Favorites"
    },
    {
        href: "/meal-planner",
        label: "Meal Planner"
    },
    {
        href: "/about",
        label: "About"
    }
]

export const Navbar = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isSearchOpen, setIsSearchOpen] = React.useState(false)
    const [searchQuery, setSearchQuery] = React.useState("")
    const router = useRouter()
    
    // Use the auth client to get session data
    const { data: session, isPending } = authClient.useSession()

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
            setIsSearchOpen(false)
        }
    }

    return (
        <div className="sticky top-2 z-50 mx-auto w-[98%] max-w-7xl px-4">
            <nav className="rounded-2xl border border-border bg-card/50 shadow-black/2 shadow-sm backdrop-blur-sm">
                <div className="flex items-center justify-between px-4 py-3 lg:px-6">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="group flex items-center gap-2 font-bold"
                    >
                        <div className="relative">
                            <Image
                                src={site.logo}
                                alt={site.name}
                                width={30}
                                height={30}
                            />
                        </div>
                        <h3 className="font-bold text-xl lg:text-2xl">
                            {site.name}
                        </h3>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden items-center space-x-1 lg:flex">
                        <NavigationMenu>
                            <NavigationMenuList className="space-x-2">
                                {routeList.map(({ href, label, icon }) => (
                                    <NavigationMenuItem key={href}>
                                        <NavigationMenuLink asChild>
                                            <Link
                                                href={href}
                                                className="relative rounded-xl px-4 py-2 font-medium text-sm transition-all duration-300 hover:text-primary"
                                            >
                                                {icon}
                                                {label}
                                                <span className="absolute -bottom-1 left-1/2 h-0.5 w-0 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                ))}
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/* Desktop Actions */}
                    <div className="hidden items-center gap-2 lg:flex">
                        <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="size-10 rounded-full"
                        >
                            <Link
                                href="/search"
                                aria-label="Search recipes"
                            >
                                <Search className="size-5" />
                            </Link>
                        </Button>
                        <ModeToggle />
                        
                        {/* Auth buttons with loading state */}
                        {isPending ? (
                            // Show loading skeleton while checking auth state
                            <div className="ml-2 flex gap-2">
                                <div className="h-9 w-20 rounded-full bg-muted animate-pulse"></div>
                                <div className="h-9 w-20 rounded-full bg-muted animate-pulse"></div>
                            </div>
                        ) : session?.user ? (
                            // User is signed in
                            <>
                                <Button
                                    asChild
                                    size="sm"
                                    className="ml-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-white transition-all duration-300 hover:from-primary/90 hover:to-secondary/90"
                                >
                                    <Link href="/submit" className="flex items-center gap-2">
                                        <Plus className="size-4" />
                                        Add Recipe
                                    </Link>
                                </Button>
                                <UserButton />
                            </>
                        ) : (
                            // User is signed out
                            <>
                                <Button
                                    asChild
                                    size="sm"
                                    variant="outline"
                                    className="ml-2 rounded-full px-4 py-2 transition-all duration-300 hover:bg-accent/50"
                                >
                                    <Link href="/auth/sign-in">
                                        Sign In
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className="ml-2 rounded-full bg-gradient-to-r from-primary to-secondary px-4 py-2 text-white transition-all duration-300 hover:from-primary/90 hover:to-secondary/90"
                                >
                                    <Link href="/auth/sign-up">
                                        Sign Up
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <Button
                            asChild
                            variant="outline"
                            size="icon"
                            className="size-10 rounded-full"
                        >
                            <Link
                                href="/search"
                                aria-label="Search recipes"
                            >
                                <Search className="size-5" />
                            </Link>
                        </Button>
                        <ModeToggle />
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-lg hover:bg-accent/50"
                                    aria-label="Toggle menu"
                                >
                                    {isOpen ? (
                                        <X className="size-4" />
                                    ) : (
                                        <Menu className="size-4" />
                                    )}
                                </Button>
                            </SheetTrigger>

                            <SheetContent
                                side="right"
                                className="w-full max-w-sm border-border/50 border-l bg-background/95 backdrop-blur-md"
                            >
                                <div className="flex h-full flex-col">
                                    <SheetHeader className="pb-4">
                                        <SheetTitle>
                                            <Link
                                                href="/"
                                                className="flex items-center gap-2"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <Image
                                                    src={site.logo}
                                                    alt={site.name}
                                                    width={32}
                                                    height={32}
                                                />
                                                <span className="font-bold text-lg">
                                                    {site.name}
                                                </span>
                                            </Link>
                                        </SheetTitle>
                                    </SheetHeader>

                                    <Separator className="mb-4" />

                                    {/* Mobile Navigation Links */}
                                    <div className="flex flex-1 flex-col">
                                        <div className="space-y-1">
                                            {routeList.map(
                                                ({ href, label, icon }) => (
                                                    <Button
                                                        key={href}
                                                        onClick={() =>
                                                            setIsOpen(false)
                                                        }
                                                        asChild
                                                        variant="ghost"
                                                        className="h-auto w-full justify-start px-3 py-2.5 font-medium hover:bg-accent/50"
                                                    >
                                                        <Link href={href}>
                                                            {icon}
                                                            {label}
                                                        </Link>
                                                    </Button>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    {/* Mobile Actions */}
                                    <SheetFooter className="flex-col gap-2 border-border/50 border-t pt-4">
                                        {isPending ? (
                                            // Show loading skeleton while checking auth state
                                            <div className="flex flex-col gap-2 w-full">
                                                <div className="h-10 w-full rounded-full bg-muted animate-pulse"></div>
                                                <div className="h-10 w-full rounded-full bg-muted animate-pulse"></div>
                                            </div>
                                        ) : session?.user ? (
                                            // User is signed in
                                            <>
                                                <Button
                                                    asChild
                                                    className="w-full rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <Link href="/submit" className="flex items-center gap-2">
                                                        <Plus className="size-4" />
                                                        Add Recipe
                                                    </Link>
                                                </Button>
                                                <div className="flex justify-end pt-2 w-full">
                                                    <UserButton />
                                                </div>
                                            </>
                                        ) : (
                                            // User is signed out
                                            <>
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    className="w-full rounded-full"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <Link href="/auth/sign-in">
                                                        Sign In
                                                    </Link>
                                                </Button>
                                                <Button
                                                    asChild
                                                    className="w-full rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    <Link href="/auth/sign-up">
                                                        Sign Up
                                                    </Link>
                                                </Button>
                                            </>
                                        )}
                                    </SheetFooter>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>

            {/* Search Modal */}
            <Sheet open={isSearchOpen} onOpenChange={setIsSearchOpen}>
                <SheetContent 
                    side="top" 
                    className="h-auto max-h-[80vh] rounded-b-2xl border-border/50 border-b bg-background/95 p-0 backdrop-blur-md"
                >
                    <div className="container mx-auto px-4 py-8">
                        <div className="mx-auto max-w-2xl">
                            <h2 className="mb-6 text-center font-bold text-2xl">Search Recipes</h2>
                            <form onSubmit={handleSearch} className="mb-8">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        type="text"
                                        placeholder="Search for recipes, ingredients, categories..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 py-6 text-lg rounded-2xl"
                                        autoFocus
                                    />
                                    <Button 
                                        type="submit" 
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/90 hover:to-secondary/90"
                                        size="sm"
                                    >
                                        Search
                                    </Button>
                                </div>
                            </form>
                            
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <Button 
                                    variant="outline" 
                                    className="h-16 flex flex-col items-center justify-center gap-2 rounded-2xl"
                                    onClick={() => {
                                        router.push("/recipes")
                                        setIsSearchOpen(false)
                                    }}
                                >
                                    <Search className="h-6 w-6" />
                                    <span>Browse All Recipes</span>
                                </Button>
                                <Button 
                                    variant="outline" 
                                    className="h-16 flex flex-col items-center justify-center gap-2 rounded-2xl"
                                    onClick={() => {
                                        router.push("/categories")
                                        setIsSearchOpen(false)
                                    }}
                                >
                                    <Calendar className="h-6 w-6" />
                                    <span>Explore Categories</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    )
}
