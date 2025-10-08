<script setup lang="ts">
import clsx from "clsx";

const route = useRoute();
</script>

<template>
  <NuxtLayout
    name="dashboard"
  >
    <div
      :class="clsx(route.path === '/dashboard/add-location' && 'grid grid-cols-var', 'size-full overflow-auto bg-base-300')"
    >
      <NuxtPage />
      <UiMap
        :class="clsx(route.path === '/dashboard' && 'h-[60dvh]', 'justify-stretch')"
      />
    </div>
  </NuxtLayout>
</template>
