<script setup lang="ts">
import { onMounted, computed } from "vue";
import CardCoxShadow from "../components/CardCoxShadow.vue";
import CurrentTimeInfoCard from "../components/CurrentTimeInfoCard.vue";
import CurrentInfoWeather from "../components/CurrentInfoWeather.vue";
import DailyForecastCard from "../components/DailyForecastCard.vue";
import HourlyForecast from "../components/HourlyForecast.vue";
import { useWeatherStore } from "../../stores/weather";

const store = useWeatherStore();

// Create a key that changes when place data changes to trigger transitions
// Use lastQuery which changes whenever a new search is made
const placeKey = computed(() => store.lastQuery || store.city || "default");

onMounted(() => {
  // Attempt to use browser geolocation on initial load; fall back to Amman
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
});
</script>

<template>
  <div class="app-container">
    <Transition name="fade-slide" mode="out-in">
      <div class="top" :key="placeKey">
        <!-- Example usage of the CardCoxShadow component wrapping CurrentTimeInfoCard -->
        <div style="flex: 0.4">
          <CardCoxShadow>
            <!-- pass fetched data as props -->
            <CurrentTimeInfoCard
              :city="store.city"
              :time="store.time"
              :date="store.date"
            />
          </CardCoxShadow>
        </div>
        <div style="flex: 0.6">
          <CardCoxShadow>
            <!-- pass fetched data as props to the weather card -->
            <CurrentInfoWeather
              :city="store.city"
              :time="store.time"
              :date="store.date"
              :temp="store.temp"
              :condition="store.condition"
              :conditionIcon="store.conditionIcon"
              :feelslike="store.feelslike"
              :humidity="store.humidity"
              :pressure="store.pressure"
              :wind="store.wind"
              :uv="store.uv"
              :sunrise="store.sunrise"
              :sunset="store.sunset"
            />
          </CardCoxShadow>
        </div>
      </div>
    </Transition>

    <Transition name="fade-slide" mode="out-in">
      <div class="bottom" :key="`${placeKey}-bottom`">
        <div style="flex: 0.3">
          <CardCoxShadow>
            <DailyForecastCard :days="store.days" />
          </CardCoxShadow>
        </div>
        <div style="flex: 0.7">
          <CardCoxShadow>
            <HourlyForecast :hours="store.hours" />
          </CardCoxShadow>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.top {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

.bottom {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}

/* Transition animations for place data changes */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease-in-out;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
