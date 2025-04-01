"use client"

import { UserAvatar } from "@/components/user-avatar"
import { Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import type { TabType } from "@/components/mobile-app"

interface AppHeaderProps {
  username?: string
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

export function AppHeader({
  username = "John Doe",
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}: AppHeaderProps) {
  // In a real app, this would come from authentication
  const [user] = useState({
    name: username,
    image: "/placeholder.svg?height=40&width=40&text=TA",
  })

  return (
    <header className="sticky top-0 z-10 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <div className="ml-3 font-semibold text-sm">
            {activeTab === "home" && "Home"}
            {activeTab === "reports" && "Traffic Reports"}
            {activeTab === "violations" && "Violation Log"}
            {activeTab === "camera" && "Live Camera Feed"}
            {activeTab === "settings" && "Settings"}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
              <Bell className="h-5 w-5" />
            </Button>
            <span className="absolute top-1 right-1.5 flex h-2 w-2 rounded-full bg-red-500">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </div>
          <UserAvatar user={user} className="h-8 w-8 cursor-pointer transition-opacity hover:opacity-80" />
        </div>
      </div>
    </header>
  )
}

