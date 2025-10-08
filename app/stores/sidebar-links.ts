import type { Links } from "~~/server/types/map-types";

export const useLinksStore = defineStore("linksStore", () => {
  const locationStore = useLocationStore();
  const { location } = storeToRefs(locationStore);

  const sidebarLinks = computed<Links[]>(() => {
    return location?.value.map(location => ({
      name: location.name,
      href: `/dashboard/location/${location.slug}`,
      icon: "tabler:map-pin-filled",
      id: location.id,
      description: null,
      lat: location.lat,
      long: location.long,
    }));
  });

  return {
    sidebarLinks,
  };
});
