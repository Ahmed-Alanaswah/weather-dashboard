<template>
  <div class="card-container">
    <h2>5 Days Forecast</h2>
    <div v-if="props.days && props.days.length > 0">
      <div v-for="(day, idx) in props.days" :key="idx" class="day-card">
        <img :src="day.icon" alt="condition icon" />
        <span class="day-name">{{ day.avg_temperature }}°C </span>
        <span class="day-date">{{ day.date }}</span>
      </div>
    </div>
    <div v-else class="loading-days">
      <div v-for="i in 5" :key="i" class="day-card skeleton-day">
        <div class="skeleton-icon"></div>
        <div class="skeleton-line skeleton-temp"></div>
        <div class="skeleton-line skeleton-date"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DayItem } from "~~/types/weather";

const props = withDefaults(
  defineProps<{
    days?: DayItem[];
  }>(),
  {
    days: () => [] as DayItem[],
  }
);
</script>

<style scoped src="../../../assets/css/DailyForecastCard.css"></style>
