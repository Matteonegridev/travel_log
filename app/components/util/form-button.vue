<script setup lang="ts">
import clsx from "clsx";

type ButtonProps = {
  label: string;
  type?: "reset" | "submit";
  buttonType?: "primary" | "outline";
  iconType: "add" | "reset";
  loading?: boolean;
};

const props = defineProps<ButtonProps>();
</script>

<template>
  <button
    :disabled="props.loading"
    :type="props.type"
    :class="clsx('btn', props.buttonType === 'primary' ? 'btn-primary' : 'btn-outline', props.loading && 'disabled')"
  >
    <span class="order-2">
      {{ props.label }}
    </span>
    <span
      v-if="props.loading && props.iconType === 'add'"
      class="loading loading-spinner loading-sm order-2"
    />
    <Icon
      v-else
      :name="clsx(props.iconType === 'add' ? 'tabler:circle-plus-filled' : 'tabler:arrow-left')"
      size="24"
      :class="clsx(props.iconType === 'reset' ? 'order-1' : 'order-2')"
    />
  </button>
</template>
