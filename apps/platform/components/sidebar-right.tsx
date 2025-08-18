import { Heart, Users, Target, Award } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function SidebarRight() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">ONGs em Destaque</h3>
            <Badge variant="secondary" className="bg-blue-100 text-blue-700">
              Recomendadas
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="space-y-4">
            <div className="group p-3 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer">
              <div className="flex items-start space-x-3">
                <Avatar className="w-12 h-12 ring-2 ring-blue-100">
                  <AvatarImage src="/design-inspiration-collage.png" />
                  <AvatarFallback>EC</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900 group-hover:text-blue-700">
                    Educação para Crianças
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">Transformando vidas através da educação</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-gray-500">2.3k apoiadores</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-500">85% da meta</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-xs">
                Apoiar Causa
              </Button>
            </div>

            <div className="group p-3 rounded-lg border border-gray-100 hover:border-green-200 hover:bg-green-50/30 transition-all cursor-pointer">
              <div className="flex items-start space-x-3">
                <Avatar className="w-12 h-12 ring-2 ring-green-100">
                  <AvatarImage src="/hr-advice.png" />
                  <AvatarFallback>MA</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900 group-hover:text-green-700">
                    Meio Ambiente Sustentável
                  </h4>
                  <p className="text-xs text-gray-500 mt-1">Preservando nosso planeta para o futuro</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center space-x-1">
                      <Users className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-gray-500">1.8k voluntários</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-3 h-3 text-yellow-500" />
                      <span className="text-xs text-gray-500">Certificada</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                className="w-full mt-3 border-green-200 text-green-700 hover:bg-green-50 text-xs bg-transparent"
              >
                Ser Voluntário
              </Button>
            </div>

            <div className="group p-3 rounded-lg border border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 transition-all cursor-pointer">
              <div className="flex items-start space-x-3">
                <Avatar className="w-12 h-12 ring-2 ring-purple-100">
                  <AvatarImage src="/usability-testing-session.png" />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium text-sm text-gray-900 group-hover:text-purple-700">Assistência Social</h4>
                  <p className="text-xs text-gray-500 mt-1">Apoio a famílias em situação de vulnerabilidade</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="flex items-center space-x-1">
                      <Heart className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-gray-500">5.1k doações</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-500">Meta atingida</span>
                    </div>
                  </div>
                </div>
              </div>
              <Button size="sm" className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-xs">
                Doar Agora
              </Button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
            <div className="text-center">
              <h4 className="font-medium text-sm text-gray-900 mb-1">Impacto Coletivo</h4>
              <p className="text-xs text-gray-600 mb-2">Juntos já arrecadamos</p>
              <p className="text-lg font-bold text-blue-600">R$ 127.450</p>
              <p className="text-xs text-gray-500">para 23 causas este mês</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
