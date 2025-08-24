<script setup lang="ts">
const props = defineProps<Props>();

const route = useRoute();

type Props = {
  label?: string;
  href: string;
  icon: string;
  isOpen: boolean;
};
</script>

<template>
  <li>
    <NuxtLink
      :to="props.href"
      class="btn bg-base-300 w-full justify-start"
      :class="{ 'bg-base-100': route.path === props.href }"
    >
      <Icon
        :name="props.icon"
        size="24"
      />
      <span v-if="props.isOpen">{{ label }}</span>
    </NuxtLink>
  </li>
</template>
