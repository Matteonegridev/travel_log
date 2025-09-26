import type { MapPin } from "~~/server/types/map-types";

export const useMapStore = defineStore("mapStore", () => {
  const getCoordinates = ref<MapPin[]>([]);

  return {
    getCoordinates,
  };
});
