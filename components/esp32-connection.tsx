"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Wifi, WifiOff, RefreshCw } from "lucide-react"

interface ESP32Status {
  connected: boolean
  ipAddress?: string
  lastUpdate?: string
  signalStrength?: number
}

export function ESP32Connection() {
  const [status, setStatus] = useState<ESP32Status>({
    connected: false,
  })
  const [loading, setLoading] = useState(false)

  // Simulate checking connection
  const checkConnection = () => {
    setLoading(true)

    // In a real app, this would make an API call to check ESP32 connection
    setTimeout(() => {
      // Simulate a successful connection (70% of the time)
      const connected = Math.random() > 0.3

      setStatus({
        connected,
        ipAddress: connected ? "192.168.1." + Math.floor(Math.random() * 255) : undefined,
        lastUpdate: connected ? new Date().toLocaleTimeString() : undefined,
        signalStrength: connected ? Math.floor(Math.random() * 30) + 70 : undefined, // 70-100%
      })

      setLoading(false)
    }, 1500)
  }

  // Check connection on component mount
  useEffect(() => {
    checkConnection()
  }, [])

  return (
    <Card className="rounded-xl">
      <CardHeader className="pb-2 px-4 pt-4">
        <div className="flex justify-between items-center">
          <CardTitle className="text-base">ESP32 Connection</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={checkConnection}
            disabled={loading}
            aria-label="Refresh connection status"
            className="h-8 w-8"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
        <CardDescription className="text-xs">Microcontroller status</CardDescription>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {status.connected ? (
              <Wifi className="h-4 w-4 text-green-500 mr-2" />
            ) : (
              <WifiOff className="h-4 w-4 text-red-500 mr-2" />
            )}
            <span className="font-medium text-sm">{status.connected ? "Connected" : "Disconnected"}</span>
          </div>
          <Badge variant={status.connected ? "default" : "outline"} className="text-xs">
            {status.connected ? "Online" : "Offline"}
          </Badge>
        </div>

        {status.connected && (
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">IP Address:</span>
              <span>{status.ipAddress}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Signal Strength:</span>
              <span>{status.signalStrength}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Last Update:</span>
              <span>{status.lastUpdate}</span>
            </div>
          </div>
        )}

        {!status.connected && (
          <div className="text-xs text-muted-foreground mt-2">
            <p>Check that your ESP32 is powered on and connected to the same network.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

