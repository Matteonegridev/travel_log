<script setup lang="ts">
import clsx from "clsx";
// import { Field } from "vee-validate";

type InputProps = {
  name: string;
  label: string;
  error?: string | undefined;
  placeholder?: string;
  type?: "text" | "number" | "textarea";
  htmlTag: "input" | "textarea";
  disabled: boolean;
};

const props = defineProps<InputProps>();
const { value, errorMessage } = useField<string | number>(() => props.name);
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>

    <input
      v-if="props.htmlTag === 'input'"
      v-model="value"
      :type="props.type || 'text'"
      :placeholder="props.placeholder"
      :class="clsx(
        'w-full input',
        errorMessage && 'input-error',
      )"
      :disabled="props.disabled"
      :step="props.type === 'number' ? 'any' : ''"
    >
    <textarea
      v-else
      v-model="value"
      :placeholder="props.placeholder"
      :class="clsx(
        'w-full textarea resize-none h-24',
        errorMessage && 'input-error',
      )"
      :disabled="props.disabled"
    />
    <ErrorMessage
      :name="props.name"
      as="p"
      class="fieldset-label text-error"
    >
      {{ errorMessage }}
    </ErrorMessage>
  </fieldset>
</template>
