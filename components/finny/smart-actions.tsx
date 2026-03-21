"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
  ArrowRight, 
  AlertTriangle, 
  PiggyBank, 
  TrendingDown,
  Calendar,
  Target,
  Zap,
  ShieldCheck
} from "lucide-react"

interface SmartAction {
  id: string
  type: "urgent" | "opportunity" | "goal" | "protection"
  title: string
  description: string
  actionLabel: string
  impact: string
  icon: React.ReactNode
}

const smartActions: SmartAction[] = [
  {
    id: "1",
    type: "urgent",
    title: "Reduce dining spend by £8/day",
    description: "At current pace, you'll exceed your £200 dining budget. Cutting back now keeps you on track.",
    actionLabel: "Set spending limit",
    impact: "Stay on budget",
    icon: <TrendingDown className="h-5 w-5" />,
  },
  {
    id: "2",
    type: "protection",
    title: "Bill spike alert: Energy",
    description: "Your energy bill is forecasted to increase by 15% next month based on seasonal patterns.",
    actionLabel: "Review & prepare",
    impact: "Prepare for £42 increase",
    icon: <ShieldCheck className="h-5 w-5" />,
  },
  {
    id: "3",
    type: "goal",
    title: "Paris Trip on track",
    description: "Saving £125/month means you'll hit your £1,200 target by August. Keep it up!",
    actionLabel: "Boost savings",
    impact: "Reach goal 2 wks early",
    icon: <Target className="h-5 w-5" />,
  },
  {
    id: "4",
    type: "opportunity",
    title: "Predicted surplus: £85",
    description: "Based on your forecast, you'll have £85 left over this month. Move it to savings?",
    actionLabel: "Auto-save surplus",
    impact: "Extra £1,020/year",
    icon: <PiggyBank className="h-5 w-5" />,
  },
  {
    id: "5",
    type: "opportunity",
    title: "Subscription renewal coming",
    description: "Netflix renews in 5 days (£15.99). Your usage is low - consider downgrading?",
    actionLabel: "Review subscription",
    impact: "Save £48/year",
    icon: <Calendar className="h-5 w-5" />,
  },
]

function getActionStyles(type: SmartAction["type"]) {
  switch (type) {
    case "urgent":
      return {
        bg: "bg-destructive/5 ring-1 ring-destructive/20",
        iconBg: "bg-destructive/10 text-destructive",
        badge: "border-destructive/30 bg-destructive/10 text-destructive",
      }
    case "protection":
      return {
        bg: "bg-orange-500/5 ring-1 ring-orange-500/20",
        iconBg: "bg-orange-500/10 text-orange-600",
        badge: "border-orange-500/30 bg-orange-500/10 text-orange-600",
      }
    case "opportunity":
      return {
        bg: "bg-emerald-500/5 ring-1 ring-emerald-500/20",
        iconBg: "bg-emerald-500/10 text-emerald-600",
        badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600",
      }
    case "goal":
      return {
        bg: "bg-primary/5 ring-1 ring-primary/20",
        iconBg: "bg-primary/10 text-primary",
        badge: "border-primary/30 bg-primary/10 text-primary",
      }
  }
}

export function SmartActions() {
  const urgentActions = smartActions.filter(a => a.type === "urgent" || a.type === "protection")
  
  return (
    <div className="px-5">
      <Card className="border-0 bg-card shadow-lg shadow-primary/5">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Proactive Actions</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">AI-powered recommendations based on forecasts</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {smartActions.map((action) => {
            const styles = getActionStyles(action.type)
            
            return (
              <div
                key={action.id}
                className={`rounded-xl p-4 ${styles.bg}`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.iconBg}`}>
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-foreground">{action.title}</p>
                      {action.type === "urgent" && (
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{action.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className={styles.badge}>
                    {action.impact}
                  </Badge>
                  <Button 
                    size="sm" 
                    className="gap-1.5 bg-foreground text-background hover:bg-foreground/90"
                  >
                    {action.actionLabel}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Summary card */}
      <Card className="border-0 bg-gradient-to-br from-primary to-primary/90 shadow-lg shadow-primary/25 mt-4">
        <CardContent className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-primary-foreground/80 text-sm">Your financial forecast</p>
              <p className="text-primary-foreground text-xl font-bold">Looking ahead</p>
            </div>
          </div>
          <p className="text-primary-foreground/70 text-sm mb-4">
            {urgentActions.length > 0 
              ? `You have ${urgentActions.length} action${urgentActions.length > 1 ? 's' : ''} that need${urgentActions.length === 1 ? 's' : ''} attention. Taking action now can help you stay on track.`
              : "You're on track this month! Keep up the good financial habits."
            }
          </p>
          <Button 
            className="w-full bg-white text-primary hover:bg-white/90 gap-2"
            size="lg"
          >
            <Sparkles className="h-4 w-4" />
            Review all forecasts
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
