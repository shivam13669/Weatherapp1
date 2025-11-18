import { WeatherData, getWeatherDescription, isDaytime } from "@/lib/weather";
import { useEffect, useState } from "react";

interface HourlyForecastProps {
  data: WeatherData;
}

export function HourlyForecast({ data }: HourlyForecastProps) {
  const [currentHourIndex, setCurrentHourIndex] = useState(0);

  useEffect(() => {
    const now = new Date();
    const hourString = now.toISOString().split(":")[0] + ":00";
    const index = data.hourly.time.findIndex((time) =>
      time.startsWith(hourString),
    );
    setCurrentHourIndex(index >= 0 ? index : 0);
  }, [data.hourly.time]);

  const nextHours = data.hourly.time
    .slice(currentHourIndex, currentHourIndex + 24)
    .map((time, idx) => ({
      time: new Date(time),
      temp: data.hourly.temperature2m[currentHourIndex + idx],
      weatherCode: data.hourly.weatherCode[currentHourIndex + idx],
      precipitation: data.hourly.precipitation[currentHourIndex + idx],
      windSpeed: data.hourly.windSpeed10m[currentHourIndex + idx],
    }));

  const getHourlyDayNightStatus = (hourTime: Date): boolean => {
    // Find the day this hour belongs to
    const hourDateStr = hourTime.toISOString().split("T")[0];
    const dayIndex = data.daily.time.findIndex((date) =>
      date.startsWith(hourDateStr),
    );

    if (dayIndex >= 0) {
      const sunrise = data.daily.sunrise[dayIndex];
      const sunset = data.daily.sunset[dayIndex];
      if (sunrise && sunset) {
        return isDaytime(hourTime, sunrise, sunset);
      }
    }

    // Fallback: use current time's isDay status if we can't determine
    return data.current.isDay;
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-foreground mb-4">
        Hourly Forecast
      </h2>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <div className="flex gap-4 p-4 min-w-min">
            {nextHours.map((hour, idx) => {
              const isDay = getHourlyDayNightStatus(hour.time);
              const weather = getWeatherDescription(hour.weatherCode, isDay);
              const timeStr = hour.time.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              });
              const tempF = (hour.temp * 9) / 5 + 32;

              return (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 flex-shrink-0 min-w-[110px]"
                >
                  <p className="text-xs font-semibold text-muted-foreground">
                    {timeStr}
                  </p>
                  <p className="text-2xl">{weather.icon}</p>
                  <p className="text-sm font-bold text-foreground">
                    {hour.temp.toFixed(0)}° / {tempF.toFixed(0)}°
                  </p>
                  {hour.precipitation > 0 && (
                    <p className="text-xs text-secondary">
                      {hour.precipitation.toFixed(1)}mm
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {hour.windSpeed.toFixed(0)} m/s
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
