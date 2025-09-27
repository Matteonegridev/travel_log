import type { MapPin } from "~~/server/types/map-types";

import { useMap } from "@indoorequal/vue-maplibre-gl";
import { LngLatBounds } from "maplibre-gl";

export const useMapStore = defineStore("mapStore", () => {
  const locationStore = useLocationStore();
  const { location } = storeToRefs(locationStore);

  const getCoordinates = computed<MapPin[]>(() => {
    return location?.value.map(coord => ({
      id: coord.id,
      label: coord.name,
      lat: coord.lat,
      long: coord.long,
    }));
  });

  const mapInstance = useMap();

  effect(() => {
    const firstPoint = getCoordinates.value[0];
    if (!firstPoint)
      return;

    const bounds = getCoordinates.value.reduce((bounds, coordinates) => {
      return bounds.extend([coordinates.long, coordinates.lat]);
    }, new LngLatBounds([firstPoint.long, firstPoint.lat], [firstPoint.long, firstPoint.lat]));

    mapInstance.map?.fitBounds(bounds, { padding: 60 });
  });

  return {
    getCoordinates,
    mapInstance,
  };
});
