<script setup lang="ts">
import { onMounted, computed } from "vue";
import CardCoxShadow from "../components/CardCoxShadow.vue";
import CurrentTimeInfoCard from "../components/CurrentTimeInfoCard.vue";
import CurrentInfoWeather from "../components/CurrentInfoWeather.vue";
import DailyForecastCard from "../components/DailyForecastCard.vue";
import HourlyForecast from "../components/HourlyForecast.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import { useWeatherStore } from "../../stores/weather";
import { getCurruntLocationInf } from "../helpers/getCurruntLocationInf";

const store = useWeatherStore();

// Create a key that changes when place data changes to trigger transitions
// Use lastQuery which changes whenever a new search is made
const placeKey = computed(() => store.lastQuery || store.city || "default");

// Check if we should show loading state
const isLoading = computed(() => store.loading);
const hasData = computed(() => !!store.city);

onMounted(() => {
  // Attempt to use browser geolocation on initial load; fall back to Amman
  getCurruntLocationInf();
});
</script>

<template>
  <div class="app-container" v-cloak>
    <Transition name="fade-slide" mode="out-in">
      <div v-if="isLoading && !hasData" class="top" key="loading-top">
        <!-- Loading state for top section -->
        <div style="flex: 0.4">
          <CardCoxShadow>
            <LoadingSpinner message="Loading location..." />
          </CardCoxShadow>
        </div>
        <div style="flex: 0.6">
          <CardCoxShadow>
            <LoadingSpinner message="Loading weather data..." />
          </CardCoxShadow>
        </div>
      </div>
      <div v-else class="top" :key="placeKey">
        <!-- Example usage of the CardCoxShadow component wrapping CurrentTimeInfoCard -->
        <div
          style="flex: 0.4"
          class="card-wrapper"
          :class="{ 'loading-overlay': isLoading }"
        >
          <CardCoxShadow>
            <!-- pass fetched data as props -->
            <CurrentTimeInfoCard
              :city="store.city"
              :time="store.time"
              :date="store.date"
            />
          </CardCoxShadow>
          <div v-if="isLoading" class="loading-overlay-content">
            <LoadingSpinner />
          </div>
        </div>
        <div
          style="flex: 0.6"
          class="card-wrapper"
          :class="{ 'loading-overlay': isLoading }"
        >
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
          <div v-if="isLoading" class="loading-overlay-content">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    </Transition>

    <Transition name="fade-slide" mode="out-in">
      <div v-if="isLoading && !hasData" class="bottom" key="loading-bottom">
        <!-- Loading state for bottom section -->
        <div style="flex: 0.3">
          <CardCoxShadow>
            <LoadingSpinner message="Loading forecast..." />
          </CardCoxShadow>
        </div>
        <div style="flex: 0.7">
          <CardCoxShadow>
            <LoadingSpinner message="Loading hourly forecast..." />
          </CardCoxShadow>
        </div>
      </div>
      <div v-else class="bottom" :key="`${placeKey}-bottom`">
        <div
          style="flex: 0.3"
          class="card-wrapper"
          :class="{ 'loading-overlay': isLoading }"
        >
          <CardCoxShadow>
            <DailyForecastCard :days="store.days" />
          </CardCoxShadow>
          <div v-if="isLoading" class="loading-overlay-content">
            <LoadingSpinner />
          </div>
        </div>
        <div
          style="flex: 0.7"
          class="card-wrapper"
          :class="{ 'loading-overlay': isLoading }"
        >
          <CardCoxShadow>
            <HourlyForecast :hours="store.hours" />
          </CardCoxShadow>
          <div v-if="isLoading" class="loading-overlay-content">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped src="../../assets/css/mainPage.css"></style>
