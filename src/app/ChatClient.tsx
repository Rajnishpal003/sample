'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { ScrollArea } from "../components/ui/scroll-area"
import { trpc } from '../trpc'

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface Props {
  session: any // Replace with your Auth0 session type if you want
}

export default function ChatClient({ session }: Props) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  const sendMessage = trpc.chat.sendMessage.useMutation()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() === '') return

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    }

    setMessages(prev => [...prev, newUserMessage])
    setInput('')
    setIsTyping(true)

    sendMessage.mutate(input, {
      onSuccess: (data) => {
        const assistantResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
        }
        setMessages(prev => [...prev, assistantResponse])
        setIsTyping(false)
      },
      onError: () => {
        const errorResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: 'Sorry, something went wrong!',
        }
        setMessages(prev => [...prev, errorResponse])
        setIsTyping(false)
      },
    })
  }

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, isTyping])

  if (!session) {
    return (
      <main className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Welcome</h1>
        <p className="mb-8 text-gray-600">Please log in or create an account to continue</p>
        <div className="flex flex-col gap-4">
          <a href="/auth/login?screen_hint=signup">
            <button className="w-full bg-blue-200 hover:bg-blue-300 text-gray-800 font-semibold py-2 px-4 rounded">
              Sign Up
            </button>
          </a>
          <a href="/auth/login">
            <button className="w-full bg-blue-200 hover:bg-blue-300 text-gray-800 font-semibold py-2 px-4 rounded">
              Log In
            </button>
          </a>
        </div>
      </div>
    </main>
    )
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md mx-auto flex flex-col h-[90vh] md:h-[80vh] shadow-lg rounded-lg">
        <CardHeader className="border-b dark:border-gray-700 flex items-center justify-between px-4 py-2">
  <CardTitle className="text-xl font-bold dark:text-white">Hi, {session.user.name}</CardTitle>
  <a href="/auth/logout">
    <Button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
      Logout
    </Button>
  </a>
</CardHeader>

        <CardContent className="flex-1 overflow-hidden p-4">
          <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                Start a conversation!
              </div>
            )}
            {messages.map(m => (
              <div key={m.id} className={`mb-4 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-3 rounded-xl max-w-[80%] ${
                  m.role === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-bl-none'
                }`}>
                  {m.content}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="text-left mb-4">
                <span className="inline-block p-3 rounded-xl bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white rounded-bl-none">
                  AI is typing...
                </span>
              </div>
            )}
          </ScrollArea>
        </CardContent>
        <CardFooter className="border-t dark:border-gray-700 p-4">
          <form onSubmit={handleSubmit} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={handleInputChange}
              placeholder="Type your message..."
              className="flex-grow rounded-lg border dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:ring-blue-500 focus:border-blue-500"
              disabled={isTyping}
            />
            <Button type="submit" disabled={isTyping} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              Send
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
