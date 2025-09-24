<script setup lang="ts">
const locationStore = useLocationStore();
const { location, status } = storeToRefs(locationStore);
</script>

<template>
  <main>
    <h1 class="block p-4 text-3xl font-medium">
      Locations
    </h1>
    <div class="p-6">
      <!-- Show loading spinner -->
      <div
        v-if="status === 'pending'"
        class="grid gap-3 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="(_, index) in 3"
          :key="`skeleton-${index}`"
        >
          <div class="skeleton card-border h-26" />
        </div>
      </div>
      <!-- With data -->
      <util-display-locations
        v-else-if="location && location.length > 0"
        :data="location"
      />
      <!-- Without data -->
      <util-add-location v-else />
    </div>
  </main>
</template>
