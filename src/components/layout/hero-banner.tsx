"use client";

import { Button } from "@/components/ui/button";
import { ChefHat, Search, Users, Heart, Plus, Utensils, CookingPot, Sparkles } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function HeroBanner() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-primary to-brand-accent p-8 shadow-2xl md:p-12">
      {/* Animated background elements with food icons */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary-foreground/10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 24 + 12}px`
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
          >
            {i % 6 === 0 && <ChefHat />}
            {i % 6 === 1 && <Search />}
            {i % 6 === 2 && <Users />}
            {i % 6 === 3 && <Heart />}
            {i % 6 === 4 && <Utensils />}
            {i % 6 === 5 && <CookingPot />}
          </motion.div>
        ))}
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-center">
            <motion.h1 
              className="mb-6 font-bold text-4xl text-primary-foreground md:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Discover & Share Amazing Recipes
            </motion.h1>
            <motion.p 
              className="mb-8 text-lg text-primary-foreground/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Join our community of food lovers to explore thousands of recipes from around the world. 
              Share your own creations and connect with fellow cooks.
            </motion.p>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <Button 
                size="lg" 
                className="rounded-full bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg shadow-lg"
                asChild
              >
                <Link href="/recipes">
                  <ChefHat className="mr-2 h-5 w-5" />
                  Explore Recipes
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                asChild
              >
                <Link href="/submit">
                  <Plus className="mr-2 h-5 w-5" />
                  Add Recipe
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full border-white text-white hover:bg-white/10 px-8 py-6 text-lg"
                asChild
              >
                <Link href="/surprise">
                  <Sparkles className="mr-2 h-5 w-5" />
                  Surprise Me!
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <div className="flex items-center justify-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ 
                scale: 1.05,
                rotate: [0, 5, -5, 0],
              }}
            >
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-white/20 blur-xl"></div>
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                  <div className="flex h-56 w-56 items-center justify-center rounded-full bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm">
                    <ChefHat className="h-24 w-24 text-white" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Stats */}
        <motion.div 
          className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {[
            { value: "10K+", label: "Recipes" },
            { value: "50K+", label: "Cooks" },
            { value: "100K+", label: "Favorites" },
            { value: "4.9", label: "Rating" }
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="rounded-3xl bg-white/10 p-6 text-center backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              <div className="font-bold text-2xl text-white md:text-3xl">
                {stat.value}
              </div>
              <div className="text-white/80 text-sm md:text-base">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}