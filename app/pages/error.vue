<script setup lang="ts">
const route = useRoute();
const error = route.query.error || "An unknown error occurred.";
</script>

<template>
  <div class="card bg-base-100 mx-auto mt-4 w-96 ">
    <div
      role="alert"
      class="alert alert-error alert-soft r flex min-h-72 flex-col items-center p-8"
    >
      <Icon
        name="tabler:error-404"
        size="56"
      />
      <span class="text-lg">Oh no! {{ error }}</span>
      <NuxtLink
        class="btn btn-primary mt-auto self-stretch"
        to="/"
      >
        <Icon
          name="tabler:home"
          size="24"
        />
        Home
      </NuxtLink>
    </div>
  </div>
</template>
