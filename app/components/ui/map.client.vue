<script setup>
import {
  useMap,
} from "@indoorequal/vue-maplibre-gl";
import clsx from "clsx";

const mapStore = useMapStore();
const { getCoordinates } = storeToRefs(mapStore);

const colorMode = useColorMode();

const light = "https://tiles.openfreemap.org/styles/liberty";
const dark = "/style/dark.json";
const center = [-99.17909, 38.79545];
const zoom = 4;
const mapContainer = ref(null);

const map = useMap();
watch(
  () => map.isLoaded,
  () => {
    map.map.setProjection({
      type: "globe",
    });
  },
);
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
        <template #marker>
          <div
            class="tooltip"
            :data-tip="value.label"
          >
            <Icon
              name="tabler:map-pin-filled"
              size="28"
              :class="clsx(colorMode.value === 'dark' ? 'text-primary' : 'text-secondary')"
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
