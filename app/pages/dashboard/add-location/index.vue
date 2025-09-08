<script setup lang="ts">
import type { FetchError } from "ofetch";

const router = useRouter();
const submitError = ref("");

const { handleSubmit, errors, meta, resetForm, setErrors } = useForm({
  // validationSchema: toTypedSchema(formSchema),
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await $fetch("/api/location", {
      method: "POST",
      body: values,
    });

    resetForm();
  }
  catch (err) {
    const error = err as FetchError;
    // mostra il messaggio di errore preso dal backend:
    setErrors(error.data?.data);
    submitError.value = error.statusMessage || "An unknown error occurred";
  }
});

function goBack() {
  router.back();
}

onBeforeRouteLeave(() => {
  if (meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure you want to leave? All unsaved changes will be lost.");
    if (!confirm) {
      return false;
    }
  }
  return true;
});
</script>

<template>
  <div
    class="container mx-auto mt-4 max-w-md "
  >
    <div class="mb-6 flex flex-col gap-4 ">
      <h1 class="text-xl">
        Add Location
      </h1>
      <p>A location is a place you hae traveled or will travel to. It can be a city, country, State or point of intertest. You can add specific times you visited this location after adding it. </p>
    </div>

    <!-- Alert -->
    <div
      v-if="submitError"
      role="alert"
      class="alert alert-error"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{{ submitError }}</span>
    </div>

    <!-- Alert -->

    <form
      class="flex flex-col gap-3"
      @submit.prevent="onSubmit"
    >
      <util-form-field
        :error="errors.name"
        html-tag="input"
        name="name"
        label="Name"
      />
      <util-form-field
        :error="errors.description"
        html-tag="textarea"
        name="description"
        label="Description"
        type="textarea"
      />

      <util-form-field
        :error="errors.lat"
        html-tag="input"
        name="lat"
        label="Latitude"
        type="number"
        placeholder="Must be between -90 an 90"
      />
      <util-form-field
        :error="errors.long"
        html-tag="input"
        name="long"
        label="Longitude"
        type="number"
        placeholder="Must be between -180 an 180"
      />
      <div class="mt-4 flex justify-between">
        <util-form-button
          icon-type="reset"
          label="Cancel"
          @click="goBack"
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
