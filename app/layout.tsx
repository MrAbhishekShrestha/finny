import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Finny AI',
  description: 'Your intelligent, proactive banking companion powered by Google Gemini. Built for the NatWest Group x Google Cloud Hackathon at the University of Edinburgh',
  openGraph: {
    title: 'Finny AI',
    description: 'Your intelligent, proactive banking companion powered by Google Gemini. Built for the NatWest Group x Google Cloud Hackathon at the University of Edinburgh',
    images: ['/logo.jpeg'],
  },
  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
