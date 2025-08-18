"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { MessageCircle, Send, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { chatSchema, type ChatForm } from "@/types"

export function ChatBot() {
  const [showChat, setShowChat] = useState(false)

  const chatForm = useForm<ChatForm>({
    resolver: zodResolver(chatSchema),
    defaultValues: {
      message: "",
    },
  })

  const onSubmitChat = (data: ChatForm) => {
    console.log("Mensagem enviada:", data)
    chatForm.reset()
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {showChat ? (
        <Card className="w-80 h-[600px] shadow-xl py-0">
          <CardHeader className="bg-gradient-to-t from-donai-primary-800 to-donai-primary-400 text-white rounded-t-lg pt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback>CB</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">ChatBot</h4>
                  <p className="text-xs opacity-90">Online</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChat(false)}
                className="text-white hover:bg-blue-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 h-64 overflow-y-auto flex-1">
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback>CB</AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Como funciona o sistema de Doação?</p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback>CB</AvatarFallback>
                </Avatar>
                <div className="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                  <p className="text-sm">
                    Olá, tudo bem? Somos da DonAi, nosso sistema de doação é simples: você pesquisa uma causa ou pode
                    ver todas as causas disponíveis e clicar em Doar que está feito!
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="/placeholder.svg?height=24&width=24" />
                  <AvatarFallback>CB</AvatarFallback>
                </Avatar>
                <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Como faço para verificar o mapa de doações?</p>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t">
            <form onSubmit={chatForm.handleSubmit(onSubmitChat)} className="flex space-x-2">
              <Input placeholder="Digite sua mensagem" {...chatForm.register("message")} className="flex-1" />
              <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Send className="w-4 h-4" />
              </Button>
            </form>
            {chatForm.formState.errors.message && (
              <p className="text-xs text-red-600 mt-1">{chatForm.formState.errors.message.message}</p>
            )}
          </div>
        </Card>
      ) : (
        <Button
          onClick={() => setShowChat(true)}
          className="bg-blue-600 hover:bg-blue-700 rounded-full w-14 h-14 shadow-lg"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}
    </div>
  )
}
