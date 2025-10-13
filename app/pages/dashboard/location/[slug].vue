<script setup lang="ts">
const route = useRoute();
const { data: location, status, error } = await useLazyFetch(`/api/location/${route.params.slug}`);
const mapStore = useMapStore();

effect(() => {
  if (location.value) {
    mapStore.getCoordinates = [location.value];
  }
});
</script>

<template>
  <div class="min-h-[30dvh]">
    <div v-if="status === 'pending'">
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
    <div v-if="location && status !== 'pending'">
      <h1 class="text-xl font-bold">
        {{ location?.name }}
      </h1>
      <p>{{ location.description }}</p>
    </div>
  </div>
</template>
