<script setup lang="ts">
import clsx from "clsx";
import { Field } from "vee-validate";

type InputProps = {
  name: string;
  label: string;
  error?: string | undefined;
  placeholder?: string;
  type?: "text" | "number" | "textarea";
  htmlTag: "input" | "textarea";

};

const props = defineProps<InputProps>();
</script>

<template>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">
      {{ props.label }}
    </legend>
    <Field
      v-slot="{ field, errorMessage }"
      :name="props.name"
    >
      <component
        v-bind="field"
        :is="props.htmlTag"
        :type="props.type || 'text'"
        :placeholder="props.placeholder"
        :class="clsx(
          'w-full',
          props.htmlTag === 'textarea' ? 'textarea resize-none h-24' : 'input',
          errorMessage && 'input-error',
        )"
      />
      <ErrorMessage
        :name="props.name"
        as="p"
        class="fieldset-label text-error"
      >
        {{ errorMessage }}
      </ErrorMessage>
    </Field>
  </fieldset>
</template>
