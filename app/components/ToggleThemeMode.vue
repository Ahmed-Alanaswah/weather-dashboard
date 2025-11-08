<template>
  <button class="toggle-theme" @click="toggle">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUiStore } from "../../stores/ui";

const ui = useUiStore();
function toggle() {
  ui.toggleTheme();
}
const label = computed(() =>
  ui.theme === "dark" ? "Switch to Light" : "Switch to Dark"
);
</script>

<style scoped>
.toggle-theme {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: transparent;
  color: inherit;
  cursor: pointer;
}
</style>
