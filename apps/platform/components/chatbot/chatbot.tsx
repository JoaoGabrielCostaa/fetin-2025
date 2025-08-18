"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircle, X, Send, Minimize2 } from "lucide-react"

const messageSchema = z.object({
  message: z.string().min(1, "Mensagem não pode estar vazia"),
})

type MessageFormData = z.infer<typeof messageSchema>

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Olá, tudo bem? Somos da DonAi, nosso sistema de doação é simples, você pesquisa uma causa ou pode ver todas as causas disponíveis. Quer que eu te ajude a clicar em Doar que está feito!",
      sender: "bot",
      timestamp: new Date(),
    },
  ])

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
  })

  const onSubmitMessage = async (data: MessageFormData) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: data.message,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    reset()

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Obrigado pela sua mensagem! Nossa equipe irá analisar e responder em breve.",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
        size="icon"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    )
  }

  return (
    <Card className={`fixed bottom-6 right-6 w-80 shadow-xl ${isMinimized ? "h-14" : "h-96"} transition-all`}>
      <CardHeader className="p-4 bg-blue-600 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>CB</AvatarFallback>
            </Avatar>
            <CardTitle className="text-sm">ChatBot</CardTitle>
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 text-white hover:bg-blue-700"
              onClick={() => setIsMinimized(!isMinimized)}
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-6 h-6 text-white hover:bg-blue-700"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      {!isMinimized && (
        <CardContent className="p-0 flex flex-col h-80">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs p-3 rounded-lg text-sm ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900 border border-gray-200"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <form onSubmit={handleSubmit(onSubmitMessage)} className="flex space-x-2">
              <Input
                placeholder="Digite sua mensagem"
                className="flex-1"
                {...register("message")}
                disabled={isSubmitting}
              />
              <Button type="submit" size="icon" disabled={isSubmitting}>
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
