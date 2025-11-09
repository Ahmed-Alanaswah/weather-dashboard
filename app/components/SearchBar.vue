<template>
  <div class="search-bar">
    <div class="search-input-wrapper">
      <img
        src="/assets/icons/search-white.png"
        alt="search"
        class="search-icon"
      />
      <input
        v-model="localQuery"
        @input="onInput"
        @keydown.enter.prevent="submit"
        type="text"
        placeholder="Search for your preferred city..."
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useWeatherStore } from "../../stores/weather";
import { getCurruntLocationInf } from "../helpers/getCurruntLocationInf";
const store = useWeatherStore();

const localQuery = ref("");
let timer: ReturnType<typeof setTimeout> | null = null;

function submit() {
  const v = (localQuery.value || "").trim();
  if (v.length === 0) {
    getCurruntLocationInf();
  }
  void store.fetchWeather(v);
}

function onInput() {
  // Debounce user input to avoid rapid API calls
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    submit();
    timer = null;
  }, 500);
}

// Clear the local input when the store signals it (e.g. current location button wants the input cleared)
import { watch } from "vue";
watch(
  () => store.clearSearchSignal,
  () => {
    localQuery.value = "";
  }
);
</script>

<style scoped src="../../assets/css/SearchBar.css"></style>
