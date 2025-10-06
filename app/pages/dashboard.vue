<script setup lang="ts">
import clsx from "clsx";

const route = useRoute();
</script>

<template>
  <NuxtLayout
    name="dashboard"
  >
    <div
      :class="clsx(route.path === '/dashboard/add-location' && 'flex-row', 'size-full overflow-auto flex flex-col')"
    >
      <NuxtPage />
      <UiMap
        :class="clsx(route.path === '/dashboard' && 'h-[60dvh]')"
        class="flex-1 "
      />
    </div>
  </NuxtLayout>
</template>
