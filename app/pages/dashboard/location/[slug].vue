<script setup lang="ts">
const locationSlug = useLocationSlug();
const { slugLocation, error, slugStatus } = storeToRefs(locationSlug);
const mapStore = useMapStore();

onMounted(() => {
  locationSlug.refreshSlug();
});

effect(() => {
  if (slugLocation.value) {
    mapStore.getCoordinates = [slugLocation.value];
  }
});
</script>

<template>
  <div class="min-h-[30dvh] p-5">
    <div v-if="slugStatus === 'pending'">
      <div class="loading" />
    </div>
    <div v-else-if="error">
      <p>
        {{ error.statusMessage }}. Please go <NuxtLink
          class="text-accent underline"
          to="/dashboard"
        >
          back
        </NuxtLink>
      </p>
    </div>
    <div v-if="slugLocation && slugStatus !== 'pending'">
      <h1 class="text-xl font-bold">
        {{ slugLocation?.name }}
      </h1>
      <p>{{ slugLocation.description }}</p>
    </div>
    <div
      v-if="!slugLocation?.locationLogs.length"
      class="mt-4 flex flex-col gap-2"
    >
      <p>
        You have no logs at this location yet.
      </p>
      <button class="btn btn-primary self-start">
        <Icon
          name="tabler:map-pin-plus"
          size="24"
        />  Add Log
      </button>
    </div>
  </div>
</template>
