'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MessageCircle, HelpCircle } from 'lucide-react'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/10 backdrop-blur-sm border-b border-white/20">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - empty for balance */}
          <div className="w-16"></div>

          {/* Navigation Links - centered */}
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                pathname === '/'
                  ? 'bg-white/20 text-white border border-white/40'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat</span>
            </Link>
            
            <Link
              href="/faq"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                pathname === '/faq'
                  ? 'bg-white/20 text-white border border-white/40'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </Link>
          </div>

          {/* Right side - empty for balance */}
          <div className="w-16"></div>
        </div>
      </div>
    </nav>
  )
}
