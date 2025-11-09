<template>
  <div class="loading-spinner-container">
    <div class="spinner" :class="{ 'spinner-large': large }">
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
      <div class="spinner-ring"></div>
    </div>
    <p v-if="message" class="loading-message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    large?: boolean;
    message?: string;
  }>(),
  {
    large: false,
    message: "",
  }
);
</script>

<style scoped src="../../assets/css/LoadingSpinner.css"></style>
