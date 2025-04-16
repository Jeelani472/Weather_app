"use client"

import { useState } from "react"
import SearchBox from "./search-box"
import WeatherCard from "./weather-card"
import type { WeatherData } from "@/lib/types"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function WeatherApp() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [unit, setUnit] = useState<"metric" | "imperial">("metric")

  const fetchWeatherData = async (city: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}&units=${unit}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch weather data")
      }

      setWeatherData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const toggleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric"
    setUnit(newUnit)

    // Refetch data with new unit if we already have weather data
    if (weatherData) {
      fetchWeatherData(weatherData.city)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Weather App</h1>
        <p className="text-muted-foreground">Check the current weather conditions for any location</p>
      </div>

      <SearchBox onSearch={fetchWeatherData} isLoading={loading} />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {weatherData && <WeatherCard weatherData={weatherData} unit={unit} onToggleUnit={toggleUnit} />}
    </div>
  )
}
