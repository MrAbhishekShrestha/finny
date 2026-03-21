"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, TrendingUp, AlertTriangle, ChevronRight, Zap } from "lucide-react"
import Link from "next/link"
import { useStore } from "@/store/useStore"

interface Forecast {
  id: string
  category: string
  icon: string
  predictedAmount: number
  budgetLimit: number
  riskLevel: "on-track" | "warning" | "overspend"
  message: string
}

export function AIInsights() {
  const forecasts = useStore(state => state.insights.categoryForecasts) as Forecast[]
  const hasWarnings = forecasts.some(f => f.riskLevel === "overspend" || f.riskLevel === "warning")

  return (
    <div className="px-5">
      <Card className="border-0 bg-card shadow-lg shadow-primary/5">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-4 w-4 text-primary-foreground" />
              </div>
              <CardTitle className="text-lg">AI Forecasts</CardTitle>
            </div>
            <Link href="/insights">
              <Button variant="ghost" size="sm" className="gap-1 text-primary hover:text-primary/80">
                View all
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Forecast summary */}
          <div className={`rounded-xl p-4 ${hasWarnings ? 'bg-gradient-to-br from-destructive/10 to-orange-500/10' : 'bg-gradient-to-br from-emerald-500/10 to-primary/10'}`}>
            <div className="flex items-center gap-2 mb-2">
              {hasWarnings ? (
                <AlertTriangle className="h-5 w-5 text-destructive" />
              ) : (
                <Zap className="h-5 w-5 text-emerald-600" />
              )}
              <span className="text-sm font-medium text-foreground">
                {hasWarnings ? "Heads up for this month" : "Looking good this month"}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              {hasWarnings 
                ? "Finny predicts you may overspend in some categories based on your current pace."
                : "You're on track to stay within your budgets this month."
              }
            </p>
          </div>

          {/* Forecast highlights */}
          <div className="space-y-3">
            {forecasts.map((forecast) => {
              const percentage = Math.round((forecast.predictedAmount / forecast.budgetLimit) * 100)
              
              return (
                <div
                  key={forecast.id}
                  className={`rounded-xl p-3 ${
                    forecast.riskLevel === "overspend" 
                      ? "bg-destructive/5 ring-1 ring-destructive/20" 
                      : "bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm ${
                        forecast.riskLevel === 'overspend' || forecast.riskLevel === 'warning' 
                          ? 'bg-orange-500/15' 
                          : 'bg-emerald-500/15'
                      }`}>
                        {forecast.icon}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{forecast.category}</p>
                        <p className="text-xs text-muted-foreground">{forecast.message}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        forecast.riskLevel === "overspend" 
                          ? 'border-destructive/30 bg-destructive/10 text-destructive' 
                          : forecast.riskLevel === "warning"
                          ? 'border-orange-500/30 bg-orange-500/10 text-orange-600'
                          : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-600'
                      }`}
                    >
                      {forecast.riskLevel === "overspend" && <TrendingUp className="h-3 w-3 mr-1" />}
                      {percentage}%
                    </Badge>
                  </div>
                  {/* Progress bar */}
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        forecast.riskLevel === "overspend" 
                          ? "bg-destructive" 
                          : forecast.riskLevel === "warning"
                          ? "bg-orange-500"
                          : "bg-emerald-500"
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>

          {/* Action button */}
          <Link href="/insights" className="block">
            <Button
              className="group w-full gap-2 bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90"
              size="lg"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm">See all forecasts & actions</span>
              <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Button>
          </Link>
          
          <p className="text-center text-xs text-muted-foreground">
            Predictions based on your spending patterns
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
