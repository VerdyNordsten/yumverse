"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChefHat, Users, Heart, BookOpen, Mail, Github, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl md:text-5xl">About RecipeVerse</h1>
        <p className="mx-auto max-w-3xl text-muted-foreground text-xl">
          Your ultimate destination for discovering, sharing, and organizing delicious recipes from around the world.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChefHat className="h-6 w-6 text-primary" />
                Our Story
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <p className="mb-4">
                  RecipeVerse was born from a simple idea: everyone should have access to delicious, 
                  diverse recipes that inspire creativity in the kitchen. Founded in 2023 by passionate 
                  home cooks and food enthusiasts, we set out to create a platform that celebrates the 
                  joy of cooking and sharing meals.
                </p>
                <p className="mb-4">
                  What started as a small collection of family recipes has grown into a vibrant community 
                  of food lovers who share their culinary adventures with the world. Today, RecipeVerse 
                  features thousands of recipes from home cooks, professional chefs, and food bloggers 
                  across the globe.
                </p>
                <p>
                  Our mission is to make cooking accessible, enjoyable, and sustainable for everyone. 
                  Whether you're a seasoned chef or a beginner in the kitchen, RecipeVerse offers 
                  something for every palate and skill level.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                Meet Our Team
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {[
                  { name: "Alex Johnson", role: "Founder & CEO", image: "/demo-img.png" },
                  { name: "Maria Garcia", role: "Head Chef", image: "/demo-img.png" },
                  { name: "David Chen", role: "Lead Developer", image: "/demo-img.png" },
                  { name: "Sarah Williams", role: "Community Manager", image: "/demo-img.png" }
                ].map((member, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-muted-foreground text-sm">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Why We Do It
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <BookOpen className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Share Knowledge</h3>
                  <p className="text-muted-foreground text-sm">
                    Preserve and share culinary traditions and techniques
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Build Community</h3>
                  <p className="text-muted-foreground text-sm">
                    Connect food lovers and foster creativity in the kitchen
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Heart className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="font-semibold">Inspire Joy</h3>
                  <p className="text-muted-foreground text-sm">
                    Make cooking an enjoyable and rewarding experience
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                Have questions, suggestions, or just want to say hello? We'd love to hear from you!
              </p>
              <Button asChild className="w-full">
                <Link href="mailto:hello@recipeverse.com">
                  <Mail className="mr-2 h-4 w-4" />
                  Send us an email
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Connect With Us</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="icon" asChild>
                  <Link href="https://github.com" target="_blank">
                    <Github className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="https://twitter.com" target="_blank">
                    <Twitter className="h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <Link href="https://linkedin.com" target="_blank">
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}