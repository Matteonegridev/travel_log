<script setup lang="ts">
export type LocationItem = {
  id: number;
  name: string;
  createdAt: number;
  updatedAt: number;
  userId: number;
  slug: string;
  description: string | null;
  lat: number;
  long: number;
};

const props = defineProps<{ data: LocationItem[] }>();
</script>

<template>
  <main>
    <div class="grid gap-3 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
      <div
        v-for="value in props.data"
        :key="value.id"
        class="card card-border bg-base-200 card-xl"
      >
        <div class="card-body">
          <h2 class="card-title">
            {{ value.name }}
          </h2>
          <p>{{ value.description }}</p>
        </div>
      </div>
    </div>
  </main>
</template>
