"use client"

import { Header } from "@/components/header"
import { HeroAnimation } from "@/components/hero-animation"
import { FeaturesSection } from "@/components/features-section"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { TestimonialsSection } from "@/components/testimonials-section"
import { PricingSection } from "@/components/pricing-section"
import { FinalCTASection } from "@/components/final-cta-section"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { SiGithub, SiReact, SiSupabase, SiJavascript, SiNextdotjs, SiTailwindcss, SiGmail } from 'react-icons/si'
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      setIsAuthenticated(!!user)
      setIsLoading(false)
    }
    checkAuth()
  }, [])
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-overlay">
        <HeroAnimation />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-foreground rounded-full text-xs uppercase tracking-wider">
              The Platform
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1] tracking-tight">
              Effortlessly.
              <br />
              <span className="text-muted-foreground">Elevate your message.</span>
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Whether your audience is clients or colleagues, Diploscribe helps you deliver clear, professional
              communication every time.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8" asChild disabled={isLoading}>
                <Link href={isAuthenticated ? "/transform" : "/auth/signin"}>
                  Start Transforming
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 border-border/50 bg-transparent" asChild>
                <Link href="https://github.com/NirmanPatel036" target="_blank" rel="noopener noreferrer">
                  View Documentation
                </Link>
              </Button>
            </div>

            {/* Social Proof */}
            <div className="pt-12 w-full overflow-hidden relative">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-8">
                Prefer a different experience
              </p>
              
              <div className="relative w-full">
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-background to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-background to-transparent z-10 pointer-events-none"></div>

                <div 
                  className="flex"
                  style={{
                    animation: 'marquee 30s linear infinite',
                    width: 'max-content'
                  }}
                >
                  {[0, 1].map((i) => (
                    <div key={i} className="flex items-center gap-12 sm:gap-16 px-6 opacity-70 shrink-0">
                      <SiGithub className="w-8 h-8 text-[#181717] dark:text-white" />
                      <SiReact className="w-8 h-8 text-[#61DAFB]" />
                      <SiSupabase className="w-8 h-8 text-[#3ECF8E]" />
                      <SiJavascript className="w-8 h-8 text-[#F7DF1E]" />
                      <SiNextdotjs className="w-8 h-8 text-[#000000] dark:text-white" />
                      <SiTailwindcss className="w-8 h-8 text-[#06B6D4]" />
                      <SiGmail className="w-8 h-8 text-[#EA4335]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* Features Section */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* Testimonials Section */}
      <section id="testimonials">
        <TestimonialsSection />
      </section>

      {/* Pricing Section */}
      <section id="pricing">
        <PricingSection />
      </section>

      {/* Final CTA Section */}
      <FinalCTASection />

      {/* Footer */}
      <Footer />
    </div>
  )
}
