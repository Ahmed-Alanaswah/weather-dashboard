<template>
  <div class="current-time-info">
    <h2 v-if="props.city" class="city">{{ props.city }}</h2>
    <div v-else class="skeleton-line skeleton-city"></div>
    <h1 v-if="props.time" class="time">{{ props.time }}</h1>
    <div v-else class="skeleton-line skeleton-time"></div>
    <p v-if="props.date" class="date">{{ props.date }}</p>
    <div v-else class="skeleton-line skeleton-date"></div>
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

<style scoped src="../../../assets/css/CurrentTimeInfoCard.css"></style>
