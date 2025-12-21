"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // TODO: Implement password reset logic
      console.log("Reset password for:", email)
      setIsSubmitted(true)
    } catch (error) {
      console.error("Password reset error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        {/* Back Button */}
        <Link
          href="/auth/signin"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>

        {/* Logo/Avatar */}
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-linear-to-br from-purple-400 to-purple-600 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/50 backdrop-blur-sm"></div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-semibold text-foreground">Forgot password?</h1>
          <p className="text-muted-foreground">
            {isSubmitted
              ? "Check your email for a reset link."
              : "No worries, we'll send you reset instructions."}
          </p>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-11"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-medium"
            >
              {isLoading ? "Sending..." : "Reset password"}
            </Button>
          </form>
        ) : (
          <div className="space-y-6">
            <Button
              asChild
              className="w-full h-11 bg-purple-600 hover:bg-purple-700 text-white font-medium"
            >
              <Link href="/auth/signin">Back to sign in</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
