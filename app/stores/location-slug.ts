import type { SelectLocationWithLogs } from "~~/server/database/schema";

export const useLocationSlug = defineStore("locationSlug", () => {
  const route = useRoute();
  const locationWithSlug = computed(() => `/api/location/${route.params.slug}`);
  const { data, status, error, refresh } = useLazyFetch<SelectLocationWithLogs>(locationWithSlug, {
    immediate: false,
    watch: false,
  });

  return {
    slugLocation: data,
    error,
    refreshSlug: refresh,
    slugStatus: status,

  };
});
