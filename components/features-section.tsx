'use client'

const coreFeatures = [
  {
    title: "AI-Powered Transformation",
    description:
      "Advanced language models analyze context and tone to transform your rough drafts into polished, professional communication.",
  },
  {
    title: "Lightning Fast Processing",
    description:
      "Get instant results with our optimized infrastructure. Transform emails, documents, and messages in milliseconds.",
  },
  {
    title: "Enterprise Security",
    description:
      "Your data never leaves our encrypted servers. SOC 2 compliant with end-to-end encryption for all communications.",
  },
];

import CardSwap, { Card as AnimatedCard } from './CardSwap'
import { Settings, Code, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

function WordLimitCounter() {
  const [count, setCount] = useState(0);
  const [showText, setShowText] = useState(false);
  const targetNumber = 999;

  useEffect(() => {
    const runAnimation = () => {
      setCount(0);
      setShowText(false);

      const duration = 2000; // 2 seconds
      const steps = 60;
      const increment = targetNumber / steps;
      const stepDuration = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep <= steps) {
          setCount(Math.floor(increment * currentStep));
        } else {
          setCount(targetNumber);
          setShowText(true);
          clearInterval(timer);
        }
      }, stepDuration);

      return timer;
    };

    // Run initial animation
    const initialTimer = runAnimation();

    // Set up loop with 2 second pause after animation completes
    const loopInterval = setInterval(() => {
      runAnimation();
    }, 4000); // 2s animation + 2s pause

    return () => {
      clearInterval(initialTimer);
      clearInterval(loopInterval);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-6">
      {/* Top text */}
      <div className="text-center h-16">
        <h3 className="text-xl font-serif font-light tracking-tight mb-2">
          Transform Without Limits
        </h3>
        <p className="text-sm text-muted-foreground">
          Process any length of text
        </p>
      </div>

      {/* Counter with casino-style lines */}
      <div className="relative flex items-center justify-center h-24">
        {/* Counter display with lines between digits */}
        <div className={`text-7xl font-bold text-foreground tracking-wider flex items-center transition-opacity duration-500 ${showText ? 'opacity-0' : 'opacity-100'}`}>
          <span>{count.toString().padStart(3, '0')[0]}</span>
          <div className="w-px h-20 bg-border/40 mx-3" />
          <span>{count.toString().padStart(3, '0')[1]}</span>
          <div className="w-px h-20 bg-border/40 mx-3" />
          <span>{count.toString().padStart(3, '0')[2]}</span>
        </div>
        
        {/* No Word Limit text - absolutely positioned to overlay */}
        <div className={`absolute text-2xl font-bold text-foreground whitespace-nowrap transition-opacity duration-500 ${showText ? 'opacity-100' : 'opacity-0'}`}>
          No Word Limit+
        </div>
      </div>

      {/* Bottom text */}
      <div className="text-center h-12">
        <p className="text-sm text-muted-foreground">
          Unlimited capacity for all your documents
        </p>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-16 sm:py-20 border-t border-border/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 border border-border/50 rounded-full text-xs text-muted-foreground uppercase tracking-wider mb-4">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-light mb-4 tracking-tight">
            Transform Your Communication
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed">
            Experience the power of AI-driven text transformation with our wide suite of features
          </p>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6 leading-relaxed">
            Hover to explore the options
          </p>
        </div>

        {/* Bento Grid */}
        <div className="max-w-6xl mx-auto space-y-6">
          {/* First Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Instant Text Transformation - 1 column */}
            <div className="col-span-1 border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-border/80 transition-all duration-300">
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif font-light mb-2 tracking-tight">
                  Instant Text Transformation
                </h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-6 leading-relaxed">
                  Transform your text in real-time with multiple style options under seconds
                </p>
                <div className="w-full h-[180px] flex items-center justify-center">
                  <div className="flex gap-3">
                    {/* Left side - Style options */}
                    <div className="flex flex-col gap-1 text-[10px] text-muted-foreground">
                      <div className="px-2 py-1.5 rounded flex items-center gap-1.5 hover:bg-muted/20 transition-colors cursor-pointer">
                        <div className="w-3 h-3 rounded-full border border-border/60" />
                        <span>Standard</span>
                      </div>
                      <div className="px-2 py-1.5 rounded flex items-center gap-1.5 hover:bg-muted/20 transition-colors cursor-pointer">
                        <span>⚡</span>
                        <span>Fluency</span>
                      </div>
                      <div className="px-2 py-1.5 rounded flex items-center gap-1.5 hover:bg-muted/20 transition-colors cursor-pointer">
                        <span>📄</span>
                        <span>Formal</span>
                      </div>
                      <div className="px-2 py-1.5 rounded flex items-center gap-1.5 hover:bg-muted/20 transition-colors cursor-pointer">
                        <span>💬</span>
                        <span>Informal</span>
                      </div>
                      <div className="px-2 py-1.5 rounded flex items-center gap-1.5 hover:bg-muted/20 transition-colors cursor-pointer">
                        <span>👁️</span>
                        <span>Sensory</span>
                      </div>
                      <div className="px-2 py-1.5 rounded flex items-center gap-1.5 hover:bg-muted/20 transition-colors cursor-pointer">
                        <span>✂️</span>
                        <span>Shorten</span>
                      </div>
                      <div className="px-2 py-1.5 rounded bg-muted/30 flex items-center gap-1.5 font-medium text-foreground hover:bg-muted/40 transition-colors cursor-pointer">
                        <span>✨</span>
                        <span>Expand</span>
                      </div>
                    </div>

                    {/* Right side - Content preview */}
                    <div className="w-48 space-y-2">
                      {/* Input text */}
                      <div className="bg-background border border-border/40 rounded p-2 text-[9px] leading-relaxed hover:border-border/60 transition-colors">
                        <span className="underline decoration-primary/60">Quick replies</span> need polish.
                      </div>
                      
                      {/* Output previews */}
                      <div className="bg-red-50 dark:bg-red-950/30 border-l-2 border-red-400 dark:border-red-500 rounded p-2 text-[8px] leading-relaxed hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors cursor-pointer">
                        Emails <span className="font-semibold">require refinement</span> for client <span className="font-semibold">presentation.</span>
                      </div>
                      
                      <div className="bg-background/60 border border-border/40 rounded p-2 text-[8px] leading-relaxed text-muted-foreground hover:bg-background/80 hover:border-border/60 transition-colors cursor-pointer">
                        <span className="font-semibold text-foreground">Initial discussion</span> points need <span className="font-semibold text-foreground">documentation.</span>
                      </div>
                      
                      <div className="bg-background/60 border border-border/40 rounded p-2 text-[8px] leading-relaxed text-muted-foreground hover:bg-background/80 hover:border-border/60 transition-colors cursor-pointer">
                        With <span className="font-semibold text-foreground">preparation</span>, materials <span className="font-semibold text-foreground">establish credibility.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Multiple Style Presets - 2 columns */}
            <div className="col-span-1 lg:col-span-2 border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-border/80 transition-all duration-300">
              <div className="p-6 text-center">
                <h3 className="text-xl font-serif font-light mb-2 tracking-tight dark:text-white">
                  Multiple Style Presets
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6 leading-relaxed">
                  Choose from Professional, Casual, Technical, Precise, and more communication styles
                </p>
                <div className="w-full h-[180px] flex items-center justify-center gap-3">
                  <div className="flex gap-2">
                    {/* Pro */}
                    <div className="w-20 h-28 bg-linear-to-b from-blue-500/20 to-blue-600/40 rounded-lg border border-border/40 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:w-32">
                      <div className="absolute inset-0 flex items-center justify-center text-xs transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
                        Pro
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center p-2 text-[9px] text-black dark:text-white leading-tight opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Formal business communication
                      </div>
                    </div>
                    
                    {/* Casual */}
                    <div className="w-20 h-28 bg-linear-to-b from-purple-500/20 to-purple-600/40 rounded-lg border border-border/40 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:w-32">
                      <div className="absolute inset-0 flex items-center justify-center text-xs transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
                        Casual
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center p-2 text-[9px] text-black dark:text-white leading-tight opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Friendly and relaxed tone
                      </div>
                    </div>
                    
                    {/* Tech */}
                    <div className="w-20 h-28 bg-linear-to-b from-green-500/20 to-green-600/40 rounded-lg border border-border/40 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:w-32">
                      <div className="absolute inset-0 flex items-center justify-center text-xs transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
                        Tech
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center p-2 text-[9px] text-black dark:text-white leading-tight opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Technical documentation style
                      </div>
                    </div>
                    
                    {/* Precise */}
                    <div className="w-20 h-28 bg-linear-to-b from-orange-500/20 to-orange-600/40 rounded-lg border border-border/40 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:w-32">
                      <div className="absolute inset-0 flex items-center justify-center text-xs transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
                        Precise
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center p-2 text-[9px] text-black dark:text-white leading-tight opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Clear and concise messaging
                      </div>
                    </div>
                    
                    {/* Handy */}
                    <div className="w-20 h-28 bg-linear-to-b from-pink-500/20 to-pink-600/40 rounded-lg border border-border/40 relative overflow-hidden group cursor-pointer transition-all duration-300 hover:w-32">
                      <div className="absolute inset-0 flex items-center justify-center text-xs transition-all duration-300 group-hover:-translate-y-8 group-hover:opacity-0">
                        Handy
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center p-2 text-[9px] text-black dark:text-white leading-tight opacity-0 transition-all duration-300 group-hover:opacity-100">
                        Quick and practical format
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* AI-Powered Analysis - 2 columns */}
            <div className="col-span-1 lg:col-span-2 border border-border/40 bg-card/50 backdrop-blur-sm overflow-hidden hover:border-border/80 transition-all duration-300">
              <div className="p-6 flex items-center gap-8 h-full">
                {/* Left side - Title and description */}
                <div className="flex-1 space-y-3">
                  <h3 className="text-xl font-serif font-light tracking-tight">
                    AI-Powered Analysis
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Advanced language models analyze context, tone, and sentiment to deliver perfect transformations
                  </p>
                </div>

                {/* Right side - Card stack */}
                <div className="relative" style={{ width: '300px', height: '300px' }}>
                  <CardSwap
                    width={350}
                    height={320}
                    cardDistance={25}
                    verticalDistance={30}
                    delay={3000}
                    pauseOnHover={true}
                    easing="linear"
                  >
                    <AnimatedCard>
                      <div className="bg-black border/40 border-white rounded-xl overflow-hidden h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-center gap-1 p-4 border-b border-white/20">
                          <Settings className="w-3 h-3 text-white" />
                          <span className="text-white text-sm font-thin">Customizable</span>
                        </div>
                        {/* Card content area with image */}
                        <div className="flex-1 relative">
                          <Image
                            src="/card-image-1.jpg"
                            alt="Customizable features"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </AnimatedCard>
                    <AnimatedCard>
                      <div className="bg-black border/40 border-white rounded-xl overflow-hidden h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-center gap-1 p-4 border-b border-white/20">
                          <Code className="w-3 h-3 text-white" />
                          <span className="text-white text-sm font-thin">Reliable</span>
                        </div>
                        {/* Card content area with image */}
                        <div className="flex-1 relative">
                          <Image
                            src="/card-image-2.jpg"
                            alt="Reliable performance"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </AnimatedCard>
                    <AnimatedCard>
                      <div className="bg-black border/40 border-white rounded-xl overflow-hidden h-full flex flex-col">
                        {/* Header */}
                        <div className="flex items-center gap-1 p-4 border-b border-white/20">
                          <CheckCircle className="w-3 h-3 text-white" />
                          <span className="text-white text-sm font-thin">Smooth</span>
                        </div>
                        {/* Card content area with image */}
                        <div className="flex-1 relative">
                          <Image
                            src="/card-image-3.jpg"
                            alt="Smooth experience"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </AnimatedCard>
                  </CardSwap>
                </div>
              </div>
            </div>

            {/* Join Our Community - 1 column */}
            <div className="col-span-1 border border-border/40 bg-card/50 backdrop-blur-sm hover:border-border/80 transition-all duration-300">
              <div className="p-6 h-full flex flex-col">
                <WordLimitCounter />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
