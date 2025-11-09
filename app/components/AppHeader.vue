<template>
  <header class="app-header">
    <div>
      <ToggleThemeMode @toggle="onToggleTheme" />
    </div>
    <div>
      <SearchBar />
    </div>

    <div>
      <CurrentLocationButton @getLocation="onGetLocation" />
    </div>
  </header>
</template>

<script setup lang="ts">
import SearchBar from "./SearchBar.vue";
import ToggleThemeMode from "./ToggleThemeMode.vue";
import CurrentLocationButton from "./CurrentLocationButton.vue";

function onGetLocation() {
  // placeholder for location logic
}

function onToggleTheme() {
  // placeholder for theme toggle logic
}
</script>

<style scoped src="../../public/assets/css/AppHeader.css"></style>
