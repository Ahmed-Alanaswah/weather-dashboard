<template>
  <div class="card-container">
    <h2>Hourly Forecast</h2>
    <div class="hour-container">
      <div class="hour-card" v-for="(hour, idx) in props.hours" :key="idx">
        <span class="hour-time">{{ hour.time }}</span>
        <img :src="hour.icon" :alt="`${hour.time} condition`" />
        <span class="time-temp">{{ hour.temp }}°C</span>
        <img
          src="/assets/icons//direction-arrow.png"
          alt="direction"
          :style="{ transform: `rotate(${getWindDegrees(hour.wind_dir)}deg)` }"
        />
        <!-- <span class="time-temp">{{ hour.wind_dir }}</span> -->
        <span class="time-date">{{ hour.wind_kph }} km/h</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getWindDegrees } from "../helpers/getDirectionHelper";
const props = withDefaults(
  defineProps<{
    hours?: Array<{
      time?: string;
      wind_kph?: number | null;
      temp?: number | null;
      icon?: string;
      wind_dir?: string;
    }>;
  }>(),
  {
    hours: [],
  }
);
</script>

<style scoped src="../../public/assets/css/HourlyForecast.css"></style>
