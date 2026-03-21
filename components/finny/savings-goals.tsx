"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Plane, Gift, Home } from "lucide-react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface SavingGoal {
  id: string
  name: string
  target: number
  current: number
  deadline: string
  icon: "plane" | "gift" | "home"
  aiManaged: boolean
}

const goals: SavingGoal[] = [
  {
    id: "1",
    name: "Paris Trip",
    target: 500,
    current: 100,
    deadline: "June 2026",
    icon: "plane",
    aiManaged: true,
  },
  {
    id: "2",
    name: "Birthday Fund",
    target: 200,
    current: 150,
    deadline: "Aug 2026",
    icon: "gift",
    aiManaged: false,
  },
  {
    id: "3",
    name: "Emergency Fund",
    target: 2000,
    current: 850,
    deadline: "Dec 2026",
    icon: "home",
    aiManaged: true,
  },
]

const iconMap = {
  plane: Plane,
  gift: Gift,
  home: Home,
}

export function SavingsGoals() {
  return (
    <div className="px-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Saving Pots & Goals</h2>
        <button className="text-sm font-medium text-primary hover:underline">
          View all
        </button>
      </div>
      
      <ScrollArea className="w-full pb-4">
        <div className="flex gap-3">
          {goals.map((goal) => {
            const Icon = iconMap[goal.icon]
            const progress = Math.round((goal.current / goal.target) * 100)
            
            return (
              <Card
                key={goal.id}
                className="min-w-[200px] flex-shrink-0 border-0 bg-card shadow-lg shadow-primary/5"
              >
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    {goal.aiManaged && (
                      <div className="flex items-center gap-1 rounded-full bg-primary/10 px-2 py-1">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span className="text-[10px] font-medium text-primary">AI</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="font-semibold text-foreground">{goal.name}</h3>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Deadline: {goal.deadline}
                  </p>
                  
                  <div className="mt-3">
                    <div className="mb-1.5 flex items-baseline justify-between">
                      <span className="text-lg font-bold text-foreground">
                        £{goal.current}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        of £{goal.target}
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="mt-1.5 text-right text-xs font-medium text-primary">
                      {progress}% complete
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
