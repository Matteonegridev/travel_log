<script setup>
import clsx from "clsx";

const colorMode = useColorMode();

const light = "https://tiles.openfreemap.org/styles/liberty";
const dark = "/style/dark.json";
const center = [-1.559482, 47.21322];
const zoom = 8;
</script>

<template>
  <MglMap
    :map-style="clsx(colorMode.value === 'dark' ? dark : light)"
    :center="center"
    :zoom="zoom"
  >
    <MglNavigationControl />
  </MglMap>
</template>
