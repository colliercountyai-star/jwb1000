export type Role = "system" | "user" | "assistant"

export type ChatMessage = {
  id: string
  role: Role
  content: string
  createdAt: number
  files?: FileMeta[]
  isStreaming?: boolean
  error?: string
}

export type FileMeta = {
  id: string
  name: string
  type: string
  size: number
  file?: File
}

export type ChatState = {
  messages: ChatMessage[]
  systemPrompt: string
  isLoading: boolean
  error: string | null
}

export type ChatActions = {
  sendMessage: (content: string, files?: FileMeta[]) => Promise<void>
  receiveMessage: (content: string) => void
  setSystemPrompt: (prompt: string) => void
  removeMessage: (id: string) => void
  retryLastMessage: () => Promise<void>
  clearMessages: () => void
  updateStreamingMessage: (content: string) => void
  setError: (error: string | null) => void
  setLoading: (loading: boolean) => void
  reloadSystemPrompt: () => void
}
