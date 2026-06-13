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
    const numAmount = Number(amount);
    let toAccountType = toType.toUpperCase() === 'CURRENT' ? 'CURRENT' : 'SAVINGS';
    let goalFound = false;

    const cleanToType = toType.toLowerCase().trim();

    // Check if the target is actually a savings goal
    const newGoals = state.goals.map(goal => {
      const cleanGoalName = goal.name.toLowerCase();
      const isMatch = 
        cleanGoalName === cleanToType || 
        goal.id.toLowerCase() === cleanToType ||
        cleanToType.includes(cleanGoalName) ||
        cleanGoalName.includes(cleanToType);

      if (isMatch) {
        goalFound = true;
        toAccountType = 'SAVINGS'; // Route the underlying funds to the SAVINGS vault
        return { ...goal, current: Number(goal.current) + numAmount };
      }
      return goal;
    });

    const newAccounts = state.user.accounts.map(acc => {
      if (acc.type === fromType) return { ...acc, balance: acc.balance - numAmount }
      if (acc.type === toAccountType) return { ...acc, balance: acc.balance + numAmount }
      return acc
    })
    
    const newTx = {
      id: `tx${Date.now()}`,
      date: new Date().toISOString(),
      merchant: goalFound ? `Contribution to ${toType}` : `Transfer to ${toType}`,
      amount: -numAmount,
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
