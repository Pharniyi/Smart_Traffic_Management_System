"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Circle } from "lucide-react"
import { Button } from "@/components/ui/button"

// Import the ESP32Connection component at the top of the file
import { ESP32Connection } from "@/components/esp32-connection"

// Enhanced mock data for traffic density with better labeling
const trafficData = [
  { time: "08:00", density: 30, flow: 65, label: "Low" },
  { time: "09:00", density: 45, flow: 55, label: "Moderate" },
  { time: "10:00", density: 60, flow: 40, label: "Moderate" },
  { time: "11:00", density: 40, flow: 60, label: "Moderate" },
  { time: "12:00", density: 50, flow: 50, label: "Moderate" },
  { time: "13:00", density: 75, flow: 30, label: "High" },
  { time: "14:00", density: 85, flow: 25, label: "High" },
  { time: "15:00", density: 70, flow: 35, label: "High" },
]

// Mock data for speed violations
const speedViolations = [
  { id: "KA-01-AB-1234", speed: 78, time: "10:15 AM" },
  { id: "KA-02-CD-5678", speed: 82, time: "10:32 AM" },
  { id: "KA-03-EF-9012", speed: 95, time: "11:05 AM" },
  { id: "KA-04-GH-3456", speed: 88, time: "11:47 AM" },
  { id: "KA-05-IJ-7890", speed: 76, time: "12:23 PM" },
]

// Traffic status definitions for microcontroller integration
const trafficStatuses = {
  low: {
    id: "low",
    label: "Low Traffic (Smooth flow)",
    color: "text-green-500",
    bgColor: "bg-green-100 dark:bg-green-900/30",
    borderColor: "border-green-500",
    description: "Traffic is moving freely with no delays",
    sensorValue: "0-30",
    microcontrollerPin: "D2",
    ledColor: "Green LED",
  },
  moderate: {
    id: "moderate",
    label: "Moderate Traffic (Busy but moving)",
    color: "text-yellow-500",
    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
    borderColor: "border-yellow-500",
    description: "Some congestion but traffic is still flowing",
    sensorValue: "31-70",
    microcontrollerPin: "D3",
    ledColor: "Yellow LED",
  },
  high: {
    id: "high",
    label: "High Congestion (Heavy traffic)",
    color: "text-red-500",
    bgColor: "bg-red-100 dark:bg-red-900/30",
    borderColor: "border-red-500",
    description: "Significant delays expected due to heavy traffic",
    sensorValue: "71-100",
    microcontrollerPin: "D4",
    ledColor: "Red LED",
  },
}

export function HomeScreen() {
  // State for traffic status - this could be controlled by microcontroller input
  const [trafficStatus, setTrafficStatus] = useState<"low" | "moderate" | "high">("moderate")

  // State for manual/auto mode - in a real implementation, this would affect how the status is updated
  const [controlMode, setControlMode] = useState<"auto" | "manual">("auto")

  // Get current status object
  const currentStatus = trafficStatuses[trafficStatus]

  // Function to handle manual status change (for demonstration)
  const handleStatusChange = (status: "low" | "moderate" | "high") => {
    if (controlMode === "manual") {
      setTrafficStatus(status)
    }
  }

  // Toggle control mode
  const toggleControlMode = () => {
    setControlMode(controlMode === "auto" ? "manual" : "auto")
  }

  return (
    <div className="px-4 py-3 space-y-4">
      <h1 className="text-xl font-bold">Traffic Monitoring</h1>

      <Card className="border-2 border-primary/20 rounded-xl">
        <CardHeader className="pb-2 px-4 pt-4">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base">Traffic Status</CardTitle>
            <Button
              variant={controlMode === "manual" ? "default" : "outline"}
              size="sm"
              onClick={toggleControlMode}
              className="h-8 text-xs"
            >
              {controlMode === "auto" ? "Auto Mode" : "Manual Mode"}
            </Button>
          </div>
          <CardDescription className="text-xs">
            {controlMode === "auto"
              ? "Status is automatically updated from sensors"
              : "Manually control traffic status for testing"}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="grid gap-3">
            {/* Current active status */}
            <div className={`p-3 rounded-lg border-2 ${currentStatus.borderColor} ${currentStatus.bgColor}`}>
              <div className="flex items-center">
                <Circle className={`mr-2 h-5 w-5 fill-current ${currentStatus.color}`} />
                <div>
                  <span className="font-bold text-base">{currentStatus.label}</span>
                  <p className="text-xs text-muted-foreground">{currentStatus.description}</p>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-medium">Sensor Range:</span> {currentStatus.sensorValue}
                </div>
              </div>
            </div>

            {/* Manual control buttons - only enabled in manual mode */}
            <div className="grid grid-cols-3 gap-2">
              {Object.values(trafficStatuses).map((status) => (
                <Button
                  key={status.id}
                  variant={trafficStatus === status.id ? "default" : "outline"}
                  className={`flex items-center justify-center h-9 text-xs ${trafficStatus === status.id ? status.color : ""}`}
                  disabled={controlMode === "auto"}
                  onClick={() => handleStatusChange(status.id as "low" | "moderate" | "high")}
                >
                  <Circle className={`mr-1 h-3 w-3 fill-current ${status.color}`} />
                  {status.id.charAt(0).toUpperCase() + status.id.slice(1)}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <ESP32Connection />

      {/* Real-time traffic chart with improved mobile responsiveness */}
      <Card className="rounded-xl">
        <CardHeader className="pb-2 px-4 pt-4">
          <CardTitle className="text-base">Real-Time Traffic</CardTitle>
          <CardDescription className="text-xs">Monitoring density and flow</CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <div className="w-full overflow-x-auto pb-2">
            <div className="min-w-[300px] w-full">
              <ChartContainer
                config={{
                  density: {
                    label: "Traffic Density",
                    color: "hsl(var(--chart-1))",
                  },
                  flow: {
                    label: "Traffic Flow",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[200px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" tick={{ fontSize: 10 }} tickMargin={5} />
                    <YAxis tick={{ fontSize: 10 }} tickMargin={5} />
                    <Legend verticalAlign="top" height={30} iconSize={10} wrapperStyle={{ fontSize: "10px" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="density"
                      stroke="var(--color-density)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="flow"
                      stroke="var(--color-flow)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-3">
            {Object.values(trafficStatuses).map((status) => (
              <div
                key={status.id}
                className={`flex items-center justify-center p-1 rounded-lg border ${status.bgColor}`}
              >
                <Circle className={`mr-1 h-3 w-3 fill-current ${status.color}`} />
                <span className="text-xs font-medium">{status.id.charAt(0).toUpperCase() + status.id.slice(1)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-xl">
        <CardHeader className="px-4 pt-4 pb-2">
          <CardTitle className="text-base">Speed Violations</CardTitle>
          <CardDescription className="text-xs">Vehicles exceeding limits</CardDescription>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <ScrollArea className="h-[200px]">
            <div className="space-y-3">
              {speedViolations.map((violation, index) => (
                <div key={index} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium text-sm">{violation.id}</p>
                    <p className="text-xs text-muted-foreground">{violation.time}</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">
                    {violation.speed} km/h
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

