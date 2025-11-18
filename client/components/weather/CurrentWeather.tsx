import { WeatherData, getWeatherDescription } from "@/lib/weather";
import {
  Cloud,
  Eye,
  Gauge,
  Droplets,
  Wind,
  Sun,
  AlertCircle,
} from "lucide-react";

interface CurrentWeatherProps {
  data: WeatherData;
  cityName: string;
}

function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

function getAQILabel(aqi: number): string {
  if (aqi <= 50) return "Good";
  if (aqi <= 100) return "Moderate";
  if (aqi <= 150) return "Unhealthy for Sensitive Groups";
  if (aqi <= 200) return "Unhealthy";
  if (aqi <= 300) return "Very Unhealthy";
  return "Hazardous";
}

function getAQIColor(aqi: number): string {
  if (aqi <= 50) return "text-green-600";
  if (aqi <= 100) return "text-yellow-600";
  if (aqi <= 150) return "text-orange-600";
  if (aqi <= 200) return "text-red-600";
  if (aqi <= 300) return "text-purple-600";
  return "text-red-900";
}

export function CurrentWeather({ data, cityName }: CurrentWeatherProps) {
  const weather = getWeatherDescription(
    data.current.weatherCode,
    data.current.isDay,
  );
  const windDirection = data.current.windDirection.toFixed(0);
  const getWindDirection = (degrees: number) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return directions[Math.round(degrees / 22.5) % 16];
  };

  const tempF = celsiusToFahrenheit(data.current.temperature);
  const feelsLikeF = celsiusToFahrenheit(data.current.apparentTemperature);
  const aqiLabel = getAQILabel(data.current.aqi);
  const aqiColor = getAQIColor(data.current.aqi);

  return (
    <div className="w-full">
      {/* Main Current Conditions */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-2xl p-8 mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              {cityName}
            </h1>
            <p className="text-2xl font-semibold text-primary mb-1">
              {data.current.temperature.toFixed(0)}°C / {tempF.toFixed(0)}°F
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              {weather.description}
            </p>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                Feels like {data.current.apparentTemperature.toFixed(0)}°C /{" "}
                {feelsLikeF.toFixed(0)}°F
              </p>
              <p className="text-sm text-muted-foreground">
                AQI: {data.current.aqi.toFixed(0)} ({aqiLabel})
              </p>
            </div>
          </div>
          <div className="text-7xl">{weather.icon}</div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Droplets className="h-4 w-4 text-secondary" />
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Humidity
            </p>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {data.current.relativeHumidity}%
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Wind className="h-4 w-4 text-secondary" />
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Wind Speed
            </p>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {data.current.windSpeed.toFixed(1)} m/s
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            From {getWindDirection(parseFloat(windDirection))}
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="h-4 w-4 text-secondary" />
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Pressure
            </p>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {data.current.pressureMsl.toFixed(0)} hPa
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-4 w-4 text-secondary" />
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Visibility
            </p>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {(data.current.visibility / 1000).toFixed(1)} km
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Sun className="h-4 w-4 text-accent" />
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              UV Index
            </p>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {data.current.uvIndex.toFixed(1)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {data.current.uvIndex < 3
              ? "Low"
              : data.current.uvIndex < 6
                ? "Moderate"
                : data.current.uvIndex < 8
                  ? "High"
                  : data.current.uvIndex < 11
                    ? "Very High"
                    : "Extreme"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Cloud className="h-4 w-4 text-secondary" />
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Precipitation
            </p>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {data.current.precipitation.toFixed(1)} mm
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-4 w-4 text-secondary" />
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Air Quality
            </p>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {data.current.aqi.toFixed(0)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{aqiLabel}</p>
        </div>
      </div>
    </div>
  );
}
