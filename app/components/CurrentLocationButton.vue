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
import { getCurruntLocationInf } from "../helpers/getCurruntLocationInf";

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
  getCurruntLocationInf();
}
</script>

<style scoped src="../../public/assets/css/CurrentLocationButton.css"></style>
