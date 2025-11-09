<template>
  <div class="layout-container" v-cloak>
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

// Apply theme immediately on client side
if (typeof document !== "undefined") {
  const savedTheme =
    localStorage.getItem("theme") || ("dark" as "light" | "dark");
  applyTheme(savedTheme);
}

onMounted(() => {
  applyTheme(ui.theme || "dark");
  watch(
    () => ui.theme,
    (v) => applyTheme(v || "dark")
  );
});
</script>
