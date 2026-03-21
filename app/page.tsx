import { Header } from "@/components/finny/header"
import { SavingsGoals } from "@/components/finny/savings-goals"
import { AIInsights } from "@/components/finny/ai-insights"
import { ChatBar } from "@/components/finny/chat-bar"
import { BottomNav } from "@/components/finny/bottom-nav"
import userData from "@/data/user.json"

export default function FinnyDashboard() {
  const currentAccount = userData.accounts.find(acc => acc.type === "CURRENT")
  const balance = currentAccount ? currentAccount.balance : 0

  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-44">
      {/* Header with greeting and balance */}
      <Header userName={userData.firstName} balance={balance} />

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
