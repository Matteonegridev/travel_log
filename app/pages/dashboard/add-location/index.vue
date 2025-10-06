<script setup lang="ts">
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";
import { formSchema } from "~~/server/database/schema";

const router = useRouter();
const submitError = ref("");
const loading = ref(false);
const { $csrfFetch } = useNuxtApp();
const locationStore = useLocationStore();
const mapStore = useMapStore();
const showInputs = ref(false);

const { handleSubmit, errors, meta, resetForm, setErrors, setFieldValue, controlledValues } = useForm({
  validationSchema: toTypedSchema(formSchema as any),
  initialValues: {
    lat: 38.79545,
    long: -99.17909,
    description: "",
    name: "",
  },
});

onMounted(() => {
  mapStore.draggablePoint = {
    lat: 38.79545,
    long: -99.17909,
    id: 1,
    description: "",
    name: "Added Point",
  };
});

effect(() => {
  if (mapStore.draggablePoint) {
    setFieldValue("lat", mapStore.draggablePoint?.lat);
    setFieldValue("long", mapStore.draggablePoint?.long);
  }
});

function toggleInputs() {
  showInputs.value = !showInputs.value;
}
function toFixedNum(value: number) {
  return value?.toFixed(5);
}

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true;
    await $csrfFetch("/api/location", {
      method: "POST",
      body: values,
    });
    locationStore.refresh();
    resetForm();
    navigateTo("/dashboard");
  }
  catch (err) {
    const error = err as FetchError;
    // mostra il messaggio di errore preso dal backend:
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.statusMessage || "An unknown error occurred";
  }
  loading.value = false;
});

function goBack() {
  router.back();
}
// this is needed when we try to leave the page and input are dirty:
onBeforeRouteLeave(() => {
  if (meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure you want to leave? All unsaved changes will be lost.");
    if (!confirm) {
      return false;
    }
  }
  mapStore.draggablePoint = null;
  return true;
});
</script>

<template>
  <div
    class="container mx-auto  mt-4 max-w-md "
  >
    <div class=" mb-6 flex flex-col gap-4 ">
      <h1 class="text-3xl font-bold">
        Add Your Location
      </h1>
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
      class="bg-base-200 flex flex-col gap-3 rounded-md p-4 shadow-md"
      @submit.prevent="onSubmit"
    >
      <util-form-field
        :disabled="loading"
        html-tag="input"
        :error="errors.name"
        name="name"
        label="Name"
      />
      <util-form-field
        :disabled="loading"
        html-tag="textarea"
        :error="errors.description"
        name="description"
        label="Description"
        type="textarea"
      />
      <div class="text-base-content/50 flex flex-col gap-2 text-sm">
        <p class="text-base-content/75 ">
          Drag the marker to change the coordinates:
        </p>
        <div class="flex gap-3">
          <p>Latitude: {{ toFixedNum(controlledValues.lat) }}</p>
          <p>Longitude: {{ toFixedNum(controlledValues.long) }}</p>
        </div>
        <p class="text-base-content/75">
          Or type it <button
            class="text-accent cursor-pointer underline"
            @click="toggleInputs"
          >
            here
          </button>
        </p>
      </div>
      <div v-show="showInputs">
        <util-form-field
          :disabled="loading"
          html-tag="input"
          :error="errors.lat"
          name="lat"
          label="Latitude"
          type="number"
          placeholder="Must be between -90 an 90"
        />
        <util-form-field
          :disabled="loading"
          html-tag="input"
          :error="errors.long"
          name="long"
          label="Longitude"
          type="number"
          placeholder="Must be between -180 an 180"
        />
      </div>
      <div class="mt-4 flex justify-between">
        <util-form-button
          :loading="loading"
          icon-type="reset"
          label="Cancel"
          @click="goBack"
        />
        <util-form-button
          :loading="loading"
          icon-type="add"
          button-type="primary"
          label="Add"
          type="submit"
        />
      </div>
    </form>
  </div>
</template>
