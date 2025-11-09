<template>
  <header class="app-header">
    <div>
      <ToggleThemeMode />
    </div>
    <div>
      <SearchBar />
    </div>

    <div>
      <CurrentLocationButton />
    </div>
  </header>
</template>

<script setup lang="ts">
import SearchBar from "./header/SearchBar.vue";
import ToggleThemeMode from "./header/ToggleThemeMode.vue";
import CurrentLocationButton from "./header/CurrentLocationButton.vue";
</script>

<style scoped src="../../assets/css/AppHeader.css"></style>
