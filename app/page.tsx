import WeatherApp from "@/components/weather-app"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-sky-50 to-blue-100 dark:from-slate-900 dark:to-slate-800">
      <div className="w-full max-w-md">
        <WeatherApp />
      </div>
    </main>
  )
}
