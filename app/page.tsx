"use client"

import ChatPanel from "@/components/chat/ChatPanel"

export default function Home() {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/images/tropical-beach.jpg')"
      }}
    >
      <ChatPanel />
    </div>
  )
}
