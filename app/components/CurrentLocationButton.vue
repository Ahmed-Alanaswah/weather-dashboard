<template>
  <button
    class="current-location"
    :disabled="locating"
    @click="locate"
    aria-label="Use current location"
  >
    <img
      src="/assets/icons/current-location.png"
      alt="location"
      class="loc-icon"
    />
    <span>{{ locating ? "Locating..." : "Current Location" }}</span>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useWeatherStore } from "../../stores/weather";

const locating = ref(false);
const store = useWeatherStore();

async function locate() {
  // signal the SearchBar to clear its visible input
  try {
    // increment the numeric signal so watchers detect a change
    store.clearSearchSignal = (store.clearSearchSignal || 0) + 1;
  } catch (e) {
    // ignore if store isn't available
  }
  if (!("geolocation" in navigator)) return;
  locating.value = true;
  try {
    await new Promise<void>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;
          // call fetchWeather with coordinates but do NOT modify the visible search input
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
  border: none;
  cursor: pointer;
  width: 292px;
  height: 62px;
  background: var(--action-bg, #4cbb17);
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  color: var(--action-color, #ffffff);
  font-style: normal;
  font-weight: 800;
  font-size: 22px;
  line-height: 33px;
  color: var(--action-color, rgba(255,255,255,0.8));
  margin-left: 80px;
}
.current-location[disabled] {
  opacity: 0.6;
  cursor: default;
}

.current-location .loc-icon {
  vertical-align: middle;
  margin-right: 15px;
}
</style>
