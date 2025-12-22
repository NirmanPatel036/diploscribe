"use client"

import { useState, useEffect } from "react"
import { useRef } from "react"
import { Header } from "@/components/header"
import { createClient } from "@/lib/supabase/client"
import { Footer } from "@/components/footer"
import { TransformControls } from "@/components/transform-controls"
import { TransformInput } from "@/components/transform-input"
import { TransformOutput } from "@/components/transform-output"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Rotating texts for output placeholder - moved outside component to prevent re-creation
const ROTATING_TEXTS = [
  "Crafting your message...",
  "Polishing the tone...",
  "Adjusting the style...",
  "Refining the words...",
  "Almost there..."
]

export default function TransformPage() {
  const [tone, setTone] = useState<"professional" | "casual" | "technical">("professional")
  const [length, setLength] = useState<"under-50" | "100" | "200" | "500">("100")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayedOutput, setDisplayedOutput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [showExtensionMessage, setShowExtensionMessage] = useState(false)

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState("Uploading...")
  const [uploadFileName, setUploadFileName] = useState("")
  const [uploadResult, setUploadResult] = useState<"success" | "error" | null>(null)
  const uploadTexts = [
    "Reading file...",
    "Analyzing content...",
    "Transforming text...",
    "Almost done...",
    "Finalizing..."
  ]
  const uploadTextIndex = useRef(0)
  const uploadTextInterval = useRef<ReturnType<typeof setInterval> | null>(null)

  // Rotate texts when loading
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setCurrentTextIndex((prev) => (prev + 1) % ROTATING_TEXTS.length)
      }, 2500)
      return () => clearInterval(interval)
    }
  }, [isLoading])

  // Typewriter effect for output
  useEffect(() => {
    if (output && !isLoading) {
      setIsTyping(true)
      setDisplayedOutput("")
      let index = 0
      
      const typeInterval = setInterval(() => {
        if (index < output.length) {
          setDisplayedOutput(output.substring(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(typeInterval)
        }
      }, 20) // Adjust speed here (lower = faster)

      return () => clearInterval(typeInterval)
    }
  }, [output, isLoading])

  // Update word count as user types
  const handleInputChange = (value: string) => {
    setInput(value)
    const count = value
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length
    setWordCount(count)
  }

  const handleFileUpload = (text: string) => {
    // Simulate upload progress
    setShowUploadModal(true)
    setUploadProgress(0)
    setUploadStatus(uploadTexts[0])
    setUploadResult(null)
    setUploadFileName("UploadedFile.txt") // You can pass the real file name if available
    uploadTextIndex.current = 0

    // Animate status text
    if (uploadTextInterval.current) clearInterval(uploadTextInterval.current)
    uploadTextInterval.current = setInterval(() => {
      uploadTextIndex.current = (uploadTextIndex.current + 1) % uploadTexts.length
      setUploadStatus(uploadTexts[uploadTextIndex.current])
    }, 1200)

    // Simulate progress
    let progress = 0
    const progressInterval = setInterval(() => {
      progress += Math.random() * 18 + 7
      if (progress >= 100) {
        progress = 100
        clearInterval(progressInterval)
        if (uploadTextInterval.current) clearInterval(uploadTextInterval.current)
        setUploadStatus("Processing complete!")
        setTimeout(() => {
          setUploadResult("success")
          setUploadStatus("Upload successful!")
          setTimeout(() => {
            setShowUploadModal(false)
            setUploadResult(null)
          }, 1200)
        }, 800)
        handleInputChange(text)
      }
      setUploadProgress(Math.floor(progress))
    }, 350)
  }

  // Transform the message using AI
  const handleTransform = async () => {
    if (!input.trim()) return

    // Clear previous output and start loading
    setOutput("")
    setDisplayedOutput("")
    setIsLoading(true)
    try {
      const response = await fetch("/api/transform", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input, tone, length }),
      })

      const data = await response.json()
      
      // Handle rate limit error (429)
      if (response.status === 429) {
        setOutput("⚠️ Rate limit exceeded. Please wait about 1 minute and try again. The free tier has limited requests per minute.")
        return
      }
      
      // Handle other errors
      if (!response.ok) {
        setOutput(`Error: ${data.error || "Failed to transform text"}. Please try again.`)
        return
      }
      
      setOutput(data.transformed || "Error transforming text")

      // Save to Supabase for dashboard
      if (data.transformed) {
        try {
          const supabase = createClient()
          const { data: { user } } = await supabase.auth.getUser()
          
          if (user) {
            await supabase.from('transformation_history').insert({
              user_id: user.id,
              tone,
              length,
              input_length: input.length,
              output_length: data.transformed.length,
              preview: data.transformed.substring(0, 150) + (data.transformed.length > 150 ? "..." : ""),
            })
          }
        } catch (error) {
          console.error("Error saving transform history:", error)
        }
      }
    } catch (error) {
      console.error("Error:", error)
      setOutput("Failed to transform text. Please check your connection and try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSampleText = () => {
    const sampleText = "Hey team, just wanted to give everyone a heads up about the new project deadline. It's been moved up to next Friday instead of the end of the month. I know this is short notice but we really need to get this done ASAP. Let me know if you have any issues or concerns. Thanks!"
    handleInputChange(sampleText)
  }

  const handleChromeExtensionClick = () => {
    setShowExtensionMessage(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />

      {/* Chrome Extension Coming Soon Message */}
      {showExtensionMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card border border-border/40 rounded-lg shadow-2xl px-8 py-6 max-w-md mx-4 text-center animate-in fade-in zoom-in duration-200 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowExtensionMessage(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted/50 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <svg className="w-5 h-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                {/* Chrome Extension Icon */}
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Chrome Extension Coming Soon! 🚀</h3>
            <p className="text-muted-foreground text-sm">
              We're working hard to bring you the Chrome extension. Stay tuned for an even more seamless experience!
            </p>
          </div>
        </div>
      )}

      {/* Upload Progress Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="bg-card rounded-2xl shadow-2xl px-8 py-10 flex flex-col items-center w-full max-w-md border border-border/40">
            <h3 className="text-lg font-semibold mb-6">Uploading File</h3>
            <div className="w-full mb-6">
              <div className="relative h-6 bg-gray-300 overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full bg-gray-500 transition-all"
                  style={{ width: `${uploadProgress}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium text-black">
                  {uploadProgress}%
                </div>
              </div>
            </div>
            <div className="mb-4 h-6 flex items-center justify-center">
              <span className="text-sm animate-pulse">{uploadStatus}</span>
            </div>
            {uploadResult === "success" && uploadStatus !== "Upload successful!" && (
              <div className="text-green-600 font-medium mt-2">Upload successful!</div>
            )}
            {uploadResult === "error" && (
              <div className="text-red-600 font-medium mt-2">Upload failed. Please try again.</div>
            )}
          </div>
        </div>
      )}

      <main className="flex-1 flex items-center justify-center py-8 md:py-16 px-4">
        <div className="w-full max-w-7xl my-6 md:my-12 mb-16 md:mb-32">
          {/* Back to Home Button */}
          <div className="mb-6 md:mb-8">
            <Link href="/home">
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Input Area */}
            <div className="space-y-4">
              <TransformInput 
                value={input} 
                onChange={handleInputChange} 
                onSampleText={handleSampleText}
              />
              {/* Control Bar */}
              <TransformControls
                tone={tone}
                setTone={setTone}
                length={length}
                setLength={setLength}
                onFileUpload={handleFileUpload}
                onTransform={handleTransform}
                isLoading={isLoading}
                disabled={!input.trim()}
                onChromeExtensionClick={handleChromeExtensionClick}
              />
              {/* Supported file types */}
              <p className="text-xs text-muted-foreground text-center">
                Supported formats: .txt, .pdf, .doc, .docx
              </p>
            </div>

            {/* Output Area */}
            <div>
              {output ? (
                <TransformOutput value={displayedOutput} />
              ) : isLoading ? (
                <div className="h-full min-h-75 md:min-h-100 flex items-center justify-center border border-border/50 bg-card/30 relative overflow-hidden">
                  <div className="relative h-20 w-full max-w-md">
                    {ROTATING_TEXTS.map((text, index) => {
                      const isActive = index === currentTextIndex
                      const isPrevious = index === (currentTextIndex - 1 + ROTATING_TEXTS.length) % ROTATING_TEXTS.length
                      const randomRotateIn = Math.random() * 20 - 10 // Random between -10 and 10
                      const randomRotateOut = Math.random() * 30 + 10 // Random between 10 and 40
                      const randomScale = 0.7 + Math.random() * 0.2 // Random between 0.7 and 0.9
                      
                      return (
                        <div
                          key={index}
                          className="absolute w-full text-center transition-all duration-700 ease-in-out"
                          style={{
                            opacity: isActive ? 1 : 0,
                            transform: isActive
                              ? 'translateY(0) scale(1) rotate(0deg)'
                              : isPrevious
                              ? `translateY(100%) scale(${randomScale}) rotate(${randomRotateOut}deg)`
                              : `translateY(-100%) scale(${randomScale}) rotate(-${randomRotateOut}deg)`,
                            top: '50%',
                            left: 0,
                            right: 0,
                            marginTop: '-1rem'
                          }}
                        >
                          <p className="text-muted-foreground text-sm font-medium">{text}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="h-full min-h-75 md:min-h-100 flex items-center justify-center border border-border/50 bg-card/30">
                  <p className="text-muted-foreground text-xs sm:text-sm px-4 text-center">Your transformed text will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
