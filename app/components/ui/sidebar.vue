<script setup lang="ts">
const sidebarStore = useSidebarStore();

const isInitialRender = ref(true);

onMounted(() => {
  isInitialRender.value = false;
});
</script>

<template>
  <AnimationsSidebarAnimation
    :function="sidebarStore.toggleSidebar"
    :open="sidebarStore.isOpen"
    :is-initial-render="isInitialRender"
  >
    <UtilSidebarNav
      :is-open="sidebarStore.isOpen"
    />
  </AnimationsSidebarAnimation>
</template>
