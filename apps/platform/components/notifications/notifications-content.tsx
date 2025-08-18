import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, UserPlus, Gift } from "lucide-react"

export function NotificationsContent() {
  const notifications = [
    {
      id: "1",
      type: "like",
      user: { name: "Maria Silva", avatar: "/placeholder.svg?height=32&width=32" },
      action: "curtiu seu post sobre arrecadação de livros",
      time: "2 min atrás",
      unread: true,
    },
    {
      id: "2",
      type: "comment",
      user: { name: "João Santos", avatar: "/placeholder.svg?height=32&width=32" },
      action: "comentou no seu post",
      content: "Que iniciativa incrível! Como posso ajudar?",
      time: "5 min atrás",
      unread: true,
    },
    {
      id: "3",
      type: "follow",
      user: { name: "Ana Costa", avatar: "/placeholder.svg?height=32&width=32" },
      action: "começou a seguir você",
      time: "1h atrás",
      unread: false,
    },
    {
      id: "4",
      type: "donation",
      user: { name: "Carlos Oliveira", avatar: "/placeholder.svg?height=32&width=32" },
      action: "fez uma doação para sua causa",
      amount: "R$ 50,00",
      time: "2h atrás",
      unread: false,
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "like":
        return <Heart className="w-4 h-4 text-red-500" />
      case "comment":
        return <MessageCircle className="w-4 h-4 text-blue-500" />
      case "follow":
        return <UserPlus className="w-4 h-4 text-green-500" />
      case "donation":
        return <Gift className="w-4 h-4 text-purple-500" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Notificações
            <Button variant="ghost" size="sm">
              Marcar todas como lidas
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`flex items-start space-x-3 p-3 rounded-lg ${
                notification.unread ? "bg-blue-50 border border-blue-100" : "hover:bg-gray-50"
              }`}
            >
              <Avatar className="w-10 h-10">
                <AvatarImage src={notification.user.avatar || "/placeholder.svg"} />
                <AvatarFallback>{notification.user.name.substring(0, 2)}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  {getIcon(notification.type)}
                  <p className="text-sm">
                    <span className="font-medium">{notification.user.name}</span>{" "}
                    <span className="text-gray-600">{notification.action}</span>
                  </p>
                  {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full" />}
                </div>

                {notification.content && <p className="text-sm text-gray-600 mt-1 italic">"{notification.content}"</p>}

                {notification.amount && (
                  <Badge variant="secondary" className="mt-1">
                    {notification.amount}
                  </Badge>
                )}

                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
