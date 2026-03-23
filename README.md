# Finny AI — Your Intelligent Banking Companion 🏦✨

**Built for the NatWest Group x Google Cloud Hackathon at the University of Edinburgh**

![Finny AI Hackathon Banner](/public/logo.jpeg)

## 🚀 Overview
**Finny AI** is a proactive, AI-powered conversational banking companion designed to integrate seamlessly into the NatWest mobile app. 

While traditional banking apps are **reactive** (showing you what you've already spent), Finny is **proactive**—analyzing your historical data, forecasting your budget, and actively nudging you towards achieving your personal financial goals.

## ✨ Key Features
- **Proactive AI Insights:** Leverages the Gemini API to analyze transaction history, warning users *before* they overspend on categories like Dining Out or Entertainment.
- **Generative UI (Interactive Chat):** Powered by Gemini Function Calling, Finny doesn't just talk—it takes action. It dynamically renders interactive React widgets mid-conversation, allowing users to move money or create new Savings Pots instantly without leaving the chat interface.
- **Goal Tracking & Forecasting:** Users can create tailored savings goals. Finny manages target dates, evaluates progress, and issues conversational nudges.
- **Smart Subscription Management:** Automatically identifies recurring transactions and suggests diverting funds from unused or forgotten subscriptions directly into high-yield savings pots.
- **Strict Financial Guardrails:** Architected with comprehensive system instructions to politely refuse formal investment advice and stay strictly on-topic regarding the user's personal banking.

## 🛠️ Technology Stack
- **Frontend Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling & Components:** [Tailwind CSS](https://tailwindcss.com/), [Shadcn UI](https://ui.shadcn.com/), and `react-markdown`
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) for blazing-fast, instantaneous state synchronization between the chat widgets and the main dashboard.
- **AI Engine:** [Google Gemini API](https://ai.google.dev/) (`@google/genai` SDK) utilizing Advanced System Instructions and Tool/Function Calling.
- **Deployment:** Containerized via Docker and deployed serverlessly on **Google Cloud Run**.

## 💻 Running Locally

1. **Clone the repository and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the Finny dashboard.

## 🏗️ Project Architecture
- **`/app/api/chat/route.ts`**: The secure Node.js backend proxy that contextualizes the user's live financial data and defines the `proposeTransfer` and `proposeGoal` tools for Gemini.
- **`/store/useStore.ts`**: The Zustand global state manager that seeds mock banking data and mutates balances securely across the platform.
- **`/components/finny/chat-widgets.tsx`**: The interactive "Generative UI" components that seamlessly blend chat conversations with actionable banking workflows.
