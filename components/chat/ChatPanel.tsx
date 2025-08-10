"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Utensils, Wine, Salad, Heart, Copy, RefreshCw, Trash2, Edit3, ArrowLeft } from "lucide-react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { useChatStore } from "@/lib/chat/store"
import type { ChatMessage } from "@/lib/chat/types"

// Utility Components
const TypingDots = () => (
  <div className="flex space-x-1 p-3">
    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
    <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
  </div>
)

const CodeBlock = ({ children, className }: { children: string; className?: string }) => {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    await navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      <pre className="bg-black/20 backdrop-blur-sm rounded-lg p-4 overflow-x-auto text-sm text-white">
        <code className={className}>{children}</code>
      </pre>
      <Button
        size="sm"
        variant="ghost"
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-white hover:bg-white/20"
        onClick={copyCode}
      >
        {copied ? "Copied!" : "Copy"}
      </Button>
    </div>
  )
}

const MarkdownContent = ({ content }: { content: string }) => (
  <div className="prose prose-sm max-w-none text-white">
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code: ({ node, className, children, ...props }: any) => {
          const isInline = !className || !className.includes('language-')
          if (isInline) {
            return (
              <code className="bg-white/20 px-1 py-0.5 rounded text-sm text-white" {...props}>
                {children}
              </code>
            )
          }
          return <CodeBlock className={className}>{String(children).replace(/\n$/, "")}</CodeBlock>
        },
        img: ({ src, alt }) => (
          <div className="my-4 flex justify-center">
            <img 
              src={src} 
              alt={alt || 'Image'} 
              className="max-w-full h-auto rounded-lg shadow-lg border border-white/20"
              style={{ maxHeight: '400px' }}
            />
          </div>
        ),
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-[#FF7755] hover:underline">
            {children}
          </a>
        ),
        p: ({ children }) => (
          <p className="text-white mb-4 last:mb-0">
            {children}
          </p>
        ),
        h1: ({ children }) => (
          <h1 className="text-white text-2xl font-bold mb-4">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-white text-xl font-bold mb-3">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-white text-lg font-bold mb-2">
            {children}
          </h3>
        ),
        ul: ({ children }) => (
          <ul className="text-white mb-4 list-disc list-inside space-y-1">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="text-white mb-4 list-decimal list-inside space-y-1">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-white">
            {children}
          </li>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-[#FF7755] pl-4 italic text-white/80 mb-4">
            {children}
          </blockquote>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="min-w-full border border-white/20 rounded-lg">
              {children}
            </table>
          </div>
        ),
        th: ({ children }) => (
          <th className="border border-white/20 px-4 py-2 text-left text-white font-semibold bg-white/10">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="border border-white/20 px-4 py-2 text-white">
            {children}
          </td>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  </div>
)

const MessageBubble = ({
  message,
  onAction,
}: {
  message: ChatMessage
  onAction: (action: string, message: ChatMessage) => void
}) => {
  const isUser = message.role === "user"
  const isAssistant = message.role === "assistant"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4 group`}>
      <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} items-start space-x-3 max-w-[80%]`}>
        {/* Avatar */}
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
            isUser ? "bg-[#FF7755] text-white ml-3" : "bg-white/10 backdrop-blur-md text-white mr-3 border border-white/30"
          }`}
        >
          {isUser ? "U" : "J"}
        </div>

        {/* Message Content */}
        <div className="flex flex-col space-y-1">
          <div
            className={`${
              isUser
                ? "bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xl"
                : "bg-white/5 backdrop-blur-md border border-white/30 text-white shadow-xl"
            } rounded-[10px] shadow-lg`}
          >
            <div className="p-4">
              {message.error ? (
                <div className="text-red-300 text-sm">
                  <p className="font-semibold">Error: {message.error}</p>
                  <p>Please try again or rephrase your question.</p>
                </div>
              ) : message.isStreaming ? (
                <TypingDots />
              ) : (
                <MarkdownContent content={message.content} />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          {isAssistant && !message.isStreaming && !message.error && (
            <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="sm"
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/20 text-xs"
                onClick={() => onAction("copy", message)}
              >
                <Copy className="w-3 h-3 mr-1" />
                Copy
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/20 text-xs"
                onClick={() => onAction("regenerate", message)}
              >
                <RefreshCw className="w-3 h-3 mr-1" />
                Regenerate
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-white/70 hover:text-white hover:bg-white/20 text-xs"
                onClick={() => onAction("delete", message)}
              >
                <Trash2 className="w-3 h-3 mr-1" />
                Delete
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const CategoryButton = ({
  icon: Icon,
  label,
  onClick,
}: {
  icon: React.ElementType
  label: string
  onClick: () => void
}) => (
  <Button
    onClick={() => {
      console.log(`Category button clicked: ${label}`)
      onClick()
    }}
    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 hover:border-white/50 rounded-xl px-4 py-2.5 flex items-center space-x-2 transition-all duration-300 hover:scale-105 text-sm font-medium shadow-lg hover:shadow-xl"
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </Button>
)

const LandingView = ({
  onCategorySelect,
  onSendMessage,
}: {
  onCategorySelect: (category: string) => void
  onSendMessage: (message: string) => void
}) => {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      onSendMessage(input.trim())
      setInput("")
    }
  }

  const categories = [
    { icon: Utensils, label: "Ocean to Table", value: "seafood" },
    { icon: Wine, label: "Prime & Vine", value: "steak" },
    { icon: Salad, label: "Garden Fresh", value: "light" },
    { icon: Heart, label: "Romance Menu", value: "date" },
  ]

  return (
    <div className="flex flex-col items-center justify-center px-4 text-center">
      {/* Jimmy Buffett Logo positioned above the Ask Jimmy box */}
      <div className="flex justify-center mb-6">
        <img
          src="/images/jbday_logo_2025.png"
          alt="Jimmy Buffett Day 2025"
          className="h-48 w-auto filter drop-shadow-2xl hover:scale-110 hover:z-50 transition-all duration-300 cursor-pointer"
        />
      </div>

      {/* Welcome Message with Ask Jimmy */}
      <div className="relative mb-8">
        {/* Glass effect background for Ask Jimmy section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/25 p-6 shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-[var(--font-playfair),'Playfair Display',serif] text-white mb-3 font-light tracking-wide">
              Ask Jimmy
            </h2>
            <p className="text-white/80 font-[var(--font-lato),'Lato',sans-serif] leading-relaxed text-base max-w-md mx-auto">
              I'm here to help you discover the perfect Gulf Coast fine dining menu. Let me know what you're craving or
              choose from our popular options below.
            </p>
          </div>
        </div>
      </div>

      {/* Category Buttons - clean, organized layout */}
      <div className="flex flex-wrap justify-center gap-3 mb-8 max-w-3xl relative z-20">
        {categories.map((category) => (
          <CategoryButton
            key={category.value}
            icon={category.icon}
            label={category.label}
            onClick={() => onCategorySelect(category.label)}
          />
        ))}
      </div>

      {/* Input Area */}
      <div className="w-full max-w-lg relative z-20">
        <form onSubmit={handleSubmit} className="relative">
          <div className="bg-white/15 backdrop-blur-sm rounded-2xl border border-white/25 p-3 flex items-center shadow-lg hover:shadow-xl transition-all duration-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Tell me what you're in the mood for..."
              className="flex-1 bg-transparent text-white placeholder-white/60 px-4 py-2.5 focus:outline-none font-[var(--font-lato),'Lato',sans-serif] text-base"
            />
            <Button
              type="submit"
              disabled={!input.trim()}
              className="bg-white/25 hover:bg-white/35 text-white rounded-xl p-2.5 border border-white/30 hover:border-white/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const ChatView = ({ onBack, onReloadSystemPrompt }: { onBack: () => void; onReloadSystemPrompt: () => void }) => {
  const { messages, isLoading, sendMessage, removeMessage, retryLastMessage } = useChatStore()
  const [chatInput, setChatInput] = useState("")

  const scrollAreaRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [messages])

  const handleMessageAction = useCallback(
    async (action: string, message: ChatMessage) => {
      switch (action) {
        case "copy":
          await navigator.clipboard.writeText(message.content)
          break
        case "regenerate":
          await retryLastMessage()
          break
        case "delete":
          removeMessage(message.id)
          break
        case "insert":
          // Would implement insert functionality
          break
      }
    },
    [removeMessage, retryLastMessage],
  )

  return (
    <div className="flex flex-col h-full min-h-screen">
      {/* Header */}
      <div className="p-3 sm:p-4 text-center border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <Button onClick={onBack} variant="ghost" className="absolute left-3 sm:left-4 top-3 sm:top-4 text-white/80 hover:text-white hover:bg-white/10 transition-colors">
          ← Back
        </Button>
        <Button 
          onClick={onReloadSystemPrompt} 
          variant="ghost" 
          className="absolute right-3 sm:right-4 top-3 sm:top-4 text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          title="Reload System Prompt"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
        <h1 className="text-xl sm:text-2xl font-[var(--font-playfair),'Playfair Display',serif] text-white font-light">Ask Jimmy</h1>
        <p className="text-white/60 text-xs sm:text-sm font-[var(--font-lato),'Lato',sans-serif] mt-1">Margaritaville Dining Assistant</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden pb-2">
        <ScrollArea ref={scrollAreaRef} className="h-full px-3 sm:px-4">
          <div className="py-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} onAction={handleMessageAction} />
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="p-3 sm:p-4 pb-8 sm:pb-6 bg-black/30 backdrop-blur-sm border-t border-white/20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/60 backdrop-blur-sm rounded-2xl border border-white/50 p-2 sm:p-3 flex items-center shadow-lg hover:shadow-xl transition-all duration-300 gap-2 min-h-[44px]">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about our menu, wine pairings, or make a reservation..."
              className="flex-1 bg-transparent text-white placeholder-white/80 px-3 sm:px-4 py-2.5 sm:py-3 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-transparent font-[var(--font-lato),'Lato',sans-serif] text-sm sm:text-base min-w-0 w-full h-full drop-shadow-lg"
              onKeyDown={(e) => {
                if (e.key === "Enter" && chatInput.trim()) {
                  sendMessage(chatInput.trim(), [])
                  setChatInput("")
                }
              }}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
            />
            <Button 
              onClick={() => {
                if (chatInput.trim()) {
                  sendMessage(chatInput.trim(), [])
                  setChatInput("")
                }
              }}
              className="bg-white/40 hover:bg-white/50 text-white rounded-xl p-2 sm:p-2.5 border border-white/60 hover:border-white/80 transition-all duration-300 flex-shrink-0" 
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ChatPanel() {
  const [view, setView] = useState<"landing" | "chat">("landing")
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const { messages, sendMessage, clearMessages, reloadSystemPrompt } = useChatStore()

  const handleCategorySelect = async (category: string) => {
    setView("chat")
    await sendMessage(`Tell me about ${category.toLowerCase()}`)
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return
    setInputValue("")
    setView("chat")
    await sendMessage(message)
  }

  const handleBack = () => {
    setView("landing")
    clearMessages()
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto p-4 relative">
      {/* Background dimming overlay when chat is active */}
      {view === "chat" && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-0" />
      )}
      
      {/* Back Button */}
      <div className="flex justify-start mb-4 relative z-10">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="text-white hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Main
        </Button>
      </div>

      {view === "landing" ? (
        <LandingView onCategorySelect={handleCategorySelect} onSendMessage={handleSendMessage} />
      ) : (
        <ChatView onBack={handleBack} onReloadSystemPrompt={reloadSystemPrompt} />
      )}
    </div>
  )
}


