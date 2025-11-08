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

// The component still accepts slot content if you prefer that pattern —
// but the primary API requested is props: city, time, date.
</script>

<style scoped>
.card-container {
  width: 445px;
}
.day-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  text-align: center;
  margin: 0;
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;
}

.day-card > span {
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 36px;
}

.day-card > span + span {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
}
</style>
