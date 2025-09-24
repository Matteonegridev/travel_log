import type { MapPin } from "~~/server/types/map-types";

export const useMapStore = defineStore("mapStore", () => {
  const { data } = useLazyFetch("/api/location");

  const getCoordinates = computed<MapPin[]>(() => {
    return (
      data?.value?.map(value => ({
        id: value.id,
        lat: value.lat,
        long: value.long,
        label: value.name,
      }))
    ) ?? [];
  });

  return { getCoordinates };
});
