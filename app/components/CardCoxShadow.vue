<template>
  <div class="card-cox-shadow">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Simple wrapper component — content is provided via default slot
</script>

<style scoped>
.card-cox-shadow {
  filter: drop-shadow(10px 10px 4px rgba(0, 0, 0, 0.5));
  /* Minimal defaults so the slot content is visible. Override with CSS variables or wrapper classes as needed. */
  background: #444;
  color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-sizing: border-box;
  min-height: 250px;
}
</style>
