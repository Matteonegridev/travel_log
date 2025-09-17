<script setup lang="ts">
type Props = {
  isOpen: boolean;
};

const props = defineProps<Props>();
const locationStore = useLocationStore();
const { sidebarItemsToWatch, pending } = storeToRefs(locationStore);
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
        v-if="sidebarItemsToWatch.length || pending"
        class="divider"
      />
      <div
        v-if="pending"
      >
        <div class="skeleton h-8 w-full" />
      </div>
      <div
        v-if="sidebarItemsToWatch.length && !pending"
        class="flex flex-col gap-4"
      >
        <UtilSidebarLink
          v-for="value in sidebarItemsToWatch"
          :key="value.id"
          :is-open="props.isOpen"
          :label="value.label"
          :href="value.href"
          :icon="value.icon"
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
