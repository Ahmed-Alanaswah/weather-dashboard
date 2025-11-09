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
import { useWeatherStore } from "../../../stores/weather";
import { getCurruntLocationInf } from "../../helpers/getCurrentLocationInfo";
const errorMessage = ref<string | null>(null);
const locating = ref(false);
const store = useWeatherStore();

async function locate() {
  errorMessage.value = null;
  // signal the SearchBar to clear its visible input
  try {
    // increment the numeric signal so watchers detect a change
    store.clearSearchSignal = (store.clearSearchSignal || 0) + 1;
    await getCurruntLocationInf();
  } catch (e: any) {
    // ignore if store isn't available
    console.error(e);
    // set a friendly error message for the UI
    errorMessage.value =
      e.message || "Failed to get your location. Please try again.";

    // optionally, you can show a toast or alert
    alert(errorMessage.value);
  }
}
</script>

<style scoped src="../../../assets/css/CurrentLocationButton.css"></style>
