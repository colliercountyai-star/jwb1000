import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Playfair_Display, Lato } from 'next/font/google'
import Navigation from '@/components/Navigation'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({ 
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['300', '400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Margaritaville AI Chatbot',
  description: 'AI-powered dining assistant for Jimmy Buffett\'s Margaritaville',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} ${playfair.variable} ${lato.variable}`}>
      <body className={GeistSans.className}>
        {/* Background Image - extends behind navigation */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat -z-10"
          style={{
            backgroundImage: "url('/images/tropical-beach.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        </div>
        
        <Navigation />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
