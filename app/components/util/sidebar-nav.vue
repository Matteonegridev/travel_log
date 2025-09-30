<script setup lang="ts">
type Props = {
  isOpen: boolean;
};
const props = defineProps<Props>();
const locationStore = useLocationStore();
const { status } = storeToRefs(locationStore);
const linksStore = useLinksStore();
const { sidebarLinks } = storeToRefs(linksStore);

const showSkeleton = ref(true);

onMounted(() => {
  if (status.value !== "pending") {
    setTimeout(() => (showSkeleton.value = false), 300);
  }
});
const mapStore = useMapStore();
</script>

<template>
  <nav
    class="pt-10"
  >
    <ul
      class="flex flex-col gap-3"
    >
      <UtilSidebarLink
        :is-open="props.isOpen"
        label="Location"
        href="/dashboard"
        icon="tabler:map-2"
      />
      <UtilSidebarLink
        :is-open="props.isOpen"
        label="Add Location"
        href="/dashboard/add-location"
        icon="tabler:square-plus-2"
      />
      <div
        v-if=" sidebarLinks.length > 0"
        class="divider"
      />
      <div v-if="showSkeleton && sidebarLinks.length > 0">
        <div class="skeleton h-11 w-full" />
      </div>
      <div
        v-if="sidebarLinks.length > 0 && !showSkeleton"
        class="flex flex-col gap-2"
      >
        <UtilSidebarLink
          v-for="value in sidebarLinks"
          :key="value.id"
          :is-open="props.isOpen"
          :label="value.name"
          :href="value.href"
          :icon="value.icon"
          :icon-color="mapStore.selectedPoint?.id === value.id ? 'text-accent' : 'text-base'"
          @mouseenter="mapStore.selectedPoint = value"
          @mouseleave=" mapStore.selectedPoint = null"
        />
      </div>
      <div class="divider" />

      <UtilSidebarLink
        :is-open="props.isOpen"
        label="Sign Out"
        href="/sign-out"
        icon="tabler:logout"
      />
    </ul>
  </nav>
</template>
