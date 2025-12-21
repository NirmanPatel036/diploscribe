"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full space-y-8 text-center">
        {/* Error Code */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            404 error
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight">
            We can't find that page
          </h1>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white gap-2"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              Take me home
            </Link>
          </Button>
        </div>

        {/* Decorative Element */}
        <div className="pt-12 opacity-20">
          <div className="text-9xl font-bold text-muted-foreground select-none">404</div>
        </div>
      </div>
    </div>
  )
}
