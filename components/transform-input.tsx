"use client"

import { FileText } from "lucide-react"
import { Button } from "./ui/button"

interface TransformInputProps {
  value: string
  onChange: (value: string) => void
  onSampleText: () => void
}

export function TransformInput({ value, onChange, onSampleText }: TransformInputProps) {
  return (
    <div className="relative border border-border/50 bg-background overflow-hidden">
      {/* Header with Sample Text Button */}
      <div className="p-3 md:p-4 border-b border-border/50">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs sm:text-sm text-muted-foreground">Start typing or use</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSampleText}
            className="h-auto py-1 px-2 text-xs sm:text-sm hover:bg-muted/50"
          >
            <FileText className="w-3 h-3 mr-1" />
            Sample Text
          </Button>
        </div>
      </div>
      
      {/* Text Area */}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder=""
        className="w-full min-h-[250px] sm:min-h-[300px] md:min-h-[350px] p-3 md:p-4 bg-transparent text-foreground placeholder:text-muted-foreground/50 resize-none focus:outline-none text-sm md:text-base leading-relaxed"
      />
    </div>
  )
}
