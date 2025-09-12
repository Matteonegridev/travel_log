<script setup lang="ts">
const { data: location, pending } = await useFetch("/api/location", {
  method: "GET",
  lazy: true,
});
</script>

<template>
  <main class="grid grid-cols-3 gap-5 p-10">
    <!-- Spinner while loading -->
    <div v-if="pending">
      <span class="loading loading-spinner loading-xl" />
    </div>

    <!-- Data ready -->

    <div
      v-for="value in location"
      v-else-if="location && location.length"
      :key="value.id"
      class="card card-border bg-base-200 card-xl w-96"
    >
      <div class="card-body">
        <h2 class="card-title">
          {{ value.name }}
        </h2>
        <p>{{ value.description }}</p>
      </div>
    </div>
    <!-- No data -->
    <div v-else>
      <p>You haven't added a location yet!</p>
    </div>
  </main>
</template>
