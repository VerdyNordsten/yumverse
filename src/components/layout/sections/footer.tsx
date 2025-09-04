import { 
  Mail, 
  Utensils, 
  Calendar, 
  BookOpen, 
  Upload, 
  Soup, 
  Search, 
  Heart, 
  Star, 
  Cake, 
  Leaf, 
  Clock, 
  Coffee, 
  Users, 
  Tags,
  Camera
} from "lucide-react"
import XIcon from "@/components/icons/x-icon"
import GithubIcon from "@/components/icons/github-icon"
import LinkedInIcon from "@/components/icons/linkedin-icon"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { site } from "@/config/site"
import { Input } from "@/components/ui/input"

interface FooterLinkProps {
    href: string
    label: string
    icon?: React.ReactNode
    external?: boolean
}

interface FooterSectionProps {
    title: string
    links: FooterLinkProps[]
}

const footerSections: FooterSectionProps[] = [
    {
        title: "Popular Recipes",
        links: [
            { href: "/categories/dessert", label: "Desserts", icon: <Cake className="mr-2 h-4 w-4" /> },
            { href: "/categories/vegan", label: "Vegan", icon: <Leaf className="mr-2 h-4 w-4" /> },
            { href: "/categories/quick", label: "Quick Meals", icon: <Clock className="mr-2 h-4 w-4" /> },
            { href: "/categories/breakfast", label: "Breakfast", icon: <Coffee className="mr-2 h-4 w-4" /> }
        ]
    },
    {
        title: "Community",
        links: [
            { href: "/submit", label: "Submit Recipe", icon: <Upload className="mr-2 h-4 w-4" /> },
            { href: "/meal-planner", label: "Meal Planner", icon: <Calendar className="mr-2 h-4 w-4" /> },
            { href: "/blog", label: "Food Blog", icon: <BookOpen className="mr-2 h-4 w-4" /> },
            { href: "/community", label: "Community", icon: <Users className="mr-2 h-4 w-4" /> }
        ]
    },
    {
        title: "Resources",
        links: [
            { href: "/recipes", label: "All Recipes", icon: <Soup className="mr-2 h-4 w-4" /> },
            { href: "/categories", label: "Categories", icon: <Tags className="mr-2 h-4 w-4" /> },
            { href: "/search", label: "Recipe Search", icon: <Search className="mr-2 h-4 w-4" /> },
            { href: "/favorites", label: "Favorites", icon: <Heart className="mr-2 h-4 w-4" /> }
        ]
    }
]

const socialLinks: FooterLinkProps[] = [
    {
        href: site.links.github,
        label: "GitHub",
        icon: <GithubIcon className="size-5 fill-foreground" />,
        external: true
    },
    {
        href: site.links.twitter,
        label: "Twitter",
        icon: <XIcon className="size-5 fill-foreground" />,
        external: true
    },
    {
        href: "https://instagram.com",
        label: "Instagram",
        icon: <Camera className="size-5" />,
        external: true
    },
    {
        href: "https://tiktok.com",
        label: "TikTok",
        icon: <Star className="size-5" />,
        external: true
    },
    {
        href: `mailto:${site.mailSupport}`,
        label: "Email",
        icon: <Mail className="size-5" />
    }
]

