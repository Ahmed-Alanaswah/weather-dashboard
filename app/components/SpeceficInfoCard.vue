<template>
  <div class="container">
    <img :src="props.url" />
    <p class="temp">{{ props.info }} {{ props.unit }}</p>
    <p class="desc">{{ props.desc }}</p>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    url?: string;
    info?: string | number;
    unit?: string;
    desc?: string;
  }>(),
  {
    url: "",
    info: "",
    desc: "",
    unit: "",
  }
);
</script>

<style scoped src="../../public/assets/css/SpeceficInfoCard.css"></style>
