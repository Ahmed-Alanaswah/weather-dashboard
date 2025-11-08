<template>
  <div class="card-container">
    <h2>Hourly Forecast</h2>
    <div class="hour-container">
      <div class="hour-card" v-for="(hour, idx) in props.hours" :key="idx">
        <span class="hour-time">{{ hour.time }}</span>
        <img :src="hour.icon" :alt="`${hour.time} condition`" />
        <span class="time-temp">{{ hour.temp }}°C</span>
        <span class="time-temp">{{ hour.wind_dir }}</span>
        <span class="time-date">{{ hour.wind_kph }} km/h</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

// The component still accepts slot content if you prefer that pattern —
// but the primary API requested is props: city, time, date.
</script>

<style scoped>
.hour-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #373636;
  border-radius: 40px;
  height: 270px;
  width: 130px;
  justify-content: center;
}
.hour-container {
  display: flex;
  justify-content: center;
  gap: 15px;
}
h2 {
  text-align: center;
  font-family: "Poppins";
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 48px;
}
span {
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
}
</style>
