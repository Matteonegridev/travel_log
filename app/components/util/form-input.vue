<script setup lang="ts">
import { useField } from "vee-validate";

type InputProps = {
  name?: string;
  label: string;
  placeholder?: string;
  type: "text" | "number";

};

const props = defineProps<InputProps>();
const { value, errorMessage } = useField(() => props.name ?? "");
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <input
      v-model="value"
      :type="props.type"
      class="input w-full"
      :placeholder="props.placeholder"
    >
    <p
      v-if="errorMessage"
      class="fieldset-label"
    >
      {{ errorMessage }}
    </p>
  </fieldset>
</template>
