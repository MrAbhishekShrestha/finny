"use client"

import { Header } from "@/components/finny/header"
import { SavingsGoals } from "@/components/finny/savings-goals"
import { AIInsights } from "@/components/finny/ai-insights"
import { ChatBar } from "@/components/finny/chat-bar"
import { BottomNav } from "@/components/finny/bottom-nav"
import { useStore } from "@/store/useStore"

export default function FinnyDashboard() {
  const user = useStore(state => state.user)
  const currentAccount = user.accounts.find(acc => acc.type === "CURRENT")
  const balance = currentAccount ? currentAccount.balance : 0

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-44">
      {/* Header with greeting and balance */}
      <Header userName={user.firstName} balance={balance} />

      {/* Main content */}
      <div className="space-y-6 py-6">
        {/* Savings Goals Carousel */}
        <SavingsGoals />

        {/* AI Subscription Insights */}
        <AIInsights />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />

      {/* Sticky AI Chat Bar */}
      <ChatBar />
    </div>
  )
}
