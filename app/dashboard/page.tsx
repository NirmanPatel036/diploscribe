"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { createClient } from "@/lib/supabase/client"
import { StatsCards } from "@/components/stats-cards"
import { UsageChart } from "@/components/usage-chart"
import { TransformHistory } from "@/components/transform-history"
import { SubscriptionCard } from "@/components/subscription-card"
import { Activity, TrendingUp, FileText, Clock, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface UsageStats {
  totalTransformations: number
  totalCharacters: number
  averageLength: number
  lastUsed: string | null
  weekOverWeekChange: number
}

interface TransformRecord {
  id: string
  created_at: string
  tone: string
  length: string
  input_length: number
  output_length: number
  preview: string
}

interface Subscription {
  plan_name: string
  status: string
  usage_count: number
  usage_limit: number
  current_period_end: string | null
  trial_end: string | null
}

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [stats, setStats] = useState<UsageStats>({
    totalTransformations: 0,
    totalCharacters: 0,
    averageLength: 0,
    lastUsed: null,
    weekOverWeekChange: 0,
  })
  const [history, setHistory] = useState<TransformRecord[]>([])
  const [dailyUsage, setDailyUsage] = useState<{ date: string; count: number }[]>([])

  useEffect(() => {
    setMounted(true)
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        setLoading(false)
        return
      }

      // Fetch subscription data
      const { data: subData } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .in('status', ['active', 'trialing'])
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

      if (subData) {
        setSubscription(subData)
      }

      // Fetch all transformation history
      const { data: historyData, error } = await supabase
        .from('transformation_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) {
        console.error("Error loading dashboard data:", error)
        setLoading(false)
        return
      }

      const transformations = historyData || []
      setHistory(transformations)

      // Calculate date ranges
      const now = new Date()
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000)

      // Filter data by time period
      const thisWeekData = transformations.filter(
        (r) => new Date(r.created_at) >= oneWeekAgo
      )
      const lastWeekData = transformations.filter(
        (r) => new Date(r.created_at) >= twoWeeksAgo && new Date(r.created_at) < oneWeekAgo
      )

      // Calculate week-over-week change
      const thisWeekCount = thisWeekData.length
      const lastWeekCount = lastWeekData.length
      const weekOverWeekChange = lastWeekCount > 0 
        ? Math.round(((thisWeekCount - lastWeekCount) / lastWeekCount) * 100)
        : thisWeekCount > 0 ? 100 : 0

      // Calculate stats
      const totalTransformations = transformations.length
      const totalCharacters = transformations.reduce((sum, record) => sum + record.output_length, 0)
      const averageLength = totalTransformations > 0 ? Math.round(totalCharacters / totalTransformations) : 0
      const lastUsed = totalTransformations > 0 ? new Date(transformations[0].created_at).toLocaleDateString() : null

      setStats({
        totalTransformations,
        totalCharacters,
        averageLength,
        lastUsed,
        weekOverWeekChange,
      })

      // Group by day for chart (last 7 days)
      const dailyMap: Record<string, number> = {}
      thisWeekData.forEach((record) => {
        const date = new Date(record.created_at).toLocaleDateString()
        dailyMap[date] = (dailyMap[date] || 0) + 1
      })

      const dailyData = Object.entries(dailyMap)
        .map(([date, count]) => ({ date, count }))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

      setDailyUsage(dailyData)
    } catch (error) {
      console.error("Error loading dashboard data:", error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  if (!mounted || loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
              </div>
              <div className="space-y-2">
                <p className="text-xl font-medium text-foreground">Putting it all together...</p>
                <p className="text-muted-foreground">Gathering your usage stats and plan details</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-12 md:pb-16">
        {/* Page Header */}
        <div className="mb-8 md:mb-12 flex flex-col sm:flex-row items-start justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-light mb-2 md:mb-3 text-balance">Usage Dashboard</h1>
            <p className="text-muted-foreground text-base md:text-lg">Track your text transformation activity and insights</p>
          </div>
          <Link href="/home">
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Subscription Card */}
        {subscription && (
          <div className="mb-6 md:mb-8">
            <SubscriptionCard
              planName={subscription.plan_name}
              status={subscription.status}
              usageCount={subscription.usage_count}
              usageLimit={subscription.usage_limit}
              currentPeriodEnd={subscription.current_period_end}
              trialEnd={subscription.trial_end}
            />
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          <StatsCards
            icon={Activity}
            label="Total Transformations"
            value={stats.totalTransformations.toLocaleString()}
            trend={`${stats.weekOverWeekChange >= 0 ? '+' : ''}${stats.weekOverWeekChange}% from last week`}
          />
          <StatsCards
            icon={FileText}
            label="Characters Processed"
            value={stats.totalCharacters.toLocaleString()}
            trend={`${stats.averageLength} avg per transform`}
          />
          <StatsCards
            icon={TrendingUp}
            label="Average Length"
            value={`${stats.averageLength} chars`}
            trend="Optimal for engagement"
          />
          <StatsCards
            icon={Clock}
            label="Last Used"
            value={stats.lastUsed || "Never"}
            trend={stats.lastUsed ? "Recently active" : "Start transforming"}
          />
        </div>

        {/* Usage Chart */}
        <div className="mb-8">
          <UsageChart data={dailyUsage} />
        </div>

        {/* Transform History */}
        <TransformHistory history={history} onRefresh={loadDashboardData} />
      </main>
    </div>
  )
}
