<script setup>
import clsx from "clsx";

const mapStore = useMapStore();

const { getCoordinates, selectedPoint, draggablePoint } = storeToRefs(mapStore);

const colorMode = useColorMode();

const light = "https://tiles.openfreemap.org/styles/liberty";
const dark = "/style/dark.json";
const center = [-99.17909, 38.79545];
const zoom = 8;
const mapContainer = ref(null);

onMounted(() => {
  mapStore.init();
});

// funzione che permette di assegnare lat and long ai draggable points:
function setDraggablePoints(points) {
  if (mapStore.draggablePoint) {
    mapStore.draggablePoint.lat = points.lat;
    mapStore.draggablePoint.long = points.lng;
  }
}
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
      <!-- draggable marker -->
      <mgl-marker
        v-if="draggablePoint"
        draggable
        :coordinates="center"
        @update:coordinates="setDraggablePoints"
      >
        <template #marker>
          <div
            class="tooltip hover:cursor-pointer"
            data-tip="Drag to your desired location"
          >
            <Icon
              name="tabler:map-pin-filled"
              size="32"
              class="text-warning"
            />
          </div>
        </template>
      </mgl-marker>
      <!-- draggable marker -->
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
            :class="clsx(selectedPoint?.id === value.id && 'tooltip-open')"
            :data-tip="value.name"
            @mouseenter="mapStore.highlightNoZoomOnPin(value)"
            @mouseleave="mapStore.highlightNoZoomOnPin(null)"
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
    <div
      :ref="mapStore.markOnMap"
      class="coordinates"
    />
  </div>
</template>

<style scoped>
.map-wrapper {
  width:100%;
  padding: 1.5rem;

}

.map-wrapper :deep(.maplibregl-map) {
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}
.coordinates {
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        position: absolute;
        bottom: 40px;
        left: 10px;
        padding: 5px 10px;
        margin: 0;
        font-size: 11px;
        line-height: 18px;
        border-radius: 3px;
        display: none;
    }
</style>
