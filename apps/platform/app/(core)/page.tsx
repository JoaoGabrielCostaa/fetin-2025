"use client"

import { useState } from "react"
import { SidebarLeft } from "@/components/layout/sidebar-left"
import { SidebarRight } from "@/components/layout/sidebar-right"
import { FeedContent } from "@/components/feed/feed-content"
import { NotificationsContent } from "@/components/notifications/notifications-content"
import { SettingsContent } from "@/components/settings/settings-content"

export default function DonAiPlatform() {
  const [activeSection, setActiveSection] = useState("feed")

  const renderMainContent = () => {
    switch (activeSection) {
      case "notifications":
        return <NotificationsContent />
      case "settings":
        return <SettingsContent />
      default:
        return <FeedContent />
    }
  }

  return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Esquerda */}
          <div className="lg:col-span-1">
            <SidebarLeft activeSection={activeSection} onSectionChange={setActiveSection} />
          </div>

          {/* Feed Central */}
          <div className="lg:col-span-2">{renderMainContent()}</div>

          {/* Sidebar Direita */}
          <div className="lg:col-span-1">
            <SidebarRight />
          </div>
        </div>
  )
}
