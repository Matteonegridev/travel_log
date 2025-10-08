<script setup lang="ts">
const route = useRoute();
const { data: location } = await useFetch(`/api/location/${route.params.slug}`);
</script>

<template>
  <div>
    <h1>{{ location?.name }}</h1>
  </div>
</template>
