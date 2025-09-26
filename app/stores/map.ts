import type { MapPin } from "~~/server/types/map-types";

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

  return {
    getCoordinates,

  };
});
