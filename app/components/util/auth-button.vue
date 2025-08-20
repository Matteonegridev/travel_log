<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <UiDropdown
    v-if="!authStore.loading && authStore.user"
    :name="authStore.user.name"
    :image="authStore.user?.image"
  />
  <button
    v-else
    :disabled="authStore.loading"
    class="btn btn-accent"
    @click="authStore.signIn"
  >
    Sign In With GitHub
    <span
      v-if="authStore.loading"
      class="loading loading-spinner loading-md"
    />
    <Icon
      v-else
      name="tabler:brand-github"
      size="24"
    />
  </button>
</template>
