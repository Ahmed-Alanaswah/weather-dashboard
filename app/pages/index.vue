<script setup lang="ts">
import { onMounted, computed } from "vue";
import CardCoxShadow from "../components/CardCoxShadow.vue";
import CurrentTimeInfoCard from "../components/CurrentTimeInfoCard.vue";
import CurrentInfoWeather from "../components/CurrentInfoWeather.vue";
import DailyForecastCard from "../components/DailyForecastCard.vue";
import HourlyForecast from "../components/HourlyForecast.vue";
import { useWeatherStore } from "../../stores/weather";
import { getCurruntLocationInf } from "../helpers/getCurruntLocationInf";

const store = useWeatherStore();

// Create a key that changes when place data changes to trigger transitions
// Use lastQuery which changes whenever a new search is made
const placeKey = computed(() => store.lastQuery || store.city || "default");

onMounted(() => {
  // Attempt to use browser geolocation on initial load; fall back to Amman
  getCurruntLocationInf();
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

<style scoped src="../../public/assets/css/mainPage.css"></style>
