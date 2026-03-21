"use client"

import { useState } from "react"
import { useStore } from "@/store/useStore"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function TransferWidget({ args, onComplete }: { args: any, onComplete: (msg: string) => void }) {
  const moveMoney = useStore(state => state.moveMoney)
  const [complete, setComplete] = useState(false)

  const handleTransfer = () => {
    moveMoney(args.amount, args.fromAccount, args.toAccount)
    setComplete(true)
    onComplete(`I've confirmed the transfer of £${args.amount} from ${args.fromAccount} to ${args.toAccount}.`)
  }

  return (
    <Card className="w-full my-2 bg-primary/5 border-primary/20 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-primary">Smart Action: Transfer</CardTitle>
      </CardHeader>
      <CardContent className="text-sm pb-4 space-y-2">
        <p className="text-muted-foreground">{args.reason}</p>
        <div className="flex justify-between font-semibold border-t border-border pt-2 mt-2">
          <span>Amount:</span>
          <span>£{args.amount}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleTransfer} 
          disabled={complete}
        >
          {complete ? "Transfer Complete ✓" : "Confirm Transfer"}
        </Button>
      </CardFooter>
    </Card>
  )
}

export function CreateGoalWidget({ args, onComplete }: { args: any, onComplete: (msg: string) => void }) {
  const addGoal = useStore(state => state.addGoal)
  const [complete, setComplete] = useState(false)

  const handleCreate = () => {
    addGoal({
      id: `g${Date.now()}`,
      name: args.name,
      target: args.targetAmount,
      current: 0,
      deadline: "TBD",
      icon: "home",
      aiManaged: true,
      aiNudge: "Just started!"
    })
    setComplete(true)
    onComplete(`I've confirmed creating the goal: ${args.name} for £${args.targetAmount}.`)
  }

  return (
    <Card className="w-full my-2 bg-primary/5 border-primary/20 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-primary">Smart Action: New Goal</CardTitle>
      </CardHeader>
      <CardContent className="text-sm pb-4 space-y-2">
        <div className="flex justify-between font-medium">
          <span className="text-muted-foreground">Goal Name:</span>
          <span>{args.name}</span>
        </div>
        <div className="flex justify-between font-semibold border-t border-border pt-2 mt-2">
          <span className="text-muted-foreground">Target Amount:</span>
          <span>£{args.targetAmount}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleCreate} 
          disabled={complete}
        >
          {complete ? "Goal Created ✓" : "Confirm Goal"}
        </Button>
      </CardFooter>
    </Card>
  )
}
