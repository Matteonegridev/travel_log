export const useLocationStore = defineStore("locationStore", () => {
  const { data, status, refresh } = useLazyFetch("/api/location", { default: () => [] });

  return {
    location: data,
    refresh,
    status,

  };
});
