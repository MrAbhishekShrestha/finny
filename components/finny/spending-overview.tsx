"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle, Sparkles } from "lucide-react"

interface MonthForecast {
  month: string
  actual?: number
  predicted?: number
  isCurrent?: boolean
  isFuture?: boolean
}

const monthlyData: MonthForecast[] = [
  { month: "Jan", actual: 1920 },
  { month: "Feb", actual: 1780 },
  { month: "Mar", actual: 1640, isCurrent: true, predicted: 1850 },
  { month: "Apr", predicted: 1920, isFuture: true },
  { month: "May", predicted: 1780, isFuture: true },
  { month: "Jun", predicted: 1650, isFuture: true },
]

export function SpendingOverview() {
  const currentMonth = monthlyData.find(m => m.isCurrent)
  const predictedTotal = currentMonth?.predicted || 0
  const spentSoFar = currentMonth?.actual || 0
  const remainingDays = 12 // days left in month
  const dailyBurnRate = spentSoFar / (30 - remainingDays)
  const projectedOverspend = predictedTotal - 1700 // budget

  const maxAmount = Math.max(...monthlyData.map(m => m.actual || m.predicted || 0))

  return (
    <div className="px-5">
      <Card className="border-0 bg-card shadow-lg shadow-primary/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Spending Forecast</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">Predictions for the next 3 months</p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Forecast summary */}
          <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm text-muted-foreground">Predicted this month</p>
                <p className="text-2xl font-bold text-foreground">£{predictedTotal.toLocaleString()}</p>
              </div>
              <Badge 
                variant="outline" 
                className={`gap-1 ${
                  projectedOverspend > 0 
                    ? "border-destructive/30 bg-destructive/10 text-destructive"
                    : "border-emerald-500/30 bg-emerald-500/10 text-emerald-600"
                }`}
              >
                {projectedOverspend > 0 ? (
                  <>
                    <TrendingUp className="h-3 w-3" />
                    £{projectedOverspend} over budget
                  </>
                ) : (
                  <>
                    <TrendingDown className="h-3 w-3" />
                    On budget
                  </>
                )}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Spent so far: <span className="font-medium text-foreground">£{spentSoFar}</span></span>
              <span>Daily avg: <span className="font-medium text-foreground">£{Math.round(dailyBurnRate)}</span></span>
            </div>
          </div>

          {/* Bar chart with forecast */}
          <div className="flex items-end justify-between gap-3">
            {monthlyData.map((data) => {
              const amount = data.actual || data.predicted || 0
              // Normalize height with a minimum base to ensure visible bars
              const normalizedHeight = ((amount - 1400) / (maxAmount - 1400)) * 100
              const height = Math.max(normalizedHeight, 20) // Minimum 20% height
              
              return (
                <div key={data.month} className="flex flex-1 flex-col items-center gap-2">
                  <span className="text-xs font-medium text-foreground">
                    £{(amount / 1000).toFixed(1)}k
                  </span>
                  <div className="h-28 w-full flex items-end">
                    <div
                      className={`w-full rounded-t-lg transition-all ${
                        data.isCurrent
                          ? "bg-primary"
                          : data.isFuture
                          ? "bg-primary/30 border-2 border-dashed border-primary/50"
                          : "bg-primary/20"
                      }`}
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <div className="text-center">
                    <span className={`text-xs ${data.isCurrent ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                      {data.month}
                    </span>
                    {data.isFuture && (
                      <span className="block text-[9px] text-muted-foreground">forecast</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Insights */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 rounded-xl bg-muted/50 p-3">
              <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0" />
              <p className="text-sm text-muted-foreground">
                At your current pace, you&apos;ll spend <span className="font-medium text-foreground">£150 more</span> than last March
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-emerald-500/5 p-3">
              <Sparkles className="h-4 w-4 text-emerald-600 shrink-0" />
              <p className="text-sm text-muted-foreground">
                Reducing daily spending by <span className="font-medium text-emerald-600">£12</span> keeps you on budget
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
