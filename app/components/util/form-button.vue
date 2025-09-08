<script setup lang="ts">
import clsx from "clsx";

type ButtonProps = {
  label: string;
  type?: "reset" | "submit";
  buttonType?: "primary" | "outline";
  iconType: "add" | "reset";

};

const props = defineProps<ButtonProps>();
</script>

<template>
  <button
    :type="props.type"
    :class="clsx('btn', props.buttonType === 'primary' ? 'btn-primary' : 'btn-outline')"
  >
    <span class="order-2">
      {{ props.label }}
    </span>
    <Icon
      :name="clsx(props.iconType === 'add' ? 'tabler:circle-plus-filled' : 'tabler:arrow-left')"
      size="24"
      :class="clsx(props.iconType === 'reset' ? 'order-1' : 'order-2')"
    />
  </button>
</template>
