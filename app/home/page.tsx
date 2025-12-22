import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroAnimation } from "@/components/hero-animation"
import { IMessageDemo } from "@/components/imessage-demo"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Zap, Coffee } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function HomePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'there'

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <HeroAnimation />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-32">
          {/* Split Layout: iMessage Demo + Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center max-w-7xl mx-auto">
            
            {/* Left: iMessage Demo */}
            <div className="order-2 md:order-1">
              <IMessageDemo />
            </div>

            {/* Right: Welcome Content */}
            <div className="order-1 md:order-2 space-y-6 md:space-y-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light leading-[1.1] tracking-tight">
                Welcome,
                <br />
                <span className="text-muted-foreground">to the <i>lazy</i> club.</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                Transform your communication with AI-powered text transformations
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8" asChild>
                  <Link href="/transform">
                    Way To Smartwork
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Gmail Integration Showcase */}
          <div className="pt-24 relative">
            <div className="relative mx-auto max-w-3xl">
              {/* Main Feature Card */}
              <div className="relative bg-linear-to-br from-purple-500/10 via-background to-blue-500/10 border border-purple-500/20 rounded-2xl p-8 backdrop-blur-sm shadow-2xl shadow-purple-500/30" style={{boxShadow: '0 8px 32px 0 rgba(124,58,237,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.08)'}}>
                <div className="flex items-center justify-center gap-3 mb-4">
                  <img src="/gmail-icon.png" alt="Gmail" className="w-9 h-9 object-contain" />
                  <h3 className="text-2xl font-semibold">Direct Gmail Integration</h3>
                </div>
                <p className="text-muted-foreground text-center max-w-md mx-auto">
                  Recast your text, draft it directly to your Gmail with one click.
                </p>
                <p className="text-muted-foreground text-center max-w-md mx-auto">
                  No copy-paste needed.
                </p>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 animate-float-slow">
                <div className="p-4 bg-linear-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl backdrop-blur-sm shadow-lg">
                  <Sparkles className="w-6 h-6 text-green-500" />
                </div>
              </div>

              <div className="absolute -top-4 -right-4 animate-float-medium">
                <div className="p-4 bg-linear-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-xl backdrop-blur-sm shadow-lg">
                  <Zap className="w-6 h-6 text-blue-500" />
                </div>
              </div>

              <div className="absolute -bottom-4 left-1/4 animate-float-fast">
                <div className="p-3 bg-linear-to-br from-yellow-400/20 to-green-400/20 border border-yellow-400/30 rounded-lg backdrop-blur-sm shadow-lg">
                  <Coffee className="w-5 h-5 text-yellow-500" />
                </div>
              </div>

              <div className="absolute -bottom-6 right-1/4 animate-float-slow">
                <div className="px-4 py-2 bg-linear-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full backdrop-blur-sm shadow-lg">
                  <span className="text-sm font-medium text-purple-400">One Click</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />
      </section>
      <Footer />
    </div>
  )
}
