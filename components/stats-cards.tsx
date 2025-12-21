import type { LucideIcon } from "lucide-react"

interface StatsCardsProps {
  icon: LucideIcon
  label: string
  value: string
  trend: string
}

export function StatsCards({ icon: Icon, label, value, trend }: StatsCardsProps) {
  return (
    <div className="border border-border/40 bg-card p-6 hover:border-border transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 border border-border/40 group-hover:border-border transition-colors">
          <Icon className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-serif font-light">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xs text-muted-foreground/70">{trend}</p>
      </div>
    </div>
  )
}
