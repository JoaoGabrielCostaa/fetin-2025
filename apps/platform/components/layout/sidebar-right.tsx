"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { OngCard } from "@/components/profile/ong-card"
import { mockOngs } from "@/lib/constants/mock-data"

export function SidebarRight() {
  return (
    <div className="w-80 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">ONGs para ajudar</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockOngs.map((ong) => (
            <OngCard key={ong.id} ong={ong} />
          ))}

          <Button
            className="w-full mt-4"
          >
            Quero me voluntariar
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
