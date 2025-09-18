export const useLocationStore = defineStore("locationStore", () => {
  const { data, pending, refresh } = useLazyFetch("/api/location");

  const sidebarLinks = computed(() =>
    (
      data.value?.map(location => ({
        label: location.name,
        href: `location-${location.slug}`,
        icon: "tabler:map-pin-filled",
        id: location.id,
      })) ?? []
    ),
  );

  return { location: data, pending, sidebarLinks, refresh };
});
