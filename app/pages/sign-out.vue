<script setup lang="ts">
const { signOut } = useAuthStore();

onMounted(() => {
  signOut();
});
</script>

<template>
  <div class="card mt-4 flex min-h-72 items-center justify-center">
    <span class="loading loading-spinner loading-xl" />
  </div>
</template>
