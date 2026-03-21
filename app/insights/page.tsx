import { InsightsHeader } from "@/components/finny/insights-header"
import { SpendingOverview } from "@/components/finny/spending-overview"
import { CategoryBreakdown } from "@/components/finny/category-breakdown"
import { SmartActions } from "@/components/finny/smart-actions"
import { BottomNav } from "@/components/finny/bottom-nav"
import { ChatBar } from "@/components/finny/chat-bar"

export default function InsightsPage() {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-background pb-44">
      {/* Header with back button */}
      <InsightsHeader />

      {/* Main content */}
      <div className="space-y-6 py-6">
        {/* Spending Overview Chart */}
        <SpendingOverview />

        {/* Category Breakdown */}
        <CategoryBreakdown />

        {/* Smart Actions */}
        <SmartActions />
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab="Insights" />

      {/* Sticky AI Chat Bar */}
      <ChatBar />
    </div>
  )
}
