import type { MapPin } from "~~/server/types/map-types";

import { useMapBounds } from "~/composable/map-bounds";

export const useMapStore = defineStore("mapStore", () => {
  const selectedPoint = ref<MapPin | null>(null);
  const draggablePoint = ref<MapPin | null>(null);
  const coordinates = ref<MapPin[]>([]);
  // const zoomOnPin = ref(true);

  // Sometimes MapPin is array other times not array, that's why the creation of a computed property with a setter:
  const getCoordinates = computed<MapPin[]>({
    get: () => coordinates.value,
    set: (newValue: MapPin | MapPin[]) => {
      coordinates.value = Array.isArray(newValue) ? newValue : [newValue];
    },
  });

  // const highlightNoZoomOnPin = (point: MapPin | null) => {
  //   zoomOnPin.value = false;
  //   selectedPoint.value = point;
  // };

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const mapInstance = useMap();
    const { mapBounds } = useMapBounds();

    mapBounds(mapInstance, getCoordinates.value, draggablePoint.value);

    // zoom to:
    effect(() => {
      // se il marker draggable ha valori non vi è zoom
      if (draggablePoint.value)
        return;
      // if (selectedPoint.value) {
      //   if (zoomOnPin.value) {
      //     mapInstance.map?.flyTo({
      //       center: [selectedPoint.value.long, selectedPoint.value.lat],
      //       speed: 0.1,
      //     });
      //   }
      //   zoomOnPin.value = true;
      // }
      // else {
      if (!selectedPoint.value) {
        mapBounds(mapInstance, getCoordinates.value);
      }
      // }
    });

    watch(draggablePoint, (newVal, oldVal) => {
      if (newVal && !oldVal) {
        mapInstance.map?.flyTo({ center: [newVal?.long, newVal?.lat], zoom: 6, speed: 0.8, padding: 100 });
      }
    }, { deep: true, immediate: true });
  }

  return {
    getCoordinates,
    init,
    selectedPoint,
    // highlightNoZoomOnPin,
    draggablePoint,

  };
});
