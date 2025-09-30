<script setup lang="ts">
import type { MapPin } from "~~/server/types/map-types";

import clsx from "clsx";

defineProps<{ data: MapPin }>();
const mapStore = useMapStore();
const { selectedPoint } = storeToRefs(mapStore);
</script>

<template>
  <div>
    <NuxkLink
      :class="clsx(data.id === mapStore.selectedPoint?.id ? 'border-accent' : 'border-transparent',
                   'card card-border bg-base-200 card-md hover:cursor-pointer border-2 transition-all duration-150 ease-in-out')"
      @mouseenter="selectedPoint = data"
      @mouseleave="selectedPoint = null"
    >
      <div
        class="card-body"
      >
        <h2 class="card-title">
          {{ data.name }}
        </h2>
        <p>{{ data.description }}</p>
      </div>
    </NuxkLink>
  </div>
</template>
