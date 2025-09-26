import type { Links } from "~~/server/types/map-types";

export const useLinksStore = defineStore("linksStore", () => {
  const locationStore = useLocationStore();
  const { location } = storeToRefs(locationStore);

  const sidebarLinks = computed<Links[]>(() => {
    return location?.value.map(location => ({
      label: location.name,
      href: `location-${location.slug}`,
      icon: "tabler:map-pin-filled",
      id: location.id,
    }));
  });

  return {
    sidebarLinks,
  };
});
