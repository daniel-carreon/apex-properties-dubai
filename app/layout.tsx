import type { Metadata } from 'next'
import './globals.css'
import Header from '@/shared/components/Header'
import Footer from '@/shared/components/Footer'
import ChatWidget from '@/features/chatbot/components/ChatWidget'

export const metadata: Metadata = {
  title: 'Apex Properties Dubai | Ultra-Luxury Real Estate',
  description:
    'Discover Dubai\'s most exclusive properties. Penthouses, waterfront villas, and investment opportunities in Palm Jumeirah, Downtown Dubai, Emirates Hills, and beyond.',
  keywords:
    'Dubai real estate, luxury properties Dubai, Palm Jumeirah villas, Dubai penthouses, Dubai investment properties, Golden Visa UAE',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="smooth-scroll">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
