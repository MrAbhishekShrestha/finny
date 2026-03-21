"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Send, Sparkles } from "lucide-react"

import ReactMarkdown from "react-markdown"

interface Message {
  role: "user" | "model"
  content: string
}

export default function ChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q")
  
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialQuery && messages.length === 0) {
      sendMessage(initialQuery)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    const text = input
    setInput("")
    await sendMessage(text)
  }

  const sendMessage = async (text: string) => {
    // Add user message to UI immediately
    const newMessages = [...messages, { role: "user", content: text }] as Message[]
    setMessages(newMessages)
    setIsLoading(true)

    try {
      // Map to Gemini format: { role: "user", parts: [{ text: "..." }] }
      const formattedMessages = newMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.content }]
      }))

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: formattedMessages })
      })
      
      const data = await res.json()
      if (data.text) {
        setMessages([...newMessages, { role: "model", content: data.text }])
      }
    } catch (error) {
      console.error("Error fetching chat:", error)
      setMessages([...newMessages, { role: "model", content: "Sorry, I'm having trouble connecting right now." }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-[100dvh] max-w-md mx-auto bg-background">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-border bg-card">
        <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="mr-2 px-0 w-8 h-8">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-2">
           <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
             <Sparkles className="h-4 w-4 text-primary" />
           </div>
           <div>
             <h1 className="font-semibold text-foreground leading-tight">Finny AI</h1>
             <p className="text-xs text-muted-foreground">Your banking companion</p>
           </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-50 pb-20">
            <Sparkles className="h-8 w-8 text-primary" />
            <p className="text-sm">How can I help with your finances today?</p>
          </div>
        )}
        
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.role === 'model' && (
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
            )}
            
            <div className={`rounded-xl px-4 py-3 max-w-[85%] ${
              m.role === 'user' 
                ? 'bg-primary text-primary-foreground rounded-br-sm shadow-sm' 
                : 'bg-muted text-foreground rounded-tl-sm shadow-sm'
            }`}>
              <div className="text-sm leading-relaxed whitespace-pre-wrap break-words [&>p]:mb-2 [&>p:last-child]:mb-0 [&>ul]:mb-2 [&>ul]:ml-5 [&>ul]:list-disc [&>ol]:mb-2 [&>ol]:ml-5 [&>ol]:list-decimal [&>strong]:font-semibold">
                <ReactMarkdown>{m.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            </div>
            <div className="rounded-xl px-4 py-4 bg-muted rounded-tl-sm w-16">
              <div className="flex gap-1 items-center h-full justify-center">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" />
                <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0.15s' }} />
                <div className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: '0.3s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-border bg-background pb-8">
        <form onSubmit={handleSend} className="flex gap-2 items-center bg-card p-2 rounded-full border border-border shadow-sm">
          <Input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Type your message..."
            className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0 px-3"
          />
          <Button 
            type="submit" 
            size="icon" 
            className="rounded-full flex-shrink-0 h-9 w-9" 
            disabled={!input.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}
