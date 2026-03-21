"use client"

import { Home, MessageCircle, ArrowLeftRight, BarChart3, FileText } from "lucide-react"
import Link from "next/link"

interface NavItem {
  icon: React.ReactNode
  label: string
  href: string
}

const navItems: NavItem[] = [
  { icon: <Home className="h-5 w-5" />, label: "Home", href: "/" },
  { icon: <MessageCircle className="h-5 w-5" />, label: "Help", href: "/" },
  { icon: <ArrowLeftRight className="h-5 w-5" />, label: "Payments", href: "/" },
  { icon: <BarChart3 className="h-5 w-5" />, label: "Insights", href: "/insights" },
  { icon: <FileText className="h-5 w-5" />, label: "Apply", href: "/" },
]

interface BottomNavProps {
  activeTab?: string
}

export function BottomNav({ activeTab = "Home" }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md border-t border-border bg-background/95 px-2 pb-6 pt-2 backdrop-blur-md">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = item.label === activeTab
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-2 transition-colors ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <div className={`${isActive ? "text-primary" : ""}`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : ""}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -top-0.5 h-0.5 w-8 rounded-full bg-primary" />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
