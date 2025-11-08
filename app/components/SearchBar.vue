<template>
  <div class="search-bar">
    <input
      v-model="q"
      @input="onInput"
      @change="submit"
      type="text"
      placeholder="Search (city, 'lat,lon', zip, iata, metar, ip...)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useWeatherStore } from "../../stores/weather";

const q = ref("");
const store = useWeatherStore();

let timer: ReturnType<typeof setTimeout> | null = null;
function submit() {
  const v = q.value.trim();
  if (v.length === 0) return;
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
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 8px;
}
.search-bar input {
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.search-bar button {
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
}
</style>
