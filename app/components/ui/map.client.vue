<script setup>
import clsx from "clsx";

const mapStore = useMapStore();
const { getCoordinates } = storeToRefs(mapStore);

const colorMode = useColorMode();

const light = "https://tiles.openfreemap.org/styles/liberty";
const dark = "/style/dark.json";
const center = [12.550343, 55.665957];
const zoom = 2;
</script>

<template>
  <MglMap
    height="500px"
    :map-style="clsx(colorMode.value === 'dark' ? dark : light)"
    :center="center"
    :zoom="zoom"
  >
    <mgl-marker
      v-for="value in getCoordinates"
      :key="value.id"
      :coordinates="[value.long, value.lat]"
    >
      <template #marker>
        <Icon
          name="tabler:map-pin-filled"
          size="28"
          :class="clsx(colorMode.value === 'dark' ? 'text-primary' : 'text-secondary')"
        />
      </template>
    </mgl-marker>
  </MglMap>
</template>
