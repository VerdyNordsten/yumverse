"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";

// Mock user data
const mockUser = {
  id: "user_1",
  name: "Alice Johnson",
  email: "alice@example.com",
  image: "",
  bio: "Professional chef and food blogger. Love creating simple, delicious recipes for busy families.",
  dietaryPrefs: ["vegetarian", "gluten-free"]
};

export default function ProfilePage() {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the user data via an API
    console.log("Updating user profile");
    setIsEditing(false);
  };

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="font-bold text-3xl">Profile</h1>
        <p className="text-muted-foreground">
          Manage your profile information
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="relative mx-auto mb-4 h-32 w-32">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback className="text-2xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="font-bold text-xl">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </CardContent>
          </Card>
        </div>

        {/* Profile Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile Information</CardTitle>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={user.name}
                      onChange={(e) => setUser({ ...user, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={user.bio}
                      onChange={(e) => setUser({ ...user, bio: e.target.value })}
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dietaryPrefs">Dietary Preferences</Label>
                    <Input
                      id="dietaryPrefs"
                      placeholder="e.g., vegetarian, gluten-free, dairy-free"
                      value={user.dietaryPrefs.join(", ")}
                      onChange={(e) => setUser({ 
                        ...user, 
                        dietaryPrefs: e.target.value.split(",").map(pref => pref.trim()) 
                      })}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-muted-foreground">Name</h3>
                    <p>{user.name}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-muted-foreground">Email</h3>
                    <p>{user.email}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-muted-foreground">Bio</h3>
                    <p>{user.bio}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-muted-foreground">Dietary Preferences</h3>
                    <p>{user.dietaryPrefs.join(", ")}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}