"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherData } from "@/lib/types"
import { getWeatherIcon, formatTemperature } from "@/lib/utils"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Droplets, Wind } from "lucide-react"

interface WeatherCardProps {
  weatherData: WeatherData
  unit: "metric" | "imperial"
  onToggleUnit: () => void
}

export default function WeatherCard({ weatherData, unit, onToggleUnit }: WeatherCardProps) {
  const { city, temp, tempMin, tempMax, humidity, windSpeed, weather, weatherDescription } = weatherData
  const WeatherIcon = getWeatherIcon(weather)
  const tempUnit = unit === "metric" ? "°C" : "°F"
  const windUnit = unit === "metric" ? "m/s" : "mph"

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">{city}</CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="unit-toggle" className="text-sm">
              °C
            </Label>
            <Switch id="unit-toggle" checked={unit === "imperial"} onCheckedChange={onToggleUnit} />
            <Label htmlFor="unit-toggle" className="text-sm">
              °F
            </Label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-4 md:mb-0">
            <WeatherIcon className="h-16 w-16 text-primary mr-4" />
            <div>
              <div className="text-4xl font-bold">
                {formatTemperature(temp)}
                {tempUnit}
              </div>
              <Badge variant="outline" className="mt-1">
                {weatherDescription}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <span className="text-sm text-muted-foreground">Min</span>
              <span className="font-medium">
                {formatTemperature(tempMin)}
                {tempUnit}
              </span>
            </div>
            <div className="flex flex-col items-center p-2 bg-muted rounded-md">
              <span className="text-sm text-muted-foreground">Max</span>
              <span className="font-medium">
                {formatTemperature(tempMax)}
                {tempUnit}
              </span>
            </div>
            <div className="flex items-center p-2 bg-muted rounded-md">
              <Droplets className="h-4 w-4 mr-2 text-blue-500" />
              <div>
                <span className="text-sm text-muted-foreground">Humidity</span>
                <div className="font-medium">{humidity}%</div>
              </div>
            </div>
            <div className="flex items-center p-2 bg-muted rounded-md">
              <Wind className="h-4 w-4 mr-2 text-blue-500" />
              <div>
                <span className="text-sm text-muted-foreground">Wind</span>
                <div className="font-medium">
                  {windSpeed} {windUnit}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
