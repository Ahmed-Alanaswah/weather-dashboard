<template>
  <div class="toggle-wrapper">
    <button
      class="toggle"
      role="switch"
      :aria-checked="ui.theme === 'dark'"
      @click="toggle"
      :title="`Toggle theme: ${ui.theme === 'dark' ? 'Dark' : 'Light'}`"
    >
      <span class="track" :class="{ on: ui.theme === 'dark' }">
        <span class="thumb" :class="{ on: ui.theme === 'dark' }"></span>
      </span>
    </button>
    <div class="toggle-label" :class="{ on: ui.theme === 'dark' }">
      {{ ui.theme === "dark" ? "Dark mode" : "Light mode" }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUiStore } from "../../../stores/ui";

const ui = useUiStore();
function toggle() {
  ui.toggleTheme();
}
</script>

<style scoped src="../../../assets/css//ToggleThemeMode.css"></style>
