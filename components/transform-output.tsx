"use client"

import { useState } from "react"
import { Copy, Check, Mail } from "lucide-react"
import { Button } from "./ui/button"

interface TransformOutputProps {
  value: string
}

function extractEmailComponents(text: string) {
  const lines = text.split('\n').filter(line => line.trim())
  
  // Try to extract subject (look for "Subject:" or first line)
  let subject = ''
  let bodyStartIndex = 0
  
  const subjectMatch = text.match(/Subject:\s*(.+)/i)
  if (subjectMatch) {
    subject = subjectMatch[1].trim()
    bodyStartIndex = lines.findIndex(line => line.toLowerCase().includes('subject:')) + 1
  } else {
    // Use first line as subject if it's short enough
    if (lines[0] && lines[0].length < 100) {
      subject = lines[0].trim()
      bodyStartIndex = 1
    }
  }
  
  // Extract salutation and body
  let salutation = ''
  let body = ''
  
  const remainingLines = lines.slice(bodyStartIndex)
  
  // Check if first line is a greeting
  const greetingPatterns = /^(Hi|Hello|Dear|Hey|Greetings)/i
  if (remainingLines[0] && greetingPatterns.test(remainingLines[0])) {
    salutation = remainingLines[0]
    body = remainingLines.slice(1).join('\n')
  } else {
    body = remainingLines.join('\n')
  }
  
  return { subject, salutation, body }
}

export function TransformOutput({ value }: TransformOutputProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const handleGmailCompose = () => {
    const { subject, salutation, body } = extractEmailComponents(value)
    
    // Combine salutation and body
    const fullBody = salutation ? `${salutation}\n\n${body}` : body
    
    // Create Gmail compose URL
    const gmailUrl = new URL('https://mail.google.com/mail/')
    gmailUrl.searchParams.set('view', 'cm')
    gmailUrl.searchParams.set('fs', '1')
    if (subject) gmailUrl.searchParams.set('su', subject)
    gmailUrl.searchParams.set('body', fullBody)
    
    // Open in new tab
    window.open(gmailUrl.toString(), '_blank')
  }

  return (
    <div className="relative border border-border/50 bg-background overflow-hidden h-full min-h-[250px] sm:min-h-[300px] md:min-h-[400px]">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <span className="text-sm text-muted-foreground">👔 Transformed Output</span>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <p className="text-foreground text-base leading-relaxed whitespace-pre-wrap">{value}</p>
      </div>
      
      {/* Action Buttons */}
      <div className="absolute bottom-4 right-4 flex gap-2">
        <Button onClick={handleGmailCompose} size="sm" variant="outline" className="gap-2 bg-background hover:bg-muted/50">
          <Mail className="w-4 h-4 text-red-500" />
          Gmail
        </Button>
        <Button onClick={handleCopy} size="sm" variant="outline" className="gap-2 bg-background hover:bg-muted/50">
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
