"use client"

import type React from "react"

import { Home, BarChart2, AlertTriangle, Camera, Settings, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { TabType } from "@/components/mobile-app"

interface MobileSidebarProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

export function MobileSidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: MobileSidebarProps) {
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab)
    setIsOpen(false)
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" onClick={() => setIsOpen(false)} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 w-[280px] bg-background border-r shadow-lg z-50 transition-transform duration-300 ease-in-out transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              <h2 className="text-lg font-bold text-primary">TM Smart Traffic</h2>
              <p className="text-xs text-muted-foreground mt-1">Traffic Monitoring System</p>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex-1 overflow-auto py-2">
            <nav className="px-2">
              <ul className="space-y-1">
                <NavItem
                  icon={<Home size={20} />}
                  label="Home"
                  description="Traffic density & violations"
                  isActive={activeTab === "home"}
                  onClick={() => handleTabChange("home")}
                />
                <NavItem
                  icon={<BarChart2 size={20} />}
                  label="Traffic Reports"
                  description="View historical data & trends"
                  isActive={activeTab === "reports"}
                  onClick={() => handleTabChange("reports")}
                />
                <NavItem
                  icon={<AlertTriangle size={20} />}
                  label="Violation Log"
                  description="Speed limit violations"
                  isActive={activeTab === "violations"}
                  onClick={() => handleTabChange("violations")}
                />
                <NavItem
                  icon={<Camera size={20} />}
                  label="Live Camera Feed"
                  description="Monitor traffic cameras"
                  isActive={activeTab === "camera"}
                  onClick={() => handleTabChange("camera")}
                />
                <NavItem
                  icon={<Settings size={20} />}
                  label="Settings"
                  description="Configure app preferences"
                  isActive={activeTab === "settings"}
                  onClick={() => handleTabChange("settings")}
                />
              </ul>
            </nav>
          </div>

          <div className="border-t p-4">
            <div className="text-xs text-muted-foreground">© 2023 TM Smart Traffic</div>
          </div>
        </div>
      </div>
    </>
  )
}

interface NavItemProps {
  icon: React.ReactNode
  label: string
  description?: string
  isActive: boolean
  onClick: () => void
}

function NavItem({ icon, label, description, isActive, onClick }: NavItemProps) {
  return (
    <li>
      <button
        className={cn(
          "flex items-center w-full gap-3 rounded-md px-3 py-3 text-sm transition-colors",
          isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted",
        )}
        onClick={onClick}
      >
        <div
          className={cn("flex items-center justify-center h-9 w-9 rounded-md", isActive ? "bg-primary/20" : "bg-muted")}
        >
          {icon}
        </div>
        <div className="text-left">
          <div className="font-medium">{label}</div>
          {description && <div className="text-xs text-muted-foreground">{description}</div>}
        </div>
      </button>
    </li>
  )
}

