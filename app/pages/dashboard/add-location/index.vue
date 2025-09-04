<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { formSchema } from "~~/server/database/schema";

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(formSchema),
});

effect(() => {
  console.log(toRaw(errors.value));
});

const onSubmit = handleSubmit((values) => {
  console.log("log:", values);
});
</script>

<template>
  <div class="container mx-auto mt-4 max-w-md ">
    <div class="flex flex-col gap-8">
      <h1 class="text-xl">
        Add Location
      </h1>
      <p>A location is a place you hae traveled or will travel to. It can be a city, country, State or point of intertest. You can add specific times you visited this location after adding it. </p>
    </div>
    <form
      class="flex flex-col"
      @submit.prevent="onSubmit"
    >
      <util-form-input
        name="name"
        label="Name"
        type="text"
      />

      <util-form-textarea
        name="description"
        label="Description"
      />
      <util-form-input
        name="lat"
        label="Latitude"
        type="number"
      />
      <util-form-input
        name="long"
        label="Longitude"
        type="number"
      />
      <div class="mt-4 flex justify-between">
        <util-form-button
          icon-type="reset"
          label="Cancel"
          type="reset"
        />
        <util-form-button
          icon-type="add"
          button-type="primary"
          label="Add"
          type="submit"
        />
      </div>
    </form>
  </div>
</template>
