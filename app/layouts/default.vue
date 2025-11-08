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

<style>
/* Make body background red for the whole app and center page content at 90% width */
body {
  /* Weather Dashboard - Black / Celsius */

  position: relative;
  width: 1512px;
  height: 982px;

  background: linear-gradient(
    110.05deg,
    #383838 0%,
    rgba(158, 158, 158, 0) 71.82%
  );
  font-family: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

.layout-container {
  width: 1200px;
  margin: 0 auto;
}
</style>
