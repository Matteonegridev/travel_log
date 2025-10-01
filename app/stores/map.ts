import type { MapPin } from "~~/server/types/map-types";

import { useMapBounds } from "~/composable/map-bounds";

export const useMapStore = defineStore("mapStore", () => {
  const locationStore = useLocationStore();
  const { location } = storeToRefs(locationStore);
  const selectedPoint = ref<MapPin | null>(null);
  const noZoomOnPin = ref(true);

  const getCoordinates = computed<MapPin[]>(() => {
    return location?.value;
  });

  const highlightNoZoomOnPin = (point: MapPin) => {
    noZoomOnPin.value = false;
    selectedPoint.value = point;
  };

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const mapInstance = useMap();
    const { mapBounds } = useMapBounds();

    mapBounds(mapInstance, getCoordinates.value);

    // zoom to:
    effect(() => {
      if (selectedPoint.value) {
        if (noZoomOnPin.value) {
          mapInstance.map?.flyTo({
            center: [selectedPoint.value.long, selectedPoint.value.lat],
            speed: 0.5,
          });
        }
        noZoomOnPin.value = true;
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
  };
});
