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
</script>

<style scoped src="../../public/assets/css/CurrentTimeInfoCard.css"></style>
