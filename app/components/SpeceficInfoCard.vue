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

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #ffffff;
  width: 100%;
}

img {
  width: 40px;
  height: 40px;
}
p {
  margin: 4px 0;
}
</style>
