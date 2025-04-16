import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, type LucideIcon } from "lucide-react"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getWeatherIcon(weather: string): LucideIcon {
  const weatherLower = weather.toLowerCase()

  if (weatherLower.includes("thunderstorm")) return CloudLightning
  if (weatherLower.includes("drizzle")) return CloudDrizzle
  if (weatherLower.includes("rain")) return CloudRain
  if (weatherLower.includes("snow")) return CloudSnow
  if (weatherLower.includes("mist") || weatherLower.includes("fog") || weatherLower.includes("haze")) return CloudFog
  if (weatherLower.includes("cloud")) return Cloud

  // Default to sun for clear and other conditions
  return Sun
}

export function formatTemperature(temp: number): string {
  return Math.round(temp).toString()
}
