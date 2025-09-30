<script setup>
import clsx from "clsx";

const mapStore = useMapStore();
const { selectedPoint } = storeToRefs(mapStore);

const { getCoordinates } = storeToRefs(mapStore);

const colorMode = useColorMode();

const light = "https://tiles.openfreemap.org/styles/liberty";
const dark = "/style/dark.json";
const center = [-99.17909, 38.79545];
const zoom = 8;
const mapContainer = ref(null);

onMounted(() => {
  mapStore.init();
});
</script>

<template>
  <div
    class="map-wrapper"
  >
    <MglMap
      ref="mapContainer"
      :map-style="clsx(colorMode.value === 'dark' ? dark : light)"
      :center="center"
      :zoom="zoom"
    >
      <mgl-marker
        v-for="value in getCoordinates"
        :key="value.id"
        :coordinates="[value.long, value.lat]"
      >
        <mgl-popup>
          <h1 class="text-lg">
            {{ value.name }}
          </h1>
          <p class="text-md">
            {{ value.description }}
          </p>
        </mgl-popup>
        <template #marker>
          <div
            class="tooltip hover:cursor-pointer"
            :data-tip="value.name"
            @mouseenter="selectedPoint = value"
            @mouseleave="selectedPoint = null"
          >
            <Icon
              name="tabler:map-pin-filled"
              size="28"
              :class="clsx(
                selectedPoint?.id === value.id
                  ? 'text-accent transition-all duration-250 ease-in-out'
                  : colorMode.value === 'light'
                    ? 'text-secondary'
                    : 'text-primary',
              )"
            />
          </div>
        </template>
      </mgl-marker>
    </MglMap>
  </div>
</template>

<style scoped>
.map-wrapper {
  height: 60dvh;
  width:100%;
  padding-top: 1rem;

}

.map-wrapper :deep(.maplibregl-map) {
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
</style>
