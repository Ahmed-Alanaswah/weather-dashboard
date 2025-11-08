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

const store = useWeatherStore();

const localQuery = ref("");
let timer: ReturnType<typeof setTimeout> | null = null;

function submit() {
  const v = (localQuery.value || "").trim();
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

// Clear the local input when the store signals it (e.g. current location button wants the input cleared)
import { watch } from "vue";
watch(
  () => store.clearSearchSignal,
  () => {
    localQuery.value = "";
  }
);
</script>

<style scoped>

.search-bar {
  display: flex;
}
.search-input-wrapper {
  position: relative;
  width: 730px;
  height: 62px;
}
.search-input-wrapper .search-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  pointer-events: none;
  opacity: 0.95;
}
.search-input-wrapper input {
  width: 700px;
  height: 62px;
  padding-left: 64px;
  padding-right: 20px;
  background: var(--card-bg, #444444);
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  border: none;
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 27px;
}

.search-input-wrapper input {
  color: var(--card-color, #ffffff);
}

.theme-light .search-input-wrapper input {
  border: 1px solid #111;
}

.theme-dark .search-input-wrapper input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}
.theme-light .search-input-wrapper input::placeholder {
  color: #111;
}
</style>
