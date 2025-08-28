import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebarStore", () => {
  const isOpen = useCookie("sidebar", {
    default: () => true,
  });

  function toggleSidebar() {
    isOpen.value = !isOpen.value;
  }

  return { toggleSidebar, isOpen };
});
