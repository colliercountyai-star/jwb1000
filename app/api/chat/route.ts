import { NextRequest, NextResponse } from 'next/server'
import { JWB_GRILL_MENU } from '@/lib/chat/config'

export async function POST(request: NextRequest) {
  try {
    console.log('Chat API called')
    
    const { messages, systemPrompt, files } = await request.json()
    console.log('Request data:', { messages, systemPrompt, files })

    // Check for API key
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error('OpenAI API key not configured')
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.' },
        { status: 500 }
      )
    }

    // Prepare messages for OpenAI API
    const openAIMessages = [
      { role: 'system', content: systemPrompt || JWB_GRILL_MENU },
      ...messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content,
      }))
    ]

    console.log('Sending to OpenAI:', { model: process.env.OPENAI_MODEL || 'gpt-4o', messageCount: openAIMessages.length })

    // Call OpenAI API
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
              body: JSON.stringify({
          model: process.env.OPENAI_MODEL || 'gpt-4o',
          messages: openAIMessages,
          stream: true,
          temperature: 0.5,
          max_tokens: 800,
          presence_penalty: 0.1,
          frequency_penalty: 0.1,
        }),
    })

    if (!openAIResponse.ok) {
      const errorData = await openAIResponse.json().catch(() => ({}))
      console.error('OpenAI API error:', openAIResponse.status, errorData)
      return NextResponse.json(
        { error: 'Failed to get response from OpenAI', details: errorData },
        { status: openAIResponse.status }
      )
    }

    // Create a streaming response with optimized handling
    const stream = new ReadableStream({
      async start(controller) {
        const reader = openAIResponse.body?.getReader()
        if (!reader) {
          controller.close()
          return
        }

        try {
          while (true) {
            const { done, value } = await reader.read()
            
            if (done) {
              controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
              break
            }

            const chunk = new TextDecoder().decode(value)
            const lines = chunk.split('\n')

            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6)
                if (data === '[DONE]') {
                  controller.enqueue(new TextEncoder().encode('data: [DONE]\n\n'))
                  break
                }

                try {
                  const parsed = JSON.parse(data)
                  if (parsed.choices?.[0]?.delta?.content) {
                    const content = parsed.choices[0].delta.content
                    // Send content immediately without additional processing
                    controller.enqueue(new TextEncoder().encode(`data: ${JSON.stringify({
                      choices: [{ delta: { content } }]
                    })}\n\n`))
                  }
                } catch (e) {
                  // Skip invalid JSON and continue immediately
                  continue
                }
              }
            }
          }
        } catch (error) {
          console.error('Streaming error:', error)
          controller.error(error)
        } finally {
          reader.releaseLock()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'X-Response-Time': 'optimized',
      },
    })

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
