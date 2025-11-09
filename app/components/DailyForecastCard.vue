<template>
  <div class="card-container">
    <h2>5 Days Forecast</h2>
    <div v-for="(day, idx) in props.days" :key="idx">
      <div class="day-card">
        <img :src="day.icon" alt="condition icon" />
        <span class="day-name">{{ day.avg_temperature }}°C </span>
        <span class="day-date">{{ day.date }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    days?: Array<{
      icon?: string;
      date?: string;
      avg_temperature?: number | null;
    }>;
  }>(),
  {
    days: [],
  }
);
</script>

<style scoped src="../../public/assets/css/DailyForecastCard.css"></style>
