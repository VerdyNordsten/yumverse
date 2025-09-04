import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChefHat, Clock, Users, Utensils, Sparkles, CookingPot, Apple } from "lucide-react";
import { RecipeImage } from "@/components/recipe/recipe-image";
import Link from "next/link";

// Mock data for featured recipes
const featuredRecipes = [
  {
    id: 1,
    slug: "fluffy-pancakes",
    title: "Fluffy Pancakes",
    description: "Light and fluffy pancakes perfect for breakfast with a dollop of maple syrup",
    coverUrl: "/demo-img.png",
    cookTimeMins: 20,
    servings: 4,
    difficulty: "Easy",
    author: {
      name: "Alice Johnson",
      image: ""
    },
    featured: true,
    category: "Breakfast"
  },
  {
    id: 2,
    slug: "classic-beef-burger",
    title: "Classic Beef Burger",
    description: "Juicy beef burger with fresh toppings and a toasted brioche bun",
    coverUrl: "/demo-img.png",
    cookTimeMins: 30,
    servings: 4,
    difficulty: "Medium",
    author: {
      name: "Bob Smith",
      image: ""
    },
    featured: true,
    category: "Lunch"
  },
  {
    id: 3,
    slug: "vegan-chocolate-cake",
    title: "Vegan Chocolate Cake",
    description: "Rich and moist chocolate cake without any animal products, topped with ganache",
    coverUrl: "/demo-img.png",
    cookTimeMins: 60,
    servings: 8,
    difficulty: "Medium",
    author: {
      name: "Carol Williams",
      image: ""
    },
    category: "Dessert"
  },
  {
    id: 4,
    slug: "caesar-salad",
    title: "Classic Caesar Salad",
    description: "Fresh romaine lettuce with homemade Caesar dressing and crispy croutons",
    coverUrl: "/demo-img.png",
    cookTimeMins: 15,
    servings: 2,
    difficulty: "Easy",
    author: {
      name: "Alice Johnson",
      image: ""
    },
    category: "Salad"
  },
  {
    id: 5,
    slug: "spaghetti-bolognese",
    title: "Spaghetti Bolognese",
    description: "Traditional Italian pasta with rich meat sauce and parmesan cheese",
    coverUrl: "/demo-img.png",
    cookTimeMins: 45,
    servings: 4,
    difficulty: "Medium",
    author: {
      name: "Marco Rossi",
      image: ""
    },
    category: "Dinner"
  }
];

export function RecipeSliderBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredRecipes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const currentRecipe = featuredRecipes[currentIndex];

  // Animation variants for the content
  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 p-8 md:p-12 border-2 border-primary/30">
      {/* Background pattern with food illustrations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIiBmaWxsPSIjRjJDNkRFIi8+PC9zdmc+')"></div>
      </div>
      
      {/* Floating food icons */}
      <div className="absolute inset-0 pointer-events-none">
        <CookingPot className="absolute top-10 left-10 text-primary/20 w-8 h-8 animate-pulse" />
        <Apple className="absolute top-20 right-20 text-accent/20 w-6 h-6 animate-pulse" />
        <Utensils className="absolute bottom-20 left-20 text-secondary/20 w-7 h-7 animate-pulse" />
        <Sparkles className="absolute bottom-10 right-10 text-primary/20 w-5 h-5 animate-pulse" />
      </div>

      <div className="relative z-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recipe Info */}
          <div className="flex flex-col justify-center">
            <motion.div
              key={currentIndex}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="space-y-6"
            >
              <motion.div variants={itemVariants}>
                <Badge className="mb-4 w-fit bg-gradient-to-r from-primary to-accent text-white px-2 py-2">
                  Featured Recipe
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={itemVariants}
                className="font-bold text-3xl text-foreground md:text-4xl"
              >
                {currentRecipe.title}
              </motion.h1>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg text-muted-foreground"
              >
                {currentRecipe.description}
              </motion.p>
              
              <motion.div 
                variants={itemVariants}
                className="grid grid-cols-2 gap-4 md:grid-cols-3"
              >
                <div className="flex items-center gap-2 rounded-xl bg-primary/10 p-3 backdrop-blur-sm border border-primary/20">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Cook Time</p>
                    <p className="font-semibold text-foreground">{currentRecipe.cookTimeMins} mins</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 rounded-xl bg-secondary/10 p-3 backdrop-blur-sm border border-secondary/20">
                  <Users className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Servings</p>
                    <p className="font-semibold text-foreground">{currentRecipe.servings}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 rounded-xl bg-accent/10 p-3 backdrop-blur-sm border border-accent/20">
                  <ChefHat className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                    <p className="font-semibold text-foreground">{currentRecipe.difficulty}</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex items-center gap-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="font-bold">
                    {currentRecipe.author.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">By {currentRecipe.author.name}</p>
                  <p className="text-sm text-muted-foreground">{currentRecipe.category}</p>
                </div>
              </motion.div>
              
              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap gap-4"
              >
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-secondary text-secondary hover:bg-secondary/10 rounded-xl"
                  asChild
                >
                  <Link href={`/recipes/${currentRecipe.slug}`}>
                    <ChefHat className="mr-2 h-5 w-5" />
                    View Recipe
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10 rounded-xl"
                  asChild
                >
                  <Link href="/submit">
                    <Utensils className="mr-2 h-5 w-5" />
                    Add Recipe
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-accent text-accent hover:bg-accent/10 rounded-xl"
                  asChild
                >
                  <Link href="/surprise-me">
                    <Sparkles className="mr-2 h-5 w-5" />
                    Surprise Me!
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Recipe Image Slider */}
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-lg">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 70 }}
                  animate={{ opacity: 1, x: 60 }}
                  exit={{ opacity: 0, x: direction > 0 ? -10 : 90 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="relative rounded-3xl overflow-hidden"
                >
                  <div className="relative rounded-3xl overflow-hidden">
                    <div className="h-80 md:h-96 rounded-3xl overflow-hidden">
                      <RecipeImage
                        src={currentRecipe.coverUrl}
                        alt={currentRecipe.title}
                        width={400}
                        height={300}
                        className="object-contain transition-transform duration-1000 hover:scale-75 rounded-3xl"
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
              
              {/* Slide Indicators */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {featuredRecipes.map((_, index) => (
                  <button
                    key={index}
                    className={`h-3 w-3 rounded-full transition-all ${
                      index === currentIndex ? "bg-primary w-6" : "bg-primary/30"
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}