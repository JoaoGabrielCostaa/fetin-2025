import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users } from "lucide-react"
import Link from "next/link"

interface OngCardProps {
  ong: {
    id: string
    name: string
    description: string
    category: string
    location: string
    volunteers: number
    avatar: string
  }
}

export function OngCard({ ong }: OngCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <Avatar className="w-12 h-12">
            <AvatarImage src={ong.avatar || "/placeholder.svg"} />
            <AvatarFallback>{ong.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <Link href={`/ong/${ong.id}`} className="hover:text-blue-600">
              <h4 className="font-semibold text-sm text-gray-900 truncate">{ong.name}</h4>
            </Link>

            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{ong.description}</p>

            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {ong.category}
              </Badge>
            </div>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center text-xs text-gray-500">
                <Users className="w-3 h-3 mr-1" />
                {ong.volunteers} voluntários
              </div>

              <Link href={`/ong/${ong.id}`}>
                <Button size="sm" variant="outline" className="text-xs h-7 bg-transparent">
                  Ver perfil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
