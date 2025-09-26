import type { Links } from "~~/server/types/map-types";

export const useLinksStore = defineStore("linksStore", () => {
  const sidebarLinks = ref<Links[]>([]);
  const isLoading = ref(false);

  return { sidebarLinks, isLoading };
});
