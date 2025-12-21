"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Calendar, TrendingUp, ExternalLink } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface SubscriptionCardProps {
  planName: string;
  status: string;
  usageCount: number;
  usageLimit: number;
  currentPeriodEnd: string | null;
  trialEnd: string | null;
}

export function SubscriptionCard({
  planName,
  status,
  usageCount,
  usageLimit,
  currentPeriodEnd,
  trialEnd,
}: SubscriptionCardProps) {
  const isUnlimited = usageLimit === -1;
  const usagePercentage = isUnlimited ? 0 : Math.round((usageCount / usageLimit) * 100);
  const isTrialing = status === "trialing";

  const statusColors = {
    active: "bg-green-500/10 text-green-600 dark:text-green-400",
    trialing: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    past_due: "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400",
    canceled: "bg-red-500/10 text-red-600 dark:text-red-400",
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="border-2 border-border/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Crown className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{planName} Plan</CardTitle>
              <CardDescription>Active subscription</CardDescription>
            </div>
          </div>
          <Badge className={statusColors[status as keyof typeof statusColors] || statusColors.active}>
            {isTrialing ? "Free Trial" : status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Usage Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Monthly Usage</span>
            <span className="text-sm text-muted-foreground">
              {isUnlimited ? (
                <span className="text-primary font-semibold">Unlimited ∞</span>
              ) : (
                <>
                  {usageCount.toLocaleString()} / {usageLimit.toLocaleString()}
                </>
              )}
            </span>
          </div>
          {!isUnlimited && (
            <>
              <Progress value={usagePercentage} className="h-2" />
              <p className="text-xs text-muted-foreground mt-1">
                {usageLimit - usageCount} transformations remaining
              </p>
            </>
          )}
        </div>

        {/* Period Info */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/40">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">
                {isTrialing ? "Trial Ends" : "Renews On"}
              </p>
              <p className="text-sm font-medium">
                {formatDate(isTrialing ? trialEnd : currentPeriodEnd)}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <TrendingUp className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="text-sm font-medium">
                {isTrialing ? "Trial Active" : "Paid"}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" asChild>
            <a href="https://sandbox.polar.sh" target="_blank" rel="noopener noreferrer">
              Manage Subscription
              <ExternalLink className="w-3 h-3 ml-2" />
            </a>
          </Button>
          {planName !== "Lifetime" && (
            <Button variant="default" size="sm" className="flex-1" asChild>
              <a href="/#pricing">
                Upgrade Plan
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
