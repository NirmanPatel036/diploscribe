"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Zap, Sparkles, CheckCircle2 } from "lucide-react"

const testimonialCases = [
  {
    number: "01",
    icon: Zap,
    title: "INSTANT WORKFLOW INTEGRATION",
    tags: ["NO CONTEXT SWITCHING", "SEAMLESS"],
    description:
      "No need to open a new tab, copy-paste, or explain context. Diploscribe transforms your text exactly where you work—instantly.",
    image: "I",
    quote:
      "Diploscribe eliminates the friction of using ChatGPT. Instead of tab-switching and prompting, I just select my text and transform it. It's become invisible in the best way possible.",
    author: "JAGRAT SHARMA",
    role: "STUDENT @ SRM, AP",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "PURPOSE-BUILT TRANSFORMATIONS",
    tags: ["SPECIALIZED", "PRECISE"],
    description:
      "Pre-configured tone profiles designed specifically for professional communication—no prompt engineering required.",
    image: "P",
    quote:
      "ChatGPT makes me think about prompts. Diploscribe just knows what I need. The tone controls are exactly what I need for client emails, technical docs, and everything in between.",
    author: "SANYAMEE PATEL",
    role: "SOFTWARE ENGINEER @ ORACLE",
  },
  {
    number: "03",
    icon: CheckCircle2,
    title: "CONSISTENT QUALITY, ZERO EFFORT",
    tags: ["RELIABILITY", "EFFICIENCY"],
    description: "Every transformation is optimized for professional communication. No trial-and-error, no re-prompting, no surprises.",
    image: "C",
    quote:
      "With ChatGPT, I was never sure what I'd get. Diploscribe gives me perfect results every single time. It's the difference between a general tool and a specialized solution.",
    author: "MARTIN",
    role: "STUDENT @ MERCER UNIVERSITY, GEORGIA",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentTestimonial = testimonialCases[currentIndex]

  const next = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialCases.length)
      setIsTransitioning(false)
    }, 300)
  }

  const previous = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + testimonialCases.length) % testimonialCases.length)
      setIsTransitioning(false)
    }, 300)
  }

  // Auto-scroll functionality
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        next()
      }, 4000) // Change slide every 4 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPaused, currentIndex])

  const handleMouseEnter = () => {
    setIsPaused(true)
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
  }

  return (
    <section id="testimonials" className="relative py-12 sm:py-16 md:py-20 border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Left: Case Studies List */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-border/50 rounded-full text-xs text-muted-foreground uppercase tracking-wider mb-6 md:mb-8">
              Showcase
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light leading-tight mb-4 md:mb-6 tracking-tight">
              Why not just <em>ChatGPT?</em>
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed mb-12">
              Any other chatbot requires prompting, context switching, and manual copying. Diploscribe is a <span className="px-2 py-1 bg-muted border border-border/40 text-foreground"><em>purpose-built transformation tool</em></span> designed specifically for communication workflows—instant, integrated, and effortless.
            </p>

            {/* Case Studies */}
            <div className="space-y-6">
              {testimonialCases.map((item, idx) => {
                const Icon = item.icon
                return (
                  <div
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`cursor-pointer pb-6 border-b border-border/20 transition-all duration-300 group hover:border-border/60 ${
                      idx === currentIndex ? "opacity-100" : "opacity-60 hover:opacity-80"
                    }`}
                  >
                    <div className="flex items-start gap-4 mb-3">
                      <Icon className="w-6 h-6 text-muted-foreground/60 group-hover:text-muted-foreground transition-colors mt-1 shrink-0" />
                      <div className="flex-1">
                        <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider group-hover:text-foreground transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-10">
                      {item.tags.map((tag, tagIdx) => (
                        <span
                          key={tagIdx}
                          className="font-mono text-xs text-muted-foreground/60 group-hover:text-muted-foreground transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right: Large Testimonial Card */}
          <div 
            className="space-y-12"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              className={`relative transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 translate-x-8' : 'opacity-100 translate-x-0'
              }`}
            >
              {/* Decorative Quote Mark */}
              <div className="absolute -top-8 -left-8 text-9xl font-serif text-foreground/5 select-none">"</div>

              <blockquote className="relative z-10 space-y-8">
                <p className="text-2xl sm:text-3xl lg:text-4xl font-serif font-light leading-relaxed text-foreground">
                  {currentTestimonial.quote}
                </p>

                {/* Decorative closing quote */}
                <div className="absolute -bottom-16 -right-8 text-9xl font-serif text-foreground/5 select-none">"</div>
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4 mt-16 pt-8 border-t border-border/40">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-lg font-serif shrink-0">
                  {currentTestimonial.author[0]}
                </div>
                <div>
                  <div className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                    {currentTestimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground/60 font-mono">{currentTestimonial.role}</div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8 border-t border-border/40">
              <div className="flex gap-3">
                <button
                  onClick={previous}
                  className="w-10 h-10 flex items-center justify-center border border-border/40 bg-transparent hover:border-border transition-colors"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 flex items-center justify-center border border-border/40 bg-transparent hover:border-border transition-colors"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Indicators */}
              <div className="flex gap-3">
                {testimonialCases.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`transition-all ${
                      idx === currentIndex
                        ? "w-8 h-1 bg-foreground"
                        : "w-1 h-1 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                    }`}
                    aria-label={`Go to case study ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
