<script setup lang="ts">
import { useField } from "vee-validate";

type TextareaProps = {
  name?: string;
  label: string;
  placeholder?: string;

};

const props = defineProps<TextareaProps>();

const { value, errorMessage } = useField<string>(() => props.name ?? "");
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <textarea
      v-model="value"
      class="textarea h-24 w-full resize-none"
      :placeholder="props.placeholder"
    />
    <div
      class="label"
    >
      {{ errorMessage }}
    </div>
  </fieldset>
</template>
