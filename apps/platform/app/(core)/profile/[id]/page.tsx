"use client"

import { Header } from "@/components/layout/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Clock, Heart, Users, Edit2 } from "lucide-react"
import { mockUsers } from "@/lib/constants/mock-data"
import Link from "next/link"

interface ProfilePageProps {
  params: {
    id: string
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const user = mockUsers.find((u) => u.id === params.id)

  if (!user) {
    return <div>Usuário não encontrado</div>
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full transform scale-110"></div>
                <Avatar className="relative w-24 h-24 border-4 border-white">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-2xl font-semibold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                    <p className="text-lg text-gray-600">{user.role}</p>
                  </div>

                  <Button className="mt-4 md:mt-0">
                    <Edit2 className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                </div>

                <p className="text-gray-700 mb-4">{user.bio}</p>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {user.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Membro desde{" "}
                    {new Date(user.joinedDate).toLocaleDateString("pt-BR", {
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Estatísticas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm text-gray-600">Horas de voluntariado</span>
                  </div>
                  <span className="font-semibold">{user.stats.horasVoluntariado}h</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Heart className="w-4 h-4 mr-2 text-red-500" />
                    <span className="text-sm text-gray-600">Doações feitas</span>
                  </div>
                  <span className="font-semibold">{user.stats.doacoesFeitas}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm text-gray-600">ONGs ajudadas</span>
                  </div>
                  <span className="font-semibold">{user.stats.ongsAjudadas}</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ONGs Participando */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ONGs que Participo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user.ongsParticipating.map((ong, index) => (
                    <div key={ong.id}>
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={ong.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{ong.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <Link href={`/ong/${ong.id}`} className="hover:text-blue-600">
                              <h3 className="font-semibold text-gray-900">{ong.name}</h3>
                            </Link>
                            <Badge variant="secondary">{ong.role}</Badge>
                          </div>

                          <p className="text-sm text-gray-600 mt-1">
                            Participando desde{" "}
                            {new Date(ong.joinedDate).toLocaleDateString("pt-BR", {
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>

                      {index < user.ongsParticipating.length - 1 && <Separator className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}
