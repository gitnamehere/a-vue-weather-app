import { ref } from "vue";
import { defineStore } from "pinia";

export const useCoreStore = defineStore("core", () => {
  const modalActive = ref(false);

  function openModal() {
    modalActive.value = true;
  }

  function closeModal() {
    modalActive.value = false;
  }

  return {
    modalActive,
    openModal,
    closeModal
  };
});
