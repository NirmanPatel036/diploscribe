"use client"

import { Wand2, Upload } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"

interface TransformControlsProps {
  tone: "professional" | "casual" | "technical"
  setTone: (tone: "professional" | "casual" | "technical") => void
  length: "under-50" | "100" | "200" | "500"
  setLength: (length: "under-50" | "100" | "200" | "500") => void
  onFileUpload?: (text: string) => void
  onTransform: () => void
  isLoading: boolean
  disabled: boolean
  onChromeExtensionClick?: () => void
}

export function TransformControls({ tone, setTone, length, setLength, onFileUpload, onTransform, isLoading, disabled, onChromeExtensionClick }: TransformControlsProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      if (data.extractedText && onFileUpload) {
        onFileUpload(data.extractedText)
      }
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
      e.target.value = ""
    }
  }

  return (
    <div className="space-y-3">
      {/* Settings Row */}
      <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
        {/* Tone Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-1 justify-between bg-transparent text-sm">
              <span className="capitalize">{tone}</span>
              <span className="text-muted-foreground text-xs">Tone</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setTone("professional")}>Professional</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTone("casual")}>Casual</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTone("technical")}>Technical</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Length Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex-1 justify-between bg-transparent">
              <span>{length === "under-50" ? "Under 50" : `~${length}`} words</span>
              <span className="text-muted-foreground text-xs">Length</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setLength("under-50")}>Under 50 words</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLength("100")}>100 words</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLength("200")}>200 words</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLength("500")}>500 words</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* File Upload */}
        <div className="flex-1">
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center w-full h-full px-4 py-2 border border-border/50 cursor-pointer hover:bg-muted/50 transition-colors disabled:opacity-50"
          >
            <Upload className="w-4 h-4 mr-2" />
            <span className="text-sm">{isUploading ? "Uploading..." : "Upload"}</span>
            <input
              id="file-upload"
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Action Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0 p-3 md:p-4 border border-border/50 bg-background">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 flex-1">
          <Button
            onClick={onTransform}
            disabled={disabled || isLoading}
            variant="outline"
            size="sm"
            className="bg-transparent hover:bg-muted/50 w-full sm:w-auto"
          >
            <Wand2 className="w-4 h-4 mr-2" />
            {isLoading ? "Rephrasing..." : "Rephrase"}
          </Button>
          <span className="text-xs text-muted-foreground text-center sm:text-left">or select the sample text to rephrase</span>
        </div>
        
        <Button
          size="sm"
          className="bg-foreground text-background hover:bg-foreground/90 cursor-pointer w-full sm:w-auto whitespace-nowrap"
          onClick={onChromeExtensionClick}
        >
         <span className="hidden sm:inline">Chrome Extension<span className="ml-1 text-muted-foreground">— on it's way</span></span>
         <span className="sm:hidden">Chrome Extension <span className="text-muted-foreground text-xs">— coming soon</span></span>
        </Button>
      </div>
    </div>
  )
}
