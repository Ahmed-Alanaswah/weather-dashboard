<template>
  <div class="error-container">
    <div class="error-box">
      <h1 class="error-code">{{ error.statusCode || "Error" }}</h1>
      <p class="error-message">
        {{ error.message || "Something went wrong. Please try again later." }}
      </p>

      <div class="error-actions">
        <button class="btn" @click="handleHome">Go Home</button>
        <button class="btn-outline" @click="handleRetry">Retry</button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

const handleHome = () => {
  navigateTo("/");
};

const handleRetry = () => {
  window.location.reload();
};
</script>

<style src="./assets/css/error.css"></style>
