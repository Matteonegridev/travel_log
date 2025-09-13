<script setup lang="ts">
const { data: location, pending } = await useLazyFetch("/api/location");
</script>

<template>
  <main class="p-10">
    <!-- Show loading spinner -->
    <template v-if="pending && 9">
      <div class="grid grid-cols-3 gap-5">
        <div
          v-for="value in 9"
          :key="value"
        >
          <util-card-skeleton />
        </div>
      </div>
    </template>
    <!-- With data -->
    <template v-else-if="location && location.length">
      <div class="grid grid-cols-3 gap-3">
        <div
          v-for="value in location"
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
      </div>
    </template>
    <!-- Without data -->
    <template v-else>
      <util-add-location />
    </template>
  </main>
</template>
