import { create } from 'zustand'
import userData from '@/data/user.json'
import goalsData from '@/data/goals.json'
import insightsData from '@/data/insights.json'
import transactionsData from '@/data/transactions.json'

interface Goal {
  id: string
  name: string
  target: number
  current: number
  deadline: string
  icon: string
  aiManaged: boolean
  aiNudge: string | null
}

interface AppState {
  user: typeof userData
  goals: Goal[]
  insights: typeof insightsData
  transactions: typeof transactionsData
  addGoal: (goal: Goal) => void
  moveMoney: (amount: number, fromType: string, toType: string) => void
}

export const useStore = create<AppState>((set) => ({
  user: userData,
  goals: goalsData as Goal[],
  insights: insightsData,
  transactions: transactionsData,
  
  addGoal: (goal) => set((state) => ({ goals: [...state.goals, goal] })),
  
  moveMoney: (amount, fromType, toType) => set((state) => {
    let toAccountType = toType;
    let goalFound = false;

    // Check if the target is actually a savings goal
    const newGoals = state.goals.map(goal => {
      if (goal.name.toLowerCase() === toType.toLowerCase() || goal.id === toType) {
        goalFound = true;
        toAccountType = 'SAVINGS'; // Route the underlying funds to the SAVINGS vault
        return { ...goal, current: goal.current + amount };
      }
      return goal;
    });

    const newAccounts = state.user.accounts.map(acc => {
      if (acc.type === fromType) return { ...acc, balance: acc.balance - amount }
      if (acc.type === toAccountType) return { ...acc, balance: acc.balance + amount }
      return acc
    })
    
    const newTx = {
      id: `tx${Date.now()}`,
      date: new Date().toISOString(),
      merchant: goalFound ? `Contribution to ${toType}` : `Transfer to ${toType}`,
      amount: -amount,
      category: "Transfer",
      isSubscription: false
    }

    return { 
      user: { ...state.user, accounts: newAccounts },
      goals: newGoals,
      transactions: [newTx, ...state.transactions]
    }
  })
}))
