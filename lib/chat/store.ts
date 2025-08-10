import { create } from "zustand"
import { JWB_GRILL_MENU } from "./config"
import { persist } from "zustand/middleware"
import type { ChatMessage, ChatState, ChatActions, FileMeta } from "./types"
import { postChat } from "./api"

const STORAGE_KEY = "chat-store-v2"
const MAX_CONTEXT_MESSAGES = 10

type ChatStore = ChatState & ChatActions

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => {
      console.log('DEBUG - Store initializing with JWB_GRILL_MENU:', JWB_GRILL_MENU)
      console.log('DEBUG - Store initializing with JWB_GRILL_MENU length:', JWB_GRILL_MENU.length)
      
      return {
        // State
        messages: [],
        systemPrompt: JWB_GRILL_MENU,
        isLoading: false,
        error: null,

        // Actions
        sendMessage: async (content: string, files?: FileMeta[]) => {
          const { messages, systemPrompt } = get()
          
          console.log('DEBUG - Store systemPrompt:', systemPrompt)
          console.log('DEBUG - Store systemPrompt length:', systemPrompt.length)

          // Create user message
          const userMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content,
            createdAt: Date.now(),
            files,
          }

          // Add user message and create streaming assistant message
          const assistantMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content: "",
            createdAt: Date.now(),
            isStreaming: true,
          }

          set({
            messages: [...messages, userMessage, assistantMessage],
            isLoading: true,
            error: null,
          })

          try {
            // Get recent messages for context
            const contextMessages = [...messages, userMessage].slice(-MAX_CONTEXT_MESSAGES)

            await postChat({
              messages: contextMessages,
              systemPrompt,
              files,
              onToken: (chunk: string) => {
                get().updateStreamingMessage(chunk)
              },
            })

            // Mark streaming as complete
            set((state) => ({
              messages: state.messages.map((msg) =>
                msg.id === assistantMessage.id ? { ...msg, isStreaming: false } : msg,
              ),
              isLoading: false,
            }))
          } catch (error) {
            console.error("Chat error:", error)
            set((state) => ({
              messages: state.messages.map((msg) =>
                msg.id === assistantMessage.id
                  ? { ...msg, error: "Failed to get response. Please try again.", isStreaming: false }
                  : msg,
              ),
              isLoading: false,
              error: "Failed to send message",
            }))
          }
        },

        receiveMessage: (content: string) => {
          const { messages } = get()
          const newMessage: ChatMessage = {
            id: crypto.randomUUID(),
            role: "assistant",
            content,
            createdAt: Date.now(),
          }
          set({ messages: [...messages, newMessage] })
        },

        updateStreamingMessage: (chunk: string) => {
          set((state) => ({
            messages: state.messages.map((msg) => (msg.isStreaming ? { ...msg, content: msg.content + chunk } : msg)),
          }))
        },

        setSystemPrompt: (prompt: string) => {
          set({ systemPrompt: prompt })
        },

        removeMessage: (id: string) => {
          set((state) => ({
            messages: state.messages.filter((msg) => msg.id !== id),
          }))
        },

        retryLastMessage: async () => {
          const { messages } = get()
          const lastUserMessage = [...messages].reverse().find((msg) => msg.role === "user")

          if (lastUserMessage) {
            // Remove any assistant messages after the last user message
            const userMessageIndex = messages.findIndex((msg) => msg.id === lastUserMessage.id)
            const filteredMessages = messages.slice(0, userMessageIndex + 1)

            set({ messages: filteredMessages })

            // Resend the message
            await get().sendMessage(lastUserMessage.content, lastUserMessage.files)
          }
        },

        clearMessages: () => {
          set({ messages: [], error: null })
        },

        setError: (error: string | null) => {
          set({ error })
        },

        setLoading: (loading: boolean) => {
          set({ isLoading: loading })
        },

        // Force reload the system prompt from config (useful after config updates)
        reloadSystemPrompt: () => {
          set({ systemPrompt: JWB_GRILL_MENU })
        },
      }
    },
    {
      name: STORAGE_KEY,
      partialize: (state) => ({
        messages: state.messages,
        systemPrompt: state.systemPrompt,
      }),
    },
  ),
)
