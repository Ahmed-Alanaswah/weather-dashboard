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

<style scoped>
/* Main Infos */
.current-info-weather {
  display: flex;
  color: var(--card-color, #ffffff);
  justify-content: space-between;
}
.center-info {
  flex: 0.3;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 50px;
}

.center-info img {
  width: 200px;
}

.center-info h2 {
  margin: 0;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
}

.left-info {
  flex: 0.3;
  height: 291px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 20px;
  padding-top: 20px;
}
.right-info {
  display: flex;
  flex: 0.3;
  flex-wrap: wrap;
  padding-top: 25px;
  justify-content: space-between;
}

.left-info > h2 {
  font-style: normal;
  font-weight: 700;
  font-size: 53px;
  line-height: 50px;
  margin: 0;
  color: var(--card-color, #ffffff);
}
.left-info > p {
  margin: 0;
  color: var(--muted-color, rgba(255,255,255,0.8));
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 48px;
}

.left-info > p span {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
}
.left-info .astro:first-of-type {
  margin-top: 40px;
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
.astro > span > span {
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 30px;
}

.astro > span > span + span {
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
}
</style>
