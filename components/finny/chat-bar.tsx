"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Sparkles, ArrowUp } from "lucide-react"

import { useRouter } from "next/navigation"

export function ChatBar() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim()) {
      router.push(`/chat?q=${encodeURIComponent(message.trim())}`)
      setMessage("")
    }
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-md border-t border-border bg-background/80 px-4 pb-6 pt-3 backdrop-blur-xl">
      <form
        onSubmit={handleSubmit}
        className={`flex items-center gap-2 rounded-2xl bg-card p-2 shadow-lg transition-all duration-200 ${
          isFocused
            ? "ring-2 ring-primary shadow-primary/20"
            : "ring-1 ring-border"
        }`}
      >
        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask about spending, goals, or subscriptions..."
          className="flex-1 border-0 bg-transparent text-sm placeholder:text-muted-foreground focus-visible:ring-0"
        />
        <Button
          type="submit"
          size="icon"
          className={`h-9 w-9 flex-shrink-0 rounded-xl transition-all duration-200 ${
            message.trim()
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
              : "bg-muted text-muted-foreground"
          }`}
          disabled={!message.trim()}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </form>
      <p className="mt-2 text-center text-[10px] text-muted-foreground">
        Powered by Finny AI • Your intelligent banking companion
      </p>
    </div>
  )
}
