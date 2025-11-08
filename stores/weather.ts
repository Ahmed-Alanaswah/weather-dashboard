import { defineStore } from "pinia";
import { useRuntimeConfig } from "#imports";

type DayItem = {
  icon?: string;
  date?: string;
  avg_temperature?: number | null;
};
type HourItem = {
  time?: string;
  temp?: number | null;
  icon?: string;
  wind_kph?: number | null;
  wind_dir?: string;
};

let currentController: AbortController | null = null;

export const useWeatherStore = defineStore("weather", {
  state: () => ({
    query: "Amman",
    lastQuery: "",
    loading: false as boolean,
    error: null as string | null,
    city: "" as string,
    time: "" as string,
    date: "" as string,
    temp: null as number | null,
    feelslike: null as number | null,
    condition: "" as string,
    conditionIcon: "" as string,
    humidity: null as number | null,
    pressure: null as number | null,
    wind: null as number | null,
    uv: null as number | null,
    sunrise: "" as string,
    sunset: "" as string,
    days: [] as DayItem[],
    hours: [] as HourItem[],
  }),
  actions: {
    async fetchWeather(q: string) {
      if (!q) return;
      this.loading = true;
      this.error = null;
      this.lastQuery = q;

      // cancel previous
      try {
        if (currentController) {
          currentController.abort();
        }
      } catch (e) {
        // ignore
      }
      currentController = new AbortController();

      try {
        const config = useRuntimeConfig();
        const key = config.public.WEATHERAPI_KEY;
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${encodeURIComponent(
          key
        )}&q=${encodeURIComponent(q)}&days=5`;
        const res = await fetch(url, { signal: currentController.signal });
        if (!res.ok) throw new Error(await res.text());
        const j = await res.json();

        // map fields
        this.city = j.location?.name ?? q;
        const local = j.location?.localtime || "";
        if (local) {
          const [d, t] = local.split(" ");
          this.time = t || "";
          try {
            const iso = local.replace(" ", "T");
            const dateObj = new Date(iso);
            const weekdays = [
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ];
            const months = [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ];
            this.date = `${weekdays[dateObj.getDay()]}, ${dateObj.getDate()} ${
              months[dateObj.getMonth()]
            }`;
          } catch (e) {
            this.date = d || "";
          }
        }

        this.temp = j.current?.temp_c ?? j.current?.temp_f ?? null;
        this.feelslike = j.current?.feelslike_c ?? null;
        this.condition = j.current?.condition?.text ?? "";
        this.conditionIcon = j.current?.condition?.icon ?? "";
        if (j.forecast?.forecastday && j.forecast.forecastday.length > 0) {
          const astro = j.forecast.forecastday[0].astro;
          this.sunrise = astro?.sunrise ?? "";
          this.sunset = astro?.sunset ?? "";
        }
        this.humidity = j.current?.humidity ?? null;
        this.pressure =
          j.current?.pressure_mb ?? j.current?.pressure_in ?? null;
        this.wind = j.current?.wind_kph ?? j.current?.wind_mph ?? null;
        this.uv = j.current?.uv ?? null;

        // days
        if (j.forecast?.forecastday && j.forecast.forecastday.length > 0) {
          this.days = j.forecast.forecastday.map((fd: any) => {
            let formattedDate = fd.date || "";
            try {
              const dateObj = new Date(fd.date);
              const weekdays = [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ];
              const months = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];
              formattedDate = `${
                weekdays[dateObj.getDay()]
              }, ${dateObj.getDate()} ${months[dateObj.getMonth()]}`;
            } catch (e) {
              // ignore
            }
            let icon = fd.day?.condition?.icon ?? "";
            if (icon && icon.startsWith("//")) icon = "https:" + icon;
            return {
              icon,
              date: formattedDate,
              avg_temperature: fd.day?.avgtemp_c ?? fd.day?.avgtemp_f ?? null,
            };
          });
        } else {
          this.days = [];
        }

        // selected hours for current day
        this.hours = [];
        try {
          const firstDay = j.forecast?.forecastday?.[0];
          if (firstDay && Array.isArray(firstDay.hour)) {
            const desiredTimes = ["00:00", "12:00", "15:00", "18:00", "21:00"];
            const hoursMap = firstDay.hour;
            const selected = desiredTimes
              .map(
                (t) =>
                  hoursMap.find((h: any) => (h.time || "").slice(-5) === t) ??
                  null
              )
              .filter(Boolean)
              .map((h: any) => {
                let icon = h?.condition?.icon ?? "";
                if (icon && icon.startsWith("//")) icon = "https:" + icon;
                return {
                  time: (h.time || "").slice(-5),
                  temp: h?.temp_c ?? h?.temp_f ?? null,
                  icon,
                  wind_kph: h?.wind_kph ?? h?.wind_mph ?? null,
                  wind_dir: h?.wind_dir ?? "",
                };
              });
            this.hours = selected as HourItem[];
          }
        } catch (e) {
          this.hours = [];
        }

        this.query = q;
      } catch (err: any) {
        if (err?.name === "AbortError") {
          // aborted, ignore
        } else {
          this.error = err?.message ?? String(err);
        }
      } finally {
        this.loading = false;
        // clear controller only if it matches current
        currentController = null;
      }
    },
  },
});
