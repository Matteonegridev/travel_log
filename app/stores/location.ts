// stores/location.ts
export const useLocationStore = defineStore("locationStore", () => {
  const { data, pending, refresh } = useFetch("/api/location");

  const sidebarItemsToWatch = computed(() =>
    (data.value || []).map(location => ({
      label: location.name,
      icon: "tabler:map-pin-filled",
      href: `/dashboard/location/${location.id}`,
      id: `location-${location.id}`,
    })),
  );

  return {
    location: data,
    pending,
    refresh,
    sidebarItemsToWatch,
  };
});
