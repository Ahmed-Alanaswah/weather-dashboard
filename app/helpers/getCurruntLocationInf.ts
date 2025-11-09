import { useWeatherStore } from "../../stores/weather";

export const getCurruntLocationInf = () => {
  const store = useWeatherStore();

  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        void store.fetchWeather(`${lat},${lon}`);
      },
      () => {
        void store.fetchWeather("Amman");
      },
      { timeout: 8000 }
    );
  } else {
    void store.fetchWeather("Amman");
  }
};
