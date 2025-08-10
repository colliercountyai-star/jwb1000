import type { ChatMessage, FileMeta } from "./types"

interface PostChatParams {
  messages: ChatMessage[]
  systemPrompt: string
  files?: FileMeta[]
  onToken: (chunk: string) => void
}

export async function postChat({ messages, systemPrompt, files, onToken }: PostChatParams): Promise<void> {
  console.log('DEBUG - API postChat systemPrompt:', systemPrompt)
  console.log('DEBUG - API postChat systemPrompt length:', systemPrompt.length)
  
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      systemPrompt,
      files: files?.map((f) => ({
        name: f.name,
        type: f.type,
        size: f.size,
      })),
    }),
  })

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error("No response body")
  }

  const decoder = new TextDecoder()

  try {
    while (true) {
      const { done, value } = await reader.read()

      if (done) break

      const chunk = decoder.decode(value, { stream: true })
      const lines = chunk.split("\n")

      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6)
          if (data === "[DONE]") {
            return
          }

          try {
            const parsed = JSON.parse(data)
            if (parsed.choices?.[0]?.delta?.content) {
              onToken(parsed.choices[0].delta.content)
            }
          } catch (e) {
            // Skip invalid JSON
            continue
          }
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}
