"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, AlertTriangle, Sparkles, Target, Bell } from "lucide-react"

interface CategoryForecast {
  id: string
  name: string
  emoji: string
  spentSoFar: number
  predictedTotal: number
  budget: number
  daysLeft: number
  trend: "increasing" | "stable" | "decreasing"
  color: string
}

const categories: CategoryForecast[] = [
  {
    id: "1",
    name: "Dining Out",
    emoji: "🍽️",
    spentSoFar: 165,
    predictedTotal: 280,
    budget: 200,
    daysLeft: 12,
    trend: "increasing",
    color: "bg-orange-500",
  },
  {
    id: "2",
    name: "Groceries",
    emoji: "🛒",
    spentSoFar: 220,
    predictedTotal: 320,
    budget: 350,
    daysLeft: 12,
    trend: "stable",
    color: "bg-emerald-500",
  },
  {
    id: "3",
    name: "Transport",
    emoji: "🚗",
    spentSoFar: 58,
    predictedTotal: 95,
    budget: 120,
    daysLeft: 12,
    trend: "decreasing",
    color: "bg-blue-500",
  },
  {
    id: "4",
    name: "Entertainment",
    emoji: "🎬",
    spentSoFar: 72,
    predictedTotal: 110,
    budget: 100,
    daysLeft: 12,
    trend: "increasing",
    color: "bg-pink-500",
  },
  {
    id: "5",
    name: "Subscriptions",
    emoji: "📱",
    spentSoFar: 56,
    predictedTotal: 56,
    budget: 60,
    daysLeft: 12,
    trend: "stable",
    color: "bg-violet-500",
  },
  {
    id: "6",
    name: "Shopping",
    emoji: "🛍️",
    spentSoFar: 89,
    predictedTotal: 150,
    budget: 180,
    daysLeft: 12,
    trend: "stable",
    color: "bg-amber-500",
  },
]

export function CategoryBreakdown() {
  const overspendCategories = categories.filter(cat => cat.predictedTotal > cat.budget)
  const totalOverspend = overspendCategories.reduce((acc, cat) => acc + (cat.predictedTotal - cat.budget), 0)

  return (
    <div className="px-5 space-y-4">
      <Card className="border-0 bg-card shadow-lg shadow-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Category Forecasts</CardTitle>
          <p className="text-sm text-muted-foreground">Predicted spending by end of month</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {categories.map((cat) => {
            const progressPercent = Math.round((cat.spentSoFar / cat.budget) * 100)
            const forecastPercent = Math.round((cat.predictedTotal / cat.budget) * 100)
            const willOverspend = cat.predictedTotal > cat.budget
            const overAmount = cat.predictedTotal - cat.budget

            return (
              <div
                key={cat.id}
                className={`rounded-xl p-3 ${willOverspend ? 'bg-destructive/5 ring-1 ring-destructive/20' : 'bg-muted/50'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${cat.color}/15 text-lg`}>
                      {cat.emoji}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground">{cat.name}</p>
                        {willOverspend && (
                          <AlertTriangle className="h-4 w-4 text-destructive" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        £{cat.spentSoFar} spent · <span className={willOverspend ? 'text-destructive font-medium' : 'text-foreground'}>£{cat.predictedTotal}</span> predicted
                      </p>
                    </div>
                  </div>
                  <div className="text-right min-w-[70px]">
                    <p className="text-sm font-medium text-foreground">£{cat.budget}</p>
                    <p className="text-xs text-muted-foreground">budget</p>
                  </div>
                </div>
                
                {/* Progress bar with forecast indicator */}
                <div className="relative mt-1">
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    {/* Current spent */}
                    <div 
                      className={`h-full rounded-full ${willOverspend ? 'bg-destructive' : 'bg-emerald-500'}`}
                      style={{ width: `${Math.min(progressPercent, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Overspend warning */}
                {willOverspend && (
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-xs text-destructive">
                      Predicted to exceed by £{overAmount}
                    </span>
                    <Button size="sm" variant="outline" className="h-6 text-xs border-destructive/30 text-destructive hover:bg-destructive/10">
                      Set alert
                    </Button>
                  </div>
                )}
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* AI Forecast Summary */}
      {overspendCategories.length > 0 && (
        <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground mb-1">Finny&apos;s Forecast</p>
                <p className="text-sm text-muted-foreground mb-3">
                  Based on your spending pace, you&apos;re on track to overspend by <span className="font-medium text-destructive">£{totalOverspend}</span> across{" "}
                  <span className="font-medium text-foreground">{overspendCategories.map(c => c.name).join(" and ")}</span> this month.
                </p>
                <div className="flex gap-2">
                  <Button size="sm" className="gap-1.5 bg-foreground text-background hover:bg-foreground/90">
                    <Target className="h-3.5 w-3.5" />
                    Adjust budgets
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1.5">
                    <Bell className="h-3.5 w-3.5" />
                    Set alerts
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
