<template>
  <div class="current-info-weather">
    <div class="left-info">
      <h2>{{ props.temp }}°C</h2>
      <p class="time">Feel like: {{ props.feelslike }}°C</p>
      <div class="astro">
        <img :src="icons.sunrise" alt="sunrise" />
        <span>
          <span>Sunrise</span>
          <span>{{ props.sunrise }}</span>
        </span>
      </div>
      <div class="astro">
        <img :src="icons.sunset" alt="sunset" />
        <span>
          <span>Sunrset</span>
          <span>{{ props.sunset }}</span>
        </span>
      </div>
    </div>
    <div class="center-info">
      <img :src="conditionIcon" alt="condition icon" />
      <h2 class="time">{{ props.condition }}</h2>
    </div>
    <div class="right-info">
      <div>
        <SpeceficInfoCard
          :url="icons.humidity"
          :info="props.humidity"
          desc="Humidity"
          unit="%"
        />
      </div>
      <div>
        <SpeceficInfoCard
          :url="icons.wind"
          :info="props.wind"
          unit="km/h"
          desc="Wind"
        />
      </div>
      <div>
        <SpeceficInfoCard
          :url="icons.pressure"
          :info="props.pressure"
          desc="Pressure"
          unit="hpa"
        />
      </div>

      <div>
        <SpeceficInfoCard :url="icons.uv" :info="props.uv" desc="UV" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SpeceficInfoCard from "./SpeceficInfoCard.vue";

const props = withDefaults(
  defineProps<{
    city?: string;
    time?: number | string;
    date?: string;
    temp?: number | string;
    condition?: string;
    conditionIcon?: string;
    feelslike?: string | number;
    sunrise?: string;
    sunset?: string;
    humidity?: string | number;
    pressure?: string | number;
    wind?: string | number;
    uv?: string | number;
  }>(),
  {
    city: "",
    time: "",
    date: "",
    temp: "",
    condition: "",
    conditionIcon: "",
    feelslike: "",
    sunrise: "",
    sunset: "",
    humidity: "",
    pressure: "",
    wind: "",
    uv: "",
  }
);

import { computed } from "vue";

// icons are served from `public/assets/icons` — use absolute URLs
const icons = {
  humidity: "/assets/icons/humidity-white.png",
  wind: "/assets/icons/wind-white.png",
  pressure: "/assets/icons/pressure-white.png",
  uv: "/assets/icons/uv-white.png",
  sunrise: "/assets/icons/sunrise-white.png",
  sunset: "/assets/icons/sunset-white.png",
};
</script>

<style scoped>
/* Main Infos */
.current-info-weather {
  display: flex;
  color: #ffffff;
  justify-content: space-between;
}
.center-info {
  flex: 0.3;
  text-align: center;
}

.center-info img {
  width: 120px;
}
.left-info {
  flex: 0.3;
}
.right-info {
  display: flex;
  flex: 0.3;
  flex-wrap: wrap;
}

.right-info > div {
  /* flex: 0.5; */
  width: 50%;
}

.left-info > h2 {
  font-size: 40px;
  margin: 0;
  background: linear-gradient(
    84.4deg,
    #ffffff -16.56%,
    rgba(255, 255, 255, 0) 118.43%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
.left-info > p {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 18px;
}

.left-info .astro {
  display: flex;
  gap: 10px;
  margin-left: 15px;
  margin-top: 15px;
}
.left-info .astro > span {
  display: flex;
  flex-direction: column;
}
</style>
