<script setup lang="ts">
type Props = {
  name: string;
  image?: string | undefined | null;
};

const props = defineProps<Props>();
</script>

<template>
  <div
    class="dropdown dropdown-end"
  >
    <div
      tabindex="0"
      role="button"
      class="btn m-1"
    >
      {{ props.name }}
      <div
        class="avatar"
      >
        <div
          class="w-8 rounded-full"
        >
          <img
            :src="props.image ?? undefined"
            :alt="props.name"
          >
        </div>
      </div>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content menu bg-base-100 rounded-box  z-1 w-36 p-2 shadow-sm "
    >
      <li>
        <NuxtLink
          to="/dashboard"
          class="flex justify-around"
        >
          <Icon
            name="tabler:clipboard-list"
            size="22"
          />

          Dashboard
        </NuxtLink>
      </li>
      <li>
        <NuxtLink
          to="/sign-out"
          class="flex justify-around"
        >
          <Icon
            name="tabler:logout"
            size="22"
          />

          Sign Out
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
