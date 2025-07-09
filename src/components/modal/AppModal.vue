<script setup>
import { useCoreStore } from '@/stores/core';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

const store = useCoreStore();
const { modalActive } = storeToRefs(store);

watch(modalActive, () => {
  modalActive.value
    ? document.body.style.overflow = "hidden"
    : document.body.style.removeProperty("overflow")
});
</script>

<template>
  <Transition>
    <div 
      v-if="modalActive"
      class="app-modal"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.app-modal {
  position: fixed;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(2px);
  z-index: 10;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.25s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>