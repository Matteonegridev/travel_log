<script setup lang="ts">
type Props = {
  isOpen: boolean;
};

const props = defineProps<Props>();
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
        href="/dashboard/location"
        icon="tabler:map-2"
      />
      <UtilSidebarLink
        :is-open="props.isOpen"
        label="Add Location"
        href="/dashboard/add-location"
        icon="tabler:square-plus-2"
      />
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
