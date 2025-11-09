<template>
  <div class="layout-container">
    <AppHeader />
    <slot />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useUiStore } from "../../stores/ui";

const ui = useUiStore();

function applyTheme(t: string) {
  const root =
    typeof document !== "undefined" ? document.documentElement : null;
  if (!root) return;
  root.classList.remove("theme-dark", "theme-light");
  root.classList.add(t === "dark" ? "theme-dark" : "theme-light");
}

onMounted(() => {
  applyTheme(ui.theme || "dark");
  watch(
    () => ui.theme,
    (v) => applyTheme(v || "dark")
  );
});
</script>

<!-- <style src="../../public/assets/css/Layout.css"></style> -->
