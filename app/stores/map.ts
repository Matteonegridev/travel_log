import type { MapPin } from "~~/server/types/map-types";

import { useMapBounds } from "~/composable/map-bounds";

export const useMapStore = defineStore("mapStore", () => {
  const locationStore = useLocationStore();
  const { location } = storeToRefs(locationStore);
  const selectedPoint = ref<MapPin | null>(null);
  const draggablePoint = ref<MapPin | null>(null);
  const zoomOnPin = ref(true);

  const getCoordinates = computed<MapPin[]>(() => {
    return location?.value;
  });

  const highlightNoZoomOnPin = (point: MapPin | null) => {
    zoomOnPin.value = false;
    selectedPoint.value = point;
  };

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const mapInstance = useMap();
    const { mapBounds } = useMapBounds();

    mapBounds(mapInstance, getCoordinates.value);

    // zoom to:
    effect(() => {
      if (draggablePoint.value)
        return;
      if (selectedPoint.value) {
        if (zoomOnPin.value) {
          mapInstance.map?.flyTo({
            center: [selectedPoint.value.long, selectedPoint.value.lat],
            speed: 0.2,
          });
        }
        zoomOnPin.value = true;
      }
      else {
        mapBounds(mapInstance, getCoordinates.value);
      }
    });
  }

  return {
    getCoordinates,
    init,
    selectedPoint,
    highlightNoZoomOnPin,
    draggablePoint,
  };
});
