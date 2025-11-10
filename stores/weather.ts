import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";
import type { DayItem, HourItem } from "../types/weather";
import { WEEKDAYS, MONTHS } from "../constants/date";

let currentController: AbortController | null = null;

function formatDate(dateString: string): string {
  try {
    const dateObj = new Date(dateString);
    return `${WEEKDAYS[dateObj.getDay()]}, ${dateObj.getDate()} ${
      MONTHS[dateObj.getMonth()]
    }`;
  } catch (e) {
    return dateString.split(" ")[0] || "";
  }
}

function formatLocalTime(localTime: string): { time: string; date: string } {
  if (!localTime) return { time: "", date: "" };

  const [datePart, timePart] = localTime.split(" ");
  const time = timePart || "";
  const date = formatDate(localTime.replace(" ", "T"));

  return { time, date };
}

function normalizeIconUrl(icon: string): string {
  if (icon && icon.startsWith("//")) {
    return "https:" + icon;
  }
  return icon;
}

function cancelPreviousRequest() {
  try {
    if (currentController) {
      currentController.abort();
    }
  } catch (e) {
    // ignore
  }
}

function buildApiUrl(query: string): string {
  const config = useRuntimeConfig();
  const key = config.public.WEATHERAPI_KEY;
  return `https://api.weatherapi.com/v1/forecast.json?key=${encodeURIComponent(
    key
  )}&q=${encodeURIComponent(query)}&days=5`;
}

async function fetchWeatherData(url: string): Promise<any> {
  const res = await fetch(url, { signal: currentController!.signal });
  if (!res.ok) throw new Error(await res.text());
  return await res.json();
}

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    query: "",
    lastQuery: "",
    // increment this to signal components (like SearchBar) to clear their local input
    clearSearchSignal: 0 as number,
    loading: false as boolean,
    error: null as string | null,
    city: "" as string,
    time: "" as string,
    date: "" as string,
    temp: "" as number | string,
    feelslike: "" as number | string,
    condition: "" as string,
    conditionIcon: "" as string,
    humidity: "" as number | string,
    pressure: "" as number | string,
    wind: "" as number | string,
    uv: "" as number | string,
    sunrise: "" as string,
    sunset: "" as string,
    days: [] as DayItem[],
    hours: [] as HourItem[],
  }),
  actions: {
    parseLocationData(data: any, query: string) {
      this.city = data.location?.name ?? query;
      const localTime = data.location?.localtime || "";
      if (localTime) {
        const { time, date } = formatLocalTime(localTime);
        this.time = time;
        this.date = date;
      }
    },

    parseCurrentWeather(data: any) {
      const current = data.current;
      this.temp = current?.temp_c ?? current?.temp_f ?? null;
      this.feelslike = current?.feelslike_c ?? null;
      this.condition = current?.condition?.text ?? "";
      this.conditionIcon = normalizeIconUrl(current?.condition?.icon ?? "");
      this.humidity = current?.humidity ?? null;
      this.pressure = current?.pressure_mb ?? current?.pressure_in ?? null;
      this.wind = current?.wind_kph ?? current?.wind_mph ?? null;
      this.uv = current?.uv ?? null;
    },

    parseAstroData(data: any) {
      const firstForecastDay = data.forecast?.forecastday?.[0];
      if (firstForecastDay?.astro) {
        this.sunrise = firstForecastDay.astro.sunrise ?? "";
        this.sunset = firstForecastDay.astro.sunset ?? "";
      }
    },

    parseForecastDays(data: any): DayItem[] {
      const forecastDays = data.forecast?.forecastday;
      if (!forecastDays || forecastDays.length === 0) {
        return [];
      }

      return forecastDays.map((fd: any) => {
        const formattedDate = formatDate(fd.date || "");
        const icon = normalizeIconUrl(fd.day?.condition?.icon ?? "");
        return {
          icon,
          date: formattedDate,
          avg_temperature: fd.day?.avgtemp_c ?? fd.day?.avgtemp_f ?? null,
        };
      });
    },

    parseHourlyForecast(data: any): HourItem[] {
      try {
        const firstDay = data.forecast?.forecastday?.[0];
        if (!firstDay || !Array.isArray(firstDay.hour)) {
          return [];
        }

        const desiredTimes = ["00:00", "12:00", "15:00", "18:00", "21:00"];
        const hoursMap = firstDay.hour;
        const hourlyItems: HourItem[] = [];

        for (const time of desiredTimes) {
          const hour = hoursMap.find(
            (h: any) => (h.time || "").slice(-5) === time
          );
          if (hour) {
            hourlyItems.push({
              time: (hour.time || "").slice(-5),
              temp: hour.temp_c ?? hour.temp_f ?? null,
              icon: normalizeIconUrl(hour.condition?.icon ?? ""),
              wind_kph: hour.wind_kph ?? hour.wind_mph ?? null,
              wind_dir: hour.wind_dir ?? "",
            });
          }
        }

        return hourlyItems;
      } catch (e) {
        throw new Error("Failed to fetch weather data");
      }
    },

    async fetchWeather(q: string) {
      // Initialize loading state
      this.loading = true;
      this.error = null;
      this.lastQuery = q;

      // Cancel previous request
      cancelPreviousRequest();
      currentController = new AbortController();

      try {
        // Fetch weather data
        const url = buildApiUrl(q);
        const data = await fetchWeatherData(url);

        // Parse and set data
        this.parseLocationData(data, q);
        this.parseCurrentWeather(data);
        this.parseAstroData(data);
        this.days = this.parseForecastDays(data);
        this.hours = this.parseHourlyForecast(data);
        this.query = q;
      } catch (err: any) {
        if (err?.name === "AbortError") {
          // Request was aborted, ignore
        } else {
          this.error = err?.message ?? String(err);
        }
      } finally {
        this.loading = false;
        currentController = null;
      }
    },
  },
});
