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
  color: var(--card-color, #ffffff);
  width: 100%;
}
/* 
img {
  width: 40px;
  height: 40px;
} */
.container > p + p {
  margin: 0;
}
.container > p {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
}

.container .desc {
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}
</style>
