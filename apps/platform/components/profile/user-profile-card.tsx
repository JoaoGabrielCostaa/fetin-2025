import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit2 } from "lucide-react"
import Link from "next/link"

interface UserProfileCardProps {
  user: {
    id: string
    name: string
    role: string
    avatar: string
  }
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-donai-primary-400 to-donai-primary-700 rounded-full transform scale-110"></div>
            <Avatar className="relative w-20 h-20 border-4 border-white">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-lg font-semibold">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          <h3 className="font-semibold text-lg text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500 mb-4">{user.role}</p>

          <Link href={`/profile/${user.id}`}>
            <Button variant="outline" size="sm" className="w-full bg-transparent">
              <Edit2 className="w-4 h-4 mr-2" />
              Editar seu perfil
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
