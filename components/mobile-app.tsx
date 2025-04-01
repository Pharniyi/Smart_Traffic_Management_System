"use client"

import { useState } from "react"
import { HomeScreen } from "@/components/screens/home-screen"
import { ReportsScreen } from "@/components/screens/reports-screen"
import { ViolationLogScreen } from "@/components/screens/violation-log-screen"
import { LiveCameraScreen } from "@/components/screens/live-camera-screen"
import { SettingsScreen } from "@/components/screens/settings-screen"
import { AppHeader } from "@/components/app-header"
import { MobileSidebar } from "@/components/mobile-sidebar"

export type TabType = "home" | "reports" | "violations" | "camera" | "settings"

export function MobileApp() {
  const [activeTab, setActiveTab] = useState<TabType>("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex flex-col h-full bg-background">
      <AppHeader
        username="Traffic Admin"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <MobileSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <main className="flex-1 overflow-auto">
        {activeTab === "home" && <HomeScreen />}
        {activeTab === "reports" && <ReportsScreen />}
        {activeTab === "violations" && <ViolationLogScreen />}
        {activeTab === "camera" && <LiveCameraScreen />}
        {activeTab === "settings" && <SettingsScreen />}
      </main>
    </div>
  )
}

