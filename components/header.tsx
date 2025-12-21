"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Menu, LogOut, User, ChevronDown, LaptopMinimal } from "lucide-react"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function Header() {

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const { resolvedTheme } = useTheme()
  const router = useRouter()
  const supabase = createClient()
  const [mounted, setMounted] = useState(false)

  const rotatingTexts = [
    "convey in custom tone",
    "professional & polished",
    "save time, write better",
    "remember, it's smartwork"
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (user) {
      const interval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length)
      }, 3000) // Change text every 3 seconds

      return () => clearInterval(interval)
    }
  }, [user, rotatingTexts.length])

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const getDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
    }
    return user?.email?.split('@')[0] || 'User'
  }

  const getInitials = () => {
    const name = getDisplayName()
    return name
      .split(' ')
      .map((n: string) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-0 shrink-0">
            <Image
              src={mounted ? (resolvedTheme === "dark" ? "/icon-light.png" : "/icon-dark.png") : "/icon-dark.png"}
              alt="Diploscribe"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <span className="text-xl font-serif font-light tracking-tight text-foreground">Diploscribe</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {user ? (
              <div className="relative h-6 w-64 overflow-hidden">
                {rotatingTexts.map((text, index) => (
                  <div
                    key={index}
                    className="absolute w-full text-center text-sm text-muted-foreground transition-all duration-700 ease-in-out"
                    style={{
                      transform: index === currentTextIndex
                        ? 'translateY(0)'
                        : index === (currentTextIndex - 1 + rotatingTexts.length) % rotatingTexts.length
                        ? 'translateY(100%)'
                        : 'translateY(-100%)',
                      opacity: index === currentTextIndex ? 1 : 0,
                      top: 0,
                      left: 0,
                      right: 0
                    }}
                  >
                    {text}
                  </div>
                ))}
              </div>
            ) : (
              <>
                <button
                  onClick={() => {
                    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Features
                </button>
                <button
                  onClick={() => {
                    document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Customers
                </button>
                <button
                  onClick={() => {
                    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Pricing
                </button>
                <Link href="https://github.com/NirmanPatel036" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Docs
                </Link>
              </>
            )}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center gap-2">
                      <Avatar className="h-7 w-7">
                        <AvatarFallback className="bg-purple-600 text-white text-xs">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{getDisplayName()}</span>
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{getDisplayName()}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/pricing" className="cursor-pointer">
                        <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Pricing</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <a href="https://nirmanhere.vercel.app" target="_blank" rel="noopener noreferrer" className="cursor-pointer">
                        <LaptopMinimal className="mr-2 h-4 w-4" />
                        <span>About The Developer</span>
                      </a>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <ThemeToggle />
              </>
            ) : (
              <>
                <Link href="/auth/signin">
                  <Button variant="ghost" size="sm" className="text-sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="text-sm bg-primary text-primary-foreground hover:bg-primary/90">
                    Get Started
                  </Button>
                </Link>
                <ThemeToggle />
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <nav className="flex flex-col gap-4">
              <Link href="/#features" className="text-sm text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/#testimonials" className="text-sm text-muted-foreground hover:text-foreground">
                Customers
              </Link>
              <Link href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
              <Link href="/#docs" className="text-sm text-muted-foreground hover:text-foreground">
                Docs
              </Link>
              <div className="flex flex-col gap-2 pt-2">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-purple-600 text-white text-xs">
                          {getInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{getDisplayName()}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                      </div>
                    </div>
                    <a href="https://nirmanhere.vercel.app" target="_blank" rel="noopener noreferrer" className="w-full">
                      <Button variant="ghost" size="sm" className="w-full text-sm justify-start">
                        <User className="mr-2 h-4 w-4" />
                        About Developer
                      </Button>
                    </a>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-sm justify-start text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
                      onClick={handleSignOut}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                    <ThemeToggle />
                  </>
                ) : (
                  <>
                    <Link href="/auth/signin" className="w-full">
                      <Button variant="ghost" size="sm" className="w-full text-sm">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup" className="w-full">
                      <Button size="sm" className="w-full text-sm">
                        Get Started
                      </Button>
                    </Link>
                    <ThemeToggle />
                  </>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
