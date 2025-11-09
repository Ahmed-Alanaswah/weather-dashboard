<template>
  <div class="body-container" v-cloak>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { onMounted, nextTick } from "vue";

onMounted(async () => {
  // Wait for next tick to ensure all components are mounted
  await nextTick();
  
  // Mark body and app as loaded to prevent FOUC
  if (typeof document !== "undefined") {
    // Use requestAnimationFrame to ensure CSS is fully loaded
    requestAnimationFrame(() => {
      document.body.classList.add("loaded");
      const nuxtApp = document.getElementById("__nuxt");
      if (nuxtApp) {
        nuxtApp.classList.add("loaded");
      }
    });
  }
});
</script>
