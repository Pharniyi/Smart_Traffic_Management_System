"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Circle } from "lucide-react"

// Mock camera data
const cameras = [
  { id: "CAM-001", location: "Lane 1", status: "active" },
  { id: "CAM-002", location: "Lane 2", status: "active" },
  { id: "CAM-003", location: "Lane 3", status: "active" },
  { id: "CAM-004", location: "Lane 4", status: "active" },
]

export function LiveCameraScreen() {
  const [activeCamera, setActiveCamera] = useState("CAM-001")

  // Get current camera data
  const currentCamera = cameras.find((cam) => cam.id === activeCamera) || cameras[0]

  // Mock traffic status for the current camera
  const trafficStatus =
    activeCamera === "CAM-001"
      ? { level: "high", color: "text-red-500", text: "High Congestion" }
      : activeCamera === "CAM-002"
        ? { level: "moderate", color: "text-yellow-500", text: "Moderate Traffic" }
        : { level: "low", color: "text-green-500", text: "Low Traffic" }

  return (
    <div className="container p-4 space-y-6">
      <h1 className="text-2xl font-bold">Live Camera Feed</h1>

      <Tabs defaultValue="grid" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="grid">Camera Grid</TabsTrigger>
          <TabsTrigger value="single">Single View</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {cameras.map((camera) => (
              <Card
                key={camera.id}
                className={`cursor-pointer ${camera.status === "inactive" ? "opacity-60" : ""}`}
                onClick={() => camera.status === "active" && setActiveCamera(camera.id)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      {camera.status === "active" ? (
                        <img
                          src={`/placeholder.svg?height=180&width=320&text=Camera+${camera.id}`}
                          alt={`Camera feed from ${camera.location}`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-4">
                          <p className="text-muted-foreground">Camera Offline</p>
                        </div>
                      )}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 bg-background/80 p-2 rounded">
                      <p className="text-sm font-medium truncate">{camera.location}</p>
                      <div className="flex justify-between items-center mt-1">
                        <Badge variant={camera.status === "active" ? "default" : "outline"}>
                          {camera.status === "active" ? "Live" : "Offline"}
                        </Badge>
                        {camera.status === "active" && (
                          <div className="flex items-center">
                            <Circle
                              className={`h-3 w-3 mr-1 fill-current ${
                                camera.id === "CAM-001"
                                  ? "text-red-500"
                                  : camera.id === "CAM-002"
                                    ? "text-yellow-500"
                                    : "text-green-500"
                              }`}
                            />
                            <span className="text-xs">
                              {camera.id === "CAM-001" ? "High" : camera.id === "CAM-002" ? "Moderate" : "Low"}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="single" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{currentCamera.location}</CardTitle>
              <CardDescription>
                Camera ID: {currentCamera.id} • Status: {currentCamera.status === "active" ? "Online" : "Offline"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-muted flex items-center justify-center mb-4">
                {currentCamera.status === "active" ? (
                  <img
                    src={`/placeholder.svg?height=360&width=640&text=Camera+${currentCamera.id}`}
                    alt={`Camera feed from ${currentCamera.location}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-4">
                    <p className="text-muted-foreground">Camera Offline</p>
                  </div>
                )}
              </div>

              {currentCamera.status === "active" && (
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Circle className={`mr-2 h-4 w-4 fill-current ${trafficStatus.color}`} />
                    <span className="font-medium">{trafficStatus.text}</span>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium">Live Traffic Data</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div>
                        <p className="text-sm text-muted-foreground">Average Speed</p>
                        <p className="font-medium">
                          {activeCamera === "CAM-001" ? "20 km/h" : activeCamera === "CAM-002" ? "48 km/h" : "65 km/h"}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Vehicle Count</p>
                        <p className="font-medium">
                          {activeCamera === "CAM-001"
                            ? "5 vehicles"
                            : activeCamera === "CAM-002"
                              ? "98 vehicles"
                              : "52 vehicles"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Camera Selection</CardTitle>
          <CardDescription>Select a camera to view</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {cameras.map((camera) => (
              <div
                key={camera.id}
                className={`p-3 border rounded-lg cursor-pointer flex justify-between items-center ${
                  activeCamera === camera.id ? "border-primary bg-primary/5" : ""
                } ${camera.status === "inactive" ? "opacity-60" : ""}`}
                onClick={() => camera.status === "active" && setActiveCamera(camera.id)}
              >
                <div>
                  <p className="font-medium">{camera.id}</p>
                  <p className="text-sm text-muted-foreground">{camera.location}</p>
                </div>
                <Badge variant={camera.status === "active" ? "default" : "outline"}>
                  {camera.status === "active" ? "Live" : "Offline"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

