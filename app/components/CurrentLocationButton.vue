<template>
  <button class="current-location" :disabled="locating" @click="locate">
    {{ locating ? "Locating..." : "Use current location" }}
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useWeatherStore } from "../../stores/weather";

const locating = ref(false);
const store = useWeatherStore();

async function locate() {
  if (!("geolocation" in navigator)) return;
  locating.value = true;
  try {
    await new Promise<void>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          void store.fetchWeather(`${lat},${lon}`);
          resolve();
        },
        (err) => reject(err),
        { enableHighAccuracy: false, timeout: 8000 }
      );
    });
  } catch (e) {
    // ignore; optionally surface error
  } finally {
    locating.value = false;
  }
}
</script>

<style scoped>
.current-location {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: transparent;
  cursor: pointer;
}
.current-location[disabled] {
  opacity: 0.6;
  cursor: default;
}
</style>
