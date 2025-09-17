<script setup lang="ts">
const locationStore = useLocationStore();
const { location, pending } = storeToRefs(locationStore);

onMounted(() => {
  locationStore.refresh();
});
</script>

<template>
  <div>
    <h1 class="block p-4 text-3xl font-medium">
      Locations
    </h1>
    <div class="p-6">
      <!-- Show loading spinner -->
      <template v-if="pending">
        <div class="grid gap-3 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="value in 9"
            :key="value"
          >
            <util-card-skeleton />
          </div>
        </div>
      </template>
      <!-- With data -->
      <template v-else-if="location && location.length > 0">
        <util-display-locations :data="location" />
      </template>

      <!-- Without data -->
      <template v-else>
        <util-add-location />
      </template>
    </div>
  </div>
</template>
