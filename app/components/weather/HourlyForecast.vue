<template>
  <div class="card-container">
    <h2>Hourly Forecast</h2>
    <div class="hour-container">
      <template v-if="props.hours && props.hours.length > 0">
        <div class="hour-card" v-for="(hour, idx) in props.hours" :key="idx">
          <span class="hour-time">{{ hour.time }}</span>
          <img :src="hour.icon" :alt="`${hour.time} condition`" />
          <span class="time-temp">{{ hour.temp }}°C</span>
          <img
            src="/assets/icons/wind/direction-arrow.png"
            alt="direction"
            :style="{
              transform: `rotate(${getWindDegrees(hour.wind_dir)}deg)`,
            }"
          />
          <!-- <span class="time-temp">{{ hour.wind_dir }}</span> -->
          <span class="time-date">{{ hour.wind_kph }} km/h</span>
        </div>
      </template>
      <template v-else>
        <div
          v-for="i in 5"
          :key="i"
          class="hour-card skeleton-hour"
          :class="{ 'hour-card-night': i === 4 || i === 5 }"
        >
          <div class="skeleton-line skeleton-time"></div>
          <div class="skeleton-icon"></div>
          <div class="skeleton-line skeleton-temp"></div>
          <div class="skeleton-line skeleton-wind"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { HourItem } from "~~/types/weather";
import { getWindDegrees } from "../../helpers/getDirectionHelper";
const props = withDefaults(
  defineProps<{
    hours?: HourItem[];
  }>(),
  {
    hours: () => [] as HourItem[],
  }
);
</script>

<style scoped src="../../../assets/css//HourlyForecast.css"></style>
