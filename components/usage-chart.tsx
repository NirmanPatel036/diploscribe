"use client"

interface UsageChartProps {
  data: { date: string; count: number }[]
}

export function UsageChart({ data }: UsageChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1)

  return (
    <div className="border border-border/40 bg-card p-6">
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-light mb-1">Activity Timeline</h2>
        <p className="text-sm text-muted-foreground">Your transformation usage over the last 7 days</p>
      </div>

      {data.length > 0 ? (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-24 text-sm text-muted-foreground">{item.date}</div>
              <div className="flex-1 flex items-center gap-2">
                <div className="flex-1 h-8 bg-border/20 relative overflow-hidden group">
                  <div
                    className="h-full bg-primary/60 group-hover:bg-primary/80 transition-all duration-300"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
                <div className="w-12 text-right text-sm font-mono">{item.count}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">No usage data yet. Start transforming text to see your activity.</p>
        </div>
      )}
    </div>
  )
}