export type DayItem = {
  icon?: string;
  date?: string;
  avg_temperature?: number | null;
};
export type HourItem = {
  time?: string;
  temp?: number | null;
  icon?: string;
  wind_kph?: number | null;
  wind_dir?: string;
};
