import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const city = searchParams.get("city")
  const units = searchParams.get("units") || "metric"

  if (!city) {
    return NextResponse.json({ message: "City parameter is required" }, { status: 400 })
  }

  const API_KEY = process.env.OPENWEATHERMAP_API_KEY

  if (!API_KEY) {
    return NextResponse.json({ message: "API key is not configured" }, { status: 500 })
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=${units}&appid=${API_KEY}`,
      { next: { revalidate: 1800 } }, // Cache for 30 minutes
    )

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch weather data" },
        { status: response.status },
      )
    }

    const data = await response.json()

    // Transform the API response to our WeatherData format
    const weatherData = {
      city: data.name,
      temp: data.main.temp,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      weather: data.weather[0].main,
      weatherDescription: data.weather[0].description,
    }

    return NextResponse.json(weatherData)
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json({ message: "Failed to fetch weather data" }, { status: 500 })
  }
}
