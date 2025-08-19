"use client"

import { Header } from "@/components/layout/header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Calendar, Users, Globe, Mail, Phone, Heart, UserPlus } from "lucide-react"
import { mockOngs } from "@/lib/constants/mock-data"
import Image from "next/image"

interface OngPageProps {
  params: {
    id: string
  }
}

export default function OngPage({ params }: OngPageProps) {
  const ong = mockOngs.find((o) => o.id === params.id)

  if (!ong) {
    return <div>ONG não encontrada</div>
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Banner */}
        <div className="relative h-48 md:h-64 rounded-lg overflow-hidden mb-8">
          <Image src={ong.banner || "/placeholder.svg"} alt={`Banner da ${ong.name}`} fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>

        {/* Profile Header */}
        <Card className="mb-8 -mt-20 relative z-10">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                <AvatarImage src={ong.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl font-semibold">
                  {ong.name.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{ong.name}</h1>
                    <Badge variant="secondary" className="mt-2">
                      {ong.category}
                    </Badge>
                  </div>

                  <div className="flex gap-3 mt-4 md:mt-0">
                    <Button variant="outline">
                      <Heart className="w-4 h-4 mr-2" />
                      Seguir
                    </Button>
                    <Button>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Ser Voluntário
                    </Button>
                  </div>
                </div>

                <p className="text-gray-700 mb-4 text-lg">{ong.description}</p>

                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {ong.location}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Fundada em {ong.foundedYear}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {ong.volunteers} voluntários
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mission */}
            <Card>
              <CardHeader>
                <CardTitle>Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{ong.mission}</p>
              </CardContent>
            </Card>

            {/* Projects */}
            <Card>
              <CardHeader>
                <CardTitle>Projetos Ativos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {ong.projects.map((project, index) => (
                    <div key={project.id}>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{project.title}</h3>
                          <p className="text-gray-600 mt-1">{project.description}</p>

                          <div className="flex items-center gap-4 mt-3">
                            <Badge variant={project.status === "Em andamento" ? "default" : "secondary"}>
                              {project.status}
                            </Badge>

                            {project.volunteersNeeded > 0 && (
                              <span className="text-sm text-gray-600">
                                {project.volunteersNeeded} voluntários necessários
                              </span>
                            )}
                          </div>
                        </div>

                        {project.volunteersNeeded > 0 && (
                          <Button size="sm" className="ml-4">
                            Participar
                          </Button>
                        )}
                      </div>

                      {index < ong.projects.length - 1 && <Separator className="mt-6" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Impacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{ong.volunteers}</div>
                  <div className="text-sm text-gray-600">Voluntários Ativos</div>
                </div>

                <Separator />

                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{ong.beneficiaries}</div>
                  <div className="text-sm text-gray-600">Pessoas Beneficiadas</div>
                </div>

                <Separator />

                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{ong.projects.length}</div>
                  <div className="text-sm text-gray-600">Projetos Ativos</div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contato</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="w-4 h-4 text-gray-500" />
                  <a href={`mailto:${ong.contact.email}`} className="text-sm text-blue-600 hover:underline">
                    {ong.contact.email}
                  </a>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{ong.contact.phone}</span>
                </div>

                <div className="flex items-center space-x-3">
                  <Globe className="w-4 h-4 text-gray-500" />
                  <a
                    href={ong.contact.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Website
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
  )
}
