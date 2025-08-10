# JWB1000 - Margaritaville AI Chatbot

A Next.js-based AI chatbot for Jimmy Buffett's Margaritaville restaurant, powered by OpenAI's GPT-4o.

## Features

- 🤖 AI-powered chat interface using GPT-4o
- 🍽️ Specialized knowledge about Margaritaville dining
- 💬 Real-time streaming chat responses
- 🎨 Beautiful tropical-themed UI
- 📱 Responsive design for all devices
- 🔄 Message history and conversation management

## Setup

### 1. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 2. Configure OpenAI API

1. Get your OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a `.env.local` file in the root directory:

```env
OPENAI_API_KEY=your_actual_api_key_here
OPENAI_MODEL=gpt-4o
DEFAULT_SYSTEM_PROMPT=You are Jimmy, a friendly and knowledgeable AI assistant for Jimmy Buffett's Margaritaville restaurant. You help customers discover the perfect Gulf Coast fine dining experience, recommend menu items, suggest wine pairings, and provide a warm, island-style welcome. Always be helpful, enthusiastic, and maintain the Margaritaville spirit.
```

### 3. Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `OPENAI_API_KEY` | Your OpenAI API key (required) | - |
| `OPENAI_MODEL` | OpenAI model to use | `gpt-4o` |
| `DEFAULT_SYSTEM_PROMPT` | Default system prompt for the AI | Margaritaville-specific prompt |

## Usage

1. **Landing Page**: Choose from predefined dining categories or ask a custom question
2. **Chat Interface**: Interact with Jimmy, the AI assistant
3. **Message Actions**: Copy, regenerate, edit, or delete messages
4. **File Attachments**: Support for file uploads (future feature)

## API Endpoints

- `POST /api/chat` - Main chat endpoint that streams responses from OpenAI
- `OPTIONS /api/chat` - CORS preflight request

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **State Management**: Zustand
- **AI**: OpenAI GPT-4o API
- **Streaming**: Server-Sent Events (SSE)

## Troubleshooting

### API Key Issues
- Ensure your `.env.local` file exists and contains the correct API key
- Verify your OpenAI API key is valid and has sufficient credits
- Check the browser console and server logs for error messages

### Streaming Issues
- The chat uses streaming responses for real-time interaction
- If streaming fails, the app will fall back to error handling
- Check network connectivity and OpenAI API status

## License

This project is for demonstration purposes. Please ensure compliance with OpenAI's usage policies and terms of service.
