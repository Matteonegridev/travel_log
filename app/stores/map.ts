import type { MapPin } from "~~/server/types/map-types";

export const useMapStore = defineStore("mapStore", () => {
  const locationStore = useLocationStore();
  const { location } = storeToRefs(locationStore);
  const selectedPoint = ref<MapPin | null>(null);

  const getCoordinates = computed<MapPin[]>(() => {
    return location?.value;
  });

  async function init() {
    const { useMap } = await import("@indoorequal/vue-maplibre-gl");
    const { LngLatBounds } = await import("maplibre-gl");
    const mapInstance = useMap();

    effect(() => {
      const firstPoint = getCoordinates.value[0];
      if (!firstPoint)
        return;

      if (getCoordinates.value.length === 1) {
        const points = getCoordinates.value[0];
        if (!points)
          return;
        mapInstance.map?.flyTo({ center: [points?.long, points?.lat], zoom: 12, padding: 60 });
      }
      else {
        const bounds = getCoordinates.value.reduce((bounds, coordinates) => {
          return bounds.extend([coordinates.long, coordinates.lat]);
        }, new LngLatBounds([firstPoint.long, firstPoint.lat], [firstPoint.long, firstPoint.lat]));

        mapInstance.map?.fitBounds(bounds, { padding: 60 });
      }
    });
  }

  return {
    getCoordinates,
    init,
    selectedPoint,
  };
});
