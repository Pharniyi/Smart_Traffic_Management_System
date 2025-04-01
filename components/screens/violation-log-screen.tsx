"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

// Mock data for violations
const violationsData = [
  { id: "KA-01-AB-1234", speed: 38, time: "10:15 AM", date: "2023-03-15", location: "Lane 2" },
  { id: "KA-02-CD-5678", speed: 32, time: "10:32 AM", date: "2023-03-15", location: "Lane 4" },
  { id: "KA-03-EF-9012", speed: 25, time: "11:05 AM", date: "2023-03-15", location: "Lane 1" },
  { id: "KA-04-GH-3456", speed: 28, time: "11:47 AM", date: "2023-03-14", location: "Lane 3" },
  { id: "KA-05-IJ-7890", speed: 26, time: "12:23 PM", date: "2023-03-14", location: "Lane 4" },
  { id: "KA-06-KL-1234", speed: 29, time: "09:15 AM", date: "2023-03-14", location: "Lane 2" },
  { id: "KA-07-MN-5678", speed: 32, time: "08:45 AM", date: "2023-03-13", location: "Lane 1" },
  { id: "KA-08-OP-9012", speed: 25, time: "07:30 AM", date: "2023-03-13", location: "Lane 4" },
]

export function ViolationLogScreen() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [speedRange, setSpeedRange] = useState<string>("all")

  // Filter violations based on selected filters
  const filteredViolations = violationsData.filter((violation) => {
    // Filter by date if selected
    if (date && violation.date !== format(date, "yyyy-MM-dd")) {
      return false
    }

    // Filter by speed range if selected
    if (speedRange === "20-25" && (violation.speed < 20 || violation.speed > 25)) {
      return false
    } else if (speedRange === "25-30" && (violation.speed < 25 || violation.speed > 30)) {
      return false
    } else if (speedRange === "30+" && violation.speed < 30) {
      return false
    }

    return true
  })

  return (
    <div className="container p-4 space-y-6">
      <h1 className="text-2xl font-bold">Violation Log</h1>

      <Card>
        <CardHeader>
          <CardTitle>Filter Violations</CardTitle>
          <CardDescription>Filter by date or speed range</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
              {date && (
                <Button variant="ghost" className="w-full" onClick={() => setDate(undefined)}>
                  Clear Date
                </Button>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="speed">Speed Range (km/h)</Label>
              <Select value={speedRange} onValueChange={setSpeedRange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select speed range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Speeds</SelectItem>
                  <SelectItem value="20-25">20-25 km/h</SelectItem>
                  <SelectItem value="25-30">25-30 km/h</SelectItem>
                  <SelectItem value="30+">30+ km/h</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Violation Records</CardTitle>
          <CardDescription>{filteredViolations.length} violations found</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {filteredViolations.map((violation, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{violation.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        {violation.date} at {violation.time}
                      </p>
                    </div>
                    <Badge variant="destructive" className="text-md">
                      {violation.speed} km/h
                    </Badge>
                  </div>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Location:</span> {violation.location}
                  </p>
                </div>
              ))}

              {filteredViolations.length === 0 && (
                <div className="text-center p-4">
                  <p className="text-muted-foreground">No violations found with the selected filters.</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

