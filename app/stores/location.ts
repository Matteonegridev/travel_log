export const useLocationStore = defineStore("locationStore", () => {
  const { data, status, refresh } = useLazyFetch("/api/location", { default: () => [], server: true });

  const mapStore = useMapStore();
  const linksStore = useLinksStore();

  effect(() => {
    if (data.value) {
      mapStore.getCoordinates = data.value?.map(coord => ({
        id: coord.id,
        label: coord.name,
        lat: coord.lat,
        long: coord.long,
      }));
      linksStore.sidebarLinks = data.value?.map(location => ({
        label: location.name,
        href: `location-${location.slug}`,
        icon: "tabler:map-pin-filled",
        id: location.id,
      }));
    }
    linksStore.isLoading = status.value === "pending";
  });

  return {
    location: data,
    refresh,
    status,
  };
});
