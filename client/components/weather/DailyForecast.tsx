import { WeatherData, getWeatherDescription } from "@/lib/weather";

interface DailyForecastProps {
  data: WeatherData;
}

export function DailyForecast({ data }: DailyForecastProps) {
  const nextDays = data.daily.time.slice(0, 10).map((time, idx) => ({
    date: new Date(time),
    weatherCode: data.daily.weatherCode[idx],
    tempMax: data.daily.temperature2mMax[idx],
    tempMin: data.daily.temperature2mMin[idx],
    precipitation: data.daily.precipitation[idx],
    windSpeed: data.daily.windSpeed10mMax[idx],
  }));

  return (
    <div className="w-full">
      <h2 className="text-xl font-bold text-foreground mb-4">
        10-Day Forecast
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {nextDays.map((day, idx) => {
          const weather = getWeatherDescription(day.weatherCode);
          const dateStr = day.date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          const dayName = day.date.toLocaleDateString("en-US", {
            weekday: "short",
          });

          return (
            <div
              key={idx}
              className="bg-card border border-border rounded-xl p-4 flex flex-col gap-3"
            >
              <div>
                <p className="font-semibold text-foreground">{dayName}</p>
                <p className="text-sm text-muted-foreground">{dateStr}</p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-3xl">{weather.icon}</p>
                <p className="text-xs text-center text-muted-foreground max-w-[60px]">
                  {weather.description}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-foreground">
                    {day.tempMax.toFixed(0)}°
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {day.tempMin.toFixed(0)}°
                  </span>
                </div>
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-secondary to-primary rounded-full"
                    style={{
                      width: `${((day.tempMax - day.tempMin) / 30) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                {day.precipitation > 0 && (
                  <p className="text-xs text-secondary">
                    💧 {day.precipitation.toFixed(1)}mm
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  💨 {day.windSpeed.toFixed(0)} m/s
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
