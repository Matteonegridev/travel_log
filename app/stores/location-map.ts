// stores/location.ts - Minimal fix for your current approach
import type { MapPin } from "~~/server/types/map-types";

export const useLocationStore = defineStore("locationStore", () => {
  const { data, status, refresh, pending } = useLazyFetch("/api/location", { default: () => [] });

  const isLoading = computed(() => {
    return status.value === "pending" || pending.value;
  });

  const sidebarLinks = computed(() =>
    data.value?.map(location => ({
      label: location.name,
      href: `location-${location.slug}`,
      icon: "tabler:map-pin-filled",
      id: location.id,
    })),
  );

  const getCoordinates = computed<MapPin[]>(() => {
    return data.value?.map(value => ({
      id: value.id,
      lat: value.lat,
      long: value.long,
      label: value.name,
    }));
  });

  return {
    location: data,
    isLoading,
    sidebarLinks,
    refresh,
    getCoordinates,
  };
});
