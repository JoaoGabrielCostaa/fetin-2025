"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { RssIcon as Feed, Bell, Settings, LogOut, Users } from "lucide-react"
import { UserProfileCard } from "@/components/profile/user-profile-card"
import { mockUsers } from "@/lib/constants/mock-data"

interface SidebarLeftProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function SidebarLeft({ activeSection, onSectionChange }: SidebarLeftProps) {
  const currentUser = mockUsers[0] // Mock current user

  const menuItems = [
    { id: "feed", label: "Feed de Causas", icon: Feed },
    { id: "notifications", label: "Notificações", icon: Bell, hasNotification: true },
    { id: "settings", label: "Configurações", icon: Settings },
    { id: "sair", label: "Sair", icon: LogOut },
  ]

  return (
    <div className="w-80 space-y-6">
      <UserProfileCard user={currentUser} />

      <Card>
        <CardContent className="p-4">
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className="w-full justify-start relative cursor-pointer"
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                  {item.hasNotification && <div className="absolute right-3 w-2 h-2 bg-red-500 rounded-full" />}
                </Button>
              )
            })}
          </nav>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-4 h-4 mr-2" />
            ONGs que ajudo
          </h3>

          <div className="space-y-3">
            {currentUser.ongsParticipating.map((ong) => (
              <div key={ong.id} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-gray-600">{ong.name.substring(0, 2).toUpperCase()}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{ong.name}</p>
                  <p className="text-xs text-gray-500">{ong.role}</p>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <Button variant="outline" size="sm" className="w-full bg-transparent">
            ver mais
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
