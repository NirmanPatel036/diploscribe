"use client"

import { Trash2, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

interface TransformRecord {
  id: string
  created_at: string
  tone: string
  length: string
  input_length: number
  output_length: number
  preview: string
}

interface TransformHistoryProps {
  history: TransformRecord[]
  onRefresh: () => void
}

export function TransformHistory({ history, onRefresh }: TransformHistoryProps) {
  const clearHistory = async () => {
    if (confirm("Are you sure you want to clear all history? This cannot be undone.")) {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          await supabase
            .from('transformation_history')
            .delete()
            .eq('user_id', user.id)
          
          onRefresh()
        }
      } catch (error) {
        console.error("Error clearing history:", error)
      }
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="border border-border/40 bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-serif text-2xl font-light mb-1">Transform History</h2>
          <p className="text-sm text-muted-foreground">Your recent text transformations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onRefresh} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
          {history.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearHistory} className="gap-2 text-destructive">
              <Trash2 className="w-4 h-4" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {history.length > 0 ? (
        <div className="space-y-3">
          {history.slice(0, 10).map((record) => (
            <div key={record.id} className="border border-border/40 p-4 hover:border-border transition-colors group">
              <div className="flex items-start justify-between mb-2">
                <div className="flex gap-3">
                  <span className="text-xs px-2 py-1 border border-border/40 text-muted-foreground uppercase tracking-wide">
                    {record.tone}
                  </span>
                  <span className="text-xs px-2 py-1 border border-border/40 text-muted-foreground uppercase tracking-wide">
                    {record.length === "under-50" ? "<50 words" : `${record.length} words`}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{formatTime(record.created_at)}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{record.preview}</p>
              <div className="flex gap-4 text-xs text-muted-foreground">
                <span>Input: {record.input_length} chars</span>
                <span>Output: {record.output_length} chars</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground mb-4">No transformation history yet</p>
          <Link href="/transform">
            <Button variant="outline">Start Transforming</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
