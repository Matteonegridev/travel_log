export const useLocationStore = defineStore("locationStore", () => {
  const { data, pending, refresh } = useLazyFetch("/api/location");

  const sidebarLinks = computed(() =>
    (
      data.value?.map(location => ({
        label: location.name,
        href: `location-${location.slug}`,
        icon: "tabler:map-pin-filled",
        id: location.id,
        // we need to make sure data is going to be these values or an empty array, we don't want undefined values.
      })) ?? []
    ),
  );

  return { location: data, pending, sidebarLinks, refresh };
});
