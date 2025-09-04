import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import SubmitRecipeClient from "./submit-recipe-client"

export default async function SubmitRecipePage() {
  const data = await auth.api.getSession({
    headers: {
      cookie: ""
    }
  })
  
  // Redirect to login if not authenticated
  if (!data?.session) {
    redirect("/auth/sign-in?redirectTo=/submit")
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="font-bold text-3xl">Submit a Recipe</h1>
        <p className="text-muted-foreground">
          Share your delicious recipe with our community
        </p>
      </div>
      <SubmitRecipeClient />
    </div>
  )
}