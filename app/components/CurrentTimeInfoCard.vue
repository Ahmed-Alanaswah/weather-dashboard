<template>
  <div class="current-time-info">
    <h2 class="city">{{ props.city }}</h2>
    <h1 class="time">{{ props.time }}</h1>
    <p class="date">{{ props.date }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    city?: string;
    time?: string;
    date?: string;
  }>(),
  {
    city: "",
    time: "",
    date: "",
  }
);

// The component still accepts slot content if you prefer that pattern —
// but the primary API requested is props: city, time, date.
</script>

<style scoped>
/* Main Infos */
.current-time-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: var(--card-color, #ffffff);
  padding: 34px;
}
.city {
  margin-bottom: 50px;
  margin-top: 0px;

  font-style: normal;
  font-weight: 700;
  font-size: 36px;
  line-height: 54px;
}
.time {
  margin-bottom: 0px;
  margin-top: 0px;
  font-style: normal;
  font-weight: 700;
  font-size: 96px;
  line-height: 125px;
}

.date {
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 30px;
  margin: 0;
}
</style>
