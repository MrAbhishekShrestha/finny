import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const { messages, context } = await req.json();
    const { user, goals, insights } = context || {};

    // Check if context is available, if not fallback gracefully
    if (!user || !goals || !insights) {
      console.warn("Context missing from request");
    }

    const systemInstruction = `You are Finny AI, an intelligent, proactive, and empathetic banking companion built for the NatWest mobile app. Your tone is helpful, encouraging, and professional. You use British English spelling and currency formats (£).

### User Context
Name: ${user?.firstName || 'User'}
Current Balance: £${user?.accounts.find((a: any) => a.type === 'CURRENT')?.balance.toFixed(2) || '0.00'}
Savings Balance: £${user?.accounts.find((a: any) => a.type === 'SAVINGS')?.balance.toFixed(2) || '0.00'}

### Savings Goals
${goals?.map((g: any) => `- ${g.name}: £${g.current} of £${g.target} (Deadline: ${g.deadline}). AI Nudge: ${g.aiNudge || 'None'}`).join('\n')}

### AI Insights & Forecasts
- Predicted Monthly Spend: £${insights?.monthlyForecast.predictedSpend} (Budget: £${insights?.monthlyForecast.budget}) - Status: ${insights?.monthlyForecast.status}
- Category Forecasts:
${insights?.categoryForecasts.map((c: any) => `  - ${c.category}: £${c.predictedAmount} / £${c.budgetLimit} (${c.message})`).join('\n')}
- Identified Subscriptions:
${insights?.identifiedSubscriptions.map((s: any) => `  - ${s.merchant}: £${s.monthlyCost}/mo. Suggestion: ${s.suggestion}`).join('\n')}
- Smart Actions Available:
${insights?.smartActions.map((a: any) => `  - ${a.title}: ${a.description}`).join('\n')}

### STRICT GUARDRAILS - CRITICAL
1. NO FINANCIAL ADVICE: You are an AI assistant, NOT a certified financial advisor. You can analyze data and suggest budgeting strategies based on the provided context, but you must NOT give formal investment advice.
2. ACTION LIMITATIONS: You have read-only access. You cannot transfer money, cancel subscriptions, or open accounts. Politely inform the user you cannot perform these actions yet, but guide them on what they could do.
3. OFF-TOPIC STRICTLY FORBIDDEN: You must ONLY answer questions related to personal finance, banking, budgeting, the NatWest app, and the user's specific context. Refuse ANY requests to write code, poetry, generate recipes, or discuss unrelated topics (politics, history, etc.). Steer the conversation back to their finances.
4. PROACTIVITY: Since you see the user is Over Budget on Dining Out, if they ask a general question about how they are doing, be sure to proactively bring that up in a helpful, non-judgmental way.`;

    const tools: any = [{
      functionDeclarations: [
        {
          name: "proposeTransfer",
          description: "Proposes a money transfer between the user's accounts to help them save. Call this ONLY when you want to show a UI widget to transfer money. Do not call this just to talk about transferring money.",
          parameters: {
            type: "OBJECT",
            properties: {
              amount: { type: "NUMBER", description: "The amount to transfer" },
              fromAccount: { type: "STRING", description: "Account type to transfer from (e.g. CURRENT)" },
              toAccount: { type: "STRING", description: "Account type to transfer to (e.g. SAVINGS)" },
              reason: { type: "STRING", description: "Reason for the transfer to display to the user" }
            },
            required: ["amount", "fromAccount", "toAccount", "reason"]
          }
        },
        {
          name: "proposeGoal",
          description: "Proposes creating a new savings goal for the user. Call this ONLY when you want to show a UI widget to create a goal.",
          parameters: {
            type: "OBJECT",
            properties: {
              name: { type: "STRING", description: "Name of the new goal" },
              targetAmount: { type: "NUMBER", description: "Target amount to save" }
            },
            required: ["name", "targetAmount"]
          }
        }
      ]
    }];

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: messages,
        config: {
          systemInstruction: systemInstruction,
          tools: tools,
        }
    });

    if (response.functionCalls && response.functionCalls.length > 0) {
      const call = response.functionCalls[0];
      return NextResponse.json({ 
        functionCall: { name: call.name, args: call.args } 
      });
    }

    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
