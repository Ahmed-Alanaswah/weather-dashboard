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
  /* Weather Dashboard - global settings */

  position: relative;
  width: 1512px;
  height: 982px;
  padding-top: 63px;
  /* default (dark) background */
  background: linear-gradient(
    110.05deg,
    #383838 0%,
    rgba(158, 158, 158, 0) 71.82%
  );
  color: #111111;
  font-family: "Poppins", system-ui, -apple-system, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, "Noto Sans", sans-serif;
}

/* light theme body override */
.theme-light body {
  background: linear-gradient(112.65deg, #ffffff 0.28%, #466173 178.65%);
}

.layout-container {
  width: 1326px;
  margin: 0 auto;
}

/* Theme variables: provide card and icon rules for light/dark themes */
:root.theme-dark {
  --card-bg: #444;
  --card-color: #ffffff;
  --muted-color: rgba(255, 255, 255, 0.8);
  --action-bg: #4cbb17;
  --action-color: #ffffff;
  --toggle-track-bg: #d9d9d9;
  --card-card-bg: #373636;
  --card-card-night-bg: #373636;
  --toggle-track-on-bg: #111111;
  --thumb-bg: #111111;
  --thumb-on-bg: #ffffff;
  --toggle-label-color: #000000;
  --toggle-label-on-color: #ffffff;
  --icon-filter: none;
}

:root.theme-light {
  /* User requested card background #D9D9D9; assume readable text should be dark */
  --card-bg: #d9d9d9;
  --card-color: #111111;
  --muted-color: rgba(17, 17, 17, 0.8);
  --card-card-bg: linear-gradient(
    170.72deg,
    #f88508 -14.96%,
    rgba(246, 250, 217, 0) 160.78%
  );
  --card-card-night-bg: linear-gradient(
    173.7deg,
    #443d64 -15.92%,
    rgba(101, 130, 198, 0) 192.45%
  );
  --action-bg: #4cbb17;
  --action-color: #ffffff;
  --toggle-track-bg: #d9d9d9;
  --toggle-track-on-bg: #d9d9d9;
  --thumb-bg: #111111;
  --thumb-on-bg: #ffffff;
  --toggle-label-color: #000000;
  --toggle-label-on-color: #111111;
  /* invert light (white) PNGs to appear black */
  --icon-filter: invert(1) grayscale(1) contrast(0.9);
}

/* Apply icon filter to icons located under /assets/icons when in light theme */
.theme-light img[src*="/assets/icons/"] {
  filter: var(--icon-filter, none);
}

.theme-dark img[src*="/assets/icons/"] {
  filter: var(--icon-filter, none);
}
</style>
