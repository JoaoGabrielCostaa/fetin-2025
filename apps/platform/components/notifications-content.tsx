import { Check, Heart, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function NotificationsContent() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Central de Notificações</h2>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Nova doação recebida</p>
                <p className="text-sm text-gray-600 mt-1">
                  Jane Cooper fez uma doação de R$ 50 para a causa "Mão Amiga"
                </p>
                <p className="text-xs text-gray-500 mt-2">há 2 horas</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Check className="w-4 h-4 text-green-500 mt-1" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Comentário respondido</p>
                <p className="text-sm text-gray-600 mt-1">
                  Devon Lane respondeu ao seu comentário no post sobre educação
                </p>
                <p className="text-xs text-gray-500 mt-2">há 5 horas</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <Heart className="w-4 h-4 text-red-500 mt-1" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Novo seguidor</p>
                <p className="text-sm text-gray-600 mt-1">Maria Silva começou a seguir suas atividades</p>
                <p className="text-xs text-gray-500 mt-2">há 1 dia</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
              <MessageCircle className="w-4 h-4 text-blue-500 mt-1" />
              <div className="flex-1">
                <p className="font-medium text-gray-900">Mensagem da ONG</p>
                <p className="text-sm text-gray-600 mt-1">
                  Digital Freelancers Group enviou uma atualização sobre o projeto
                </p>
                <p className="text-xs text-gray-500 mt-2">há 2 dias</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