export const FooterSection = () => {
    return (
        <footer id="footer">
            <div className="mx-auto max-w-7xl pt-16 pb-0 lg:pb-16">
                <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-background to-accent/10 shadow-xl backdrop-blur-sm">
                    <div className="relative p-8 lg:p-12">
                        {/* Main Footer Content */}
                        <div className="space-y-12 lg:space-y-0">
                            {/* Desktop Layout: Side by side */}
                            <div className="hidden gap-12 lg:grid lg:grid-cols-12">
                                {/* Brand Section */}
                                <div className="col-span-4">
                                    <Link
                                        href="/"
                                        className="group mb-6 flex gap-3 font-bold"
                                    >
                                        <div className="relative">
                                            <Image
                                                src={site.logo}
                                                alt={site.name}
                                                width={40}
                                                height={40}
                                            />
                                        </div>
                                        <h3 className="font-bold text-3xl">
                                            {site.name}
                                        </h3>
                                    </Link>
                                    <p className="mb-6 text-muted-foreground text-lg leading-relaxed">
                                        Discover, cook, and share delicious recipes from home cooks around the world.
                                    </p>

                                    {/* Newsletter Signup */}
                                    <div className="mb-8">
                                        <h4 className="mb-4 font-semibold text-xl">
                                            🍴 Get a recipe in your inbox every day
                                        </h4>
                                        <div className="flex gap-2">
                                            <Input 
                                                type="email" 
                                                placeholder="Your email" 
                                                className="rounded-full px-4 py-2"
                                            />
                                            <Button className="rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                                                Subscribe
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex gap-3">
                                        {socialLinks.map((social) => (
                                            <Button
                                                key={social.label}
                                                asChild
                                                variant="outline"
                                                size="icon"
                                                className="rounded-full hover:bg-primary/10"
                                            >
                                                <Link
                                                    href={social.href}
                                                    target={
                                                        social.external
                                                            ? "_blank"
                                                            : undefined
                                                    }
                                                    rel={
                                                        social.external
                                                            ? "noopener noreferrer"
                                                            : undefined
                                                    }
                                                    aria-label={social.label}
                                                >
                                                    {social.icon}
                                                </Link>
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer Links Desktop */}
                                {footerSections.map((section) => (
                                    <div
                                        key={section.title}
                                        className="col-span-2 flex flex-col"
                                    >
                                        <h4 className="mb-6 font-semibold text-foreground text-lg">
                                            {section.title}
                                        </h4>
                                        <ul className="space-y-4">
                                            {section.links.map((link) => (
                                                <li key={link.label}>
                                                    <Link
                                                        href={link.href}
                                                        className="flex items-center text-muted-foreground text-base underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
                                                    >
                                                        {link.icon}
                                                        {link.label}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                
                                {/* Social Feed Preview */}
                                <div className="col-span-2">
                                    <h4 className="mb-6 font-semibold text-foreground text-lg">
                                        Social Feed
                                    </h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {[...Array(6)].map((_, i) => (
                                            <div 
                                                key={i} 
                                                className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/10"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Mobile/Tablet Layout: Stacked */}
                            <div className="lg:hidden">
                                {/* Brand Section Mobile */}
                                <div className="mb-8">
                                    <Link
                                        href="/"
                                        className="group mb-6 flex gap-3 font-bold"
                                    >
                                        <div className="relative">
                                            <Image
                                                src={site.logo}
                                                alt={site.name}
                                                width={40}
                                                height={40}
                                            />
                                        </div>
                                        <h3 className="font-bold text-3xl">
                                            {site.name}
                                        </h3>
                                    </Link>
                                    <p className="mb-6 max-w-sm text-muted-foreground text-lg leading-relaxed">
                                        Discover, cook, and share delicious recipes from home cooks around the world.
                                    </p>

                                    {/* Newsletter Signup */}
                                    <div className="mb-8">
                                        <h4 className="mb-4 font-semibold text-xl">
                                            🍴 Get a recipe in your inbox every day
                                        </h4>
                                        <div className="flex flex-col gap-2 sm:flex-row">
                                            <Input 
                                                type="email" 
                                                placeholder="Your email" 
                                                className="rounded-full px-4 py-2"
                                            />
                                            <Button className="rounded-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90">
                                                Subscribe
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Social Links Mobile */}
                                    <div className="flex gap-3 mb-8">
                                        {socialLinks.map((social) => (
                                            <Button
                                                key={social.label}
                                                asChild
                                                variant="outline"
                                                size="icon"
                                                className="rounded-full hover:bg-primary/10"
                                            >
                                                <Link
                                                    href={social.href}
                                                    target={
                                                        social.external
                                                            ? "_blank"
                                                            : undefined
                                                    }
                                                    rel={
                                                        social.external
                                                            ? "noopener noreferrer"
                                                            : undefined
                                                    }
                                                    aria-label={social.label}
                                                >
                                                    {social.icon}
                                                </Link>
                                            </Button>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer Links Mobile - Grid */}
                                <div className="grid grid-cols-2 gap-8">
                                    {footerSections.map((section) => (
                                        <div
                                            key={section.title}
                                            className="flex flex-col"
                                        >
                                            <h4 className="mb-4 font-semibold text-foreground text-lg">
                                                {section.title}
                                            </h4>
                                            <ul className="space-y-3">
                                                {section.links.map((link) => (
                                                    <li key={link.label}>
                                                        <Link
                                                            href={link.href}
                                                            className="flex items-center text-muted-foreground text-base underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline"
                                                        >
                                                            {link.icon}
                                                            {link.label}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* Social Feed Preview */}
                                <div className="mt-8">
                                    <h4 className="mb-4 font-semibold text-foreground text-lg">
                                        Social Feed
                                    </h4>
                                    <div className="grid grid-cols-3 gap-2">
                                        {[...Array(6)].map((_, i) => (
                                            <div 
                                                key={i} 
                                                className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-primary/10"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Separator className="my-8 bg-border/50" />

                        {/* Bottom Section */}
                        <div className="flex flex-col justify-between gap-4 lg:flex-row">
                            <div className="flex flex-col items-center gap-4 text-muted-foreground text-sm sm:flex-row">
                                <p>
                                    &copy; 2025 {site.name}. All rights reserved.
                                </p>
                            </div>

                            <div className="flex flex-col items-center gap-3 text-muted-foreground text-sm sm:flex-row">
                                <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                                <Separator orientation="vertical" className="hidden h-4 sm:block" />
                                <Link href="/terms" className="hover:underline">Terms of Service</Link>
                                <Separator orientation="vertical" className="hidden h-4 sm:block" />
                                <Link href="/cookies" className="hover:underline">Cookie Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
