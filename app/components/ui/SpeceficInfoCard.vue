<template>
  <div class="container">
    <img v-if="props.url" :src="props.url" />
    <div v-else class="skeleton-icon"></div>
    <p v-if="props.info !== null && props.info !== ''" class="temp">
      {{ props.info }} {{ props.unit }}
    </p>
    <div v-else class="skeleton-line skeleton-info"></div>
    <p v-if="props.desc" class="desc">{{ props.desc }}</p>
    <div v-else class="skeleton-line skeleton-desc"></div>
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

<style scoped src="../../../assets/css/SpeceficInfoCard.css"></style>
