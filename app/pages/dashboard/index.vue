<script setup lang="ts">
const locationStore = useLocationStore();
const { location, isLoading } = storeToRefs(locationStore);

const isHydrated = ref(false);
const showLoading = computed(() => {
  return !isHydrated.value || isLoading.value;
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

      <div v-else-if="location && location.length > 0">
        <util-display-locations
          :data="location"
        />
        <UiMap class="shrink-0" />
      </div>
      <!-- Without data -->
      <util-add-location v-else />
    </div>
  </div>
</template>
