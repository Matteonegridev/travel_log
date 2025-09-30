<script setup lang="ts">
import clsx from "clsx";

const props = defineProps<Props>();

const route = useRoute();

type Props = {
  label?: string;
  href: string;
  icon: string;
  isOpen: boolean;
  iconColor?: "text-primary" | "text-base";
};
</script>

<template>
  <li>
    <div
      :class="clsx(props.isOpen ? 'none' : 'tooltip tooltip-right tooltip-primary')"
      :data-tip="props.label"
    >
      <NuxtLink
        :to="props.href"
        class="btn bg-base-300 w-full justify-start"
        :class="{ 'bg-base-100': route.path === props.href }"
      >
        <Icon
          :class="clsx(props.iconColor, 'transition-all duration-250 ease-in-out')"
          :name="props.icon"
          size="24"
        />
        <span v-if="props.isOpen">{{ label }}</span>
      </NuxtLink>
    </div>
  </li>
</template>
