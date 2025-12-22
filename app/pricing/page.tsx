"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Check, Loader2, ExternalLink } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "0",
    description: "Perfect for individuals and small teams getting started",
    features: [
      "100 transformations/month",
      "All tone adjustment",
      "Email support",
      "Direct Gmail Integration",
    ],
    highlighted: false,
  },
  {
    name: "Professional",
    price: "9",
    description: "For frequent communications that matter",
    features: [
      "1,000 transformations/month",
      "Advanced tone & length control",
      "Priority support",
      "Direct Gmail Integration",
      "Chrome Extension",
      "Enhanced AI controls",
    ],
    highlighted: true,
  },
  {
    name: "Lifetime",
    price: "49",
    description: "No limit, full access",
    features: [
      "Unlimited transformations",
      "Be Limit+",
      "Dedicated support & controls",
      "Direct Gmail Integration",
      "Chrome Extension",
    ],
    highlighted: false,
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
      setIsLoading(false)

      // Check if user just signed in with an intended plan
      if (user) {
        const intendedPlan = sessionStorage.getItem('intendedPlan')
        if (intendedPlan) {
          sessionStorage.removeItem('intendedPlan')
          // Trigger checkout for the intended plan
          handleCheckout(intendedPlan)
        }
      }
    }
    checkAuth()
  }, [])

  const handleCheckout = async (planName: string) => {
    // Check authentication first
    if (!isAuthenticated) {
      // Store intended plan in sessionStorage and redirect to signin
      sessionStorage.setItem('intendedPlan', planName)
      router.push('/auth/signin?redirect=/pricing')
      return
    }

    // For free Starter plan, redirect to dashboard
    if (planName === "Starter") {
      router.push("/dashboard")
      return
    }

    setLoadingPlan(planName)
    
    try {
      const response = await fetch("/api/polar/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planName: planName.toUpperCase() }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create checkout")
      }

      // Redirect to Polar checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Failed to start checkout. Please try again.")
    } finally {
      setLoadingPlan(null)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      
      <main className="pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-tight tracking-tight mb-4 md:mb-6">
              Choose Your Plan
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 md:mb-12 px-4">
              Simple, transparent pricing. Start free, upgrade when you need more.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto mt-6 md:mt-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative p-6 md:p-8 border backdrop-blur-sm transition-all duration-300 ${
                  plan.highlighted
                    ? "border-foreground/40 bg-card/80 lg:scale-105 lg:z-10"
                    : "border-border/40 bg-card/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="px-3 md:px-4 py-1 bg-foreground text-background text-xs font-medium uppercase tracking-wider rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-serif font-light mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mb-3 md:mb-4">
                    <>
                      <span className="text-4xl md:text-5xl font-serif font-light">${plan.price}</span>
                      <span className="text-sm md:text-base text-muted-foreground">{plan.price === "0" ? "/month" : plan.name === "Lifetime" ? "/one-time" : "/month"}</span>
                    </>
                  </div>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                </div>

                {/* Features List */}
                <ul className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-foreground shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  onClick={() => handleCheckout(plan.name)}
                  disabled={loadingPlan === plan.name || isLoading}
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground hover:bg-primary/90"
                      : "bg-transparent border border-border/40 hover:bg-muted/50 text-foreground"
                  }`}
                  size="lg"
                >
                  {loadingPlan === plan.name ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-20 max-w-3xl mx-auto text-center">
            <p className="text-muted-foreground mb-6">
              Professional plan includes a 14-day free trial. No credit card required. Cancel anytime.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-foreground transition-colors">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
