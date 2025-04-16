"use client"

import { useState } from "react"

const SearchBox = ({ onCityChange }) => {
  const [city, setCity] = useState("")
  const API_URL = "https://api.openweathermap.org/data/2.5/weather"
  const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

  const handleChange = (event) => {
    setCity(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (city) {
      try {
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        const data = await response.json()
        if (response.ok) {
          onCityChange(data)
        } else {
          console.error("Error fetching weather data:", data)
          alert("City not found. Please try again.")
        }
      } catch (error) {
        console.error("Error fetching weather data:", error)
        alert("Failed to fetch weather data. Please try again later.")
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter city" value={city} onChange={handleChange} />
      <button type="submit">Search</button>
    </form>
  )
}

export default SearchBox
