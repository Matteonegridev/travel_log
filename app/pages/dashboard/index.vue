<script setup lang="ts">
const locationStore = useLocationStore();
const { location, status } = storeToRefs(locationStore);

const isHydrated = ref(false);
const showLoading = computed(() => {
  return !isHydrated.value || status.value === "pending";
});

onMounted(() => {
  isHydrated.value = true;
});
</script>

<template>
  <div>
    <h1 class="block p-4 text-3xl font-medium">
      Locations
    </h1>
    <div class="p-6">
      <!-- Show loading spinner -->
      <div v-if="showLoading">
        <util-skeleton />
      </div>
      <!-- With data -->

      <div
        v-else-if="location && location.length > 0"
      >
        <div class="grid gap-3 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <util-display-locations
            v-for="data in location"
            :key="data.id"
            :data="data"
          />
        </div>
      </div>
      <!-- Without data -->
      <util-add-location v-else />
    </div>
  </div>
</template>
