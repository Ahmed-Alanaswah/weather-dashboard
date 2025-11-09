<template>
  <div class="current-info-weather">
    <div class="left-info">
      <h2>{{ props.temp }}°C</h2>
      <p class="time"><span>Feel like:</span> {{ props.feelslike }}°C</p>
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
      <div class="top">
        <SpeceficInfoCard
          :url="icons.humidity"
          :info="props.humidity"
          desc="Humidity"
          unit="%"
        />

        <SpeceficInfoCard
          :url="icons.wind"
          :info="props.wind"
          unit="km/h"
          desc="Wind"
        />
      </div>
      <div class="bottom">
        <SpeceficInfoCard
          :url="icons.pressure"
          :info="props.pressure"
          desc="Pressure"
          unit="hpa"
        />

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

<style scoped src="../../public/assets/css/CurrentInfoWeather.css"></style>
