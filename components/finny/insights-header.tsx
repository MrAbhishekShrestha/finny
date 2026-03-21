"use client"

import { ArrowLeft, Sparkles, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function InsightsHeader() {
  return (
    <div className="bg-gradient-to-br from-primary via-primary to-primary/90 px-5 pb-6 pt-12">
      {/* Navigation row */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full bg-white/10 text-primary-foreground hover:bg-white/20"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-lg font-semibold text-primary-foreground">AI Insights</h1>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-full bg-white/10 text-primary-foreground hover:bg-white/20"
        >
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Insights summary */}
      <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <p className="text-primary-foreground/80 text-sm">Finny has found</p>
            <p className="text-primary-foreground text-lg font-bold">4 insights for you</p>
          </div>
        </div>
        <p className="text-primary-foreground/70 text-sm">
          Based on your spending from the last 3 months, here are some patterns and opportunities.
        </p>
      </div>
    </div>
  )
}
