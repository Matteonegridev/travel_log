<script setup lang="ts">
import { easeIn, easeOut, motion } from "motion-v";

type Props = {
  open: boolean;
  function: () => void;
};

const props = defineProps<Props>();

const asideVariants = {
  open: {
    width: "256px",
    transition: { duration: 0.150, ease: easeOut },
  },
  hidden: {
    width: "96px",
    transition: { duration: 0.150, ease: easeIn },
  },
};

const rotateArrow = {
  right: { rotate: 0, transition: { duration: 0.2, ease: easeOut } },
  left: { rotate: -180, transition: { duration: 0.3 } },
};
</script>

<template>
  <motion.aside
    class="bg-base-200 p-4"
    :variants="asideVariants"
    :animate="props.open ? 'open' : 'hidden'"
    :initial="props.open ? 'open' : 'hidden'"
  >
    <div class="flex justify-end">
      <button
        @click="props.function"
      >
        <motion.span
          :variants="rotateArrow"
          :animate="props.open ? 'left' : 'right'"
          :initial="props.open ? 'left' : 'right'"
          style="display:inline-block; transform-origin:center;"
        >
          <Icon
            class="cursor-pointer"
            name="tabler:chevron-left"
            size="42"
          />
        </motion.span>
      </button>
    </div>
    <slot />
  </motion.aside>
</template>
