"use client"

import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search } from "lucide-react"

interface HeaderProps {
  userName: string
  balance: number
}

export function Header({ userName, balance }: HeaderProps) {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="relative overflow-hidden rounded-b-3xl bg-primary px-5 pb-8 pt-12">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10" />
      
      <div className="relative">
        {/* Top row */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex h-10 items-center overflow-hidden rounded-lg bg-white px-2 py-1 shadow-sm">
              <Image 
                src="/logo.jpeg" 
                alt="Logo" 
                width={100} 
                height={32} 
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              Personal
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20">
              <Bell className="h-5 w-5" />
            </button>
            <Avatar className="h-10 w-10 ring-2 ring-white/20">
              <AvatarImage src="/avatar.jpg" alt={userName} />
              <AvatarFallback className="bg-white/20 text-sm font-medium text-white">
                {userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Greeting and balance */}
        <div>
          <p className="text-sm font-medium text-white/70">
            {getGreeting()},
          </p>
          <h1 className="text-2xl font-semibold text-white">{userName}</h1>
          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-white/60">
              Current Account Balance
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-white">
              £{balance.toLocaleString("en-GB", { minimumFractionDigits: 2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
