<script setup lang="ts">
type Props = {
  isOpen: boolean;
};

const props = defineProps<Props>();

const locationStore = useLocationStore();
const { status } = storeToRefs(locationStore);
const linksStore = useLinksStore();
const { sidebarLinks } = storeToRefs(linksStore);
const route = useRoute();
const showSkeleton = ref(true);
const mapStore = useMapStore();
const { selectedPoint } = storeToRefs(mapStore);

const findSlug = computed(() => {
  const slug = route.params.slug;
  if (!slug || typeof slug !== "string")
    return null;
  return sidebarLinks.value.find(l => l.slug === slug) ?? null;
});

const isLocationRoute = computed(() => route.path.startsWith(`/dashboard/location/`));
const isDashboard = computed(() => route.path === `/dashboard`);
const isAddLocationRoute = computed(() => route.path === `/dashboard/add-location`);

onMounted(() => {
  if (status.value !== "pending") {
    setTimeout(() => (showSkeleton.value = false), 300);
  }
});
</script>

<template>
  <nav
    class="pt-10"
  >
    <ul
      class="flex flex-col gap-2"
    >
      <div
        v-if="isDashboard || isAddLocationRoute"
        class="space-y-2"
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
      </div>
      <div
        v-else
        class="space-y-2"
      >
        <UtilSidebarLink
          :is-open="props.isOpen"
          label="Back to Location"
          href="/dashboard"
          icon="tabler:arrow-back"
        />
        <ClientOnly>
          <UtilSidebarLink
            v-if="findSlug"
            :icon="findSlug.icon"
            :is-open="props.isOpen"
            :label="findSlug.name"
            :href="findSlug.href"
          />
        </ClientOnly>
      </div>
      <!-- upper divider -->
      <div
        v-if=" sidebarLinks.length > 0"
        class="divider"
      />
      <!-- Skeleton -->
      <div v-if="showSkeleton && sidebarLinks.length > 0">
        <div class="skeleton h-11 w-full" />
      </div>
      <div
        v-if="sidebarLinks.length > 0 && !showSkeleton"
        class="flex flex-col gap-2"
      >
        <!-- Location links -->

        <div
          v-show="!isLocationRoute"
          class="space-y-2"
        >
          <UtilSidebarLink
            v-for="value in sidebarLinks"
            :key="value.id"
            :is-open="props.isOpen"
            :label="value.name"
            :href="value.href"
            :icon="value.icon"
            :icon-color="selectedPoint?.id === value.id ? 'text-primary' : 'text-base'"
            @mouseenter="(e: MouseEvent) => selectedPoint = value"
            @mouseleave="(e: MouseEvent) => selectedPoint = null"
          />
        </div>

        <div v-if="isLocationRoute">
          <UtilSidebarLink
            icon="tabler:edit"
            :is-open="props.isOpen"
            label="Edit Location"
            :href="`/dashboard/location/${route.params.slug}/edit`"
          />
        </div>

        <!-- lower divider -->
        <div
          class="divider"
        />

        <UtilSidebarLink
          :is-open="props.isOpen"
          label="Sign Out"
          href="/sign-out"
          icon="tabler:logout"
        />
      </div>
    </ul>
  </nav>
</template>
