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
import { useUiStore } from "../../stores/ui";

const ui = useUiStore();
function toggle() {
  ui.toggleTheme();
}
</script>

<style scoped>
.toggle-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.toggle {
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
}
.track {
  width: 100px;
  height: 38.61px;
  border-radius: 40px;
  background: var(--toggle-track-bg, #d9d9d9);
  display: inline-flex;
  align-items: center;
  padding: 4px;
  box-sizing: border-box;
  transition: background 200ms ease;
}
.track.on {
  background: var(--toggle-track-on-bg, #d9d9d9);
  border: 1px solid var(--toggle-track-on-bg, #000000);
}
.thumb {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--thumb-bg, #111);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transform: translateX(5px);
  transition: transform 200ms ease, background 200ms ease;
}
.thumb.on {
  transform: translateX(55px);
  background: var(--thumb-on-bg, #ffffff);
}
.toggle-label {
  font-style: normal;
  font-weight: 800;
  font-size: 18px;
  line-height: 10px;
  color: var(--toggle-label-color, #000);
}

.toggle-label.on {
  color: var(--toggle-label-on-color, #ffffff);
}
</style>
