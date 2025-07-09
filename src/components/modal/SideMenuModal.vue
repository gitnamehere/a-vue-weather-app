<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useCoreStore } from '@/stores/core';
import { useWeatherStore } from '@/stores/weather';
import { onMounted, ref } from 'vue';

const { openModal, closeModal } = useCoreStore();
const weatherStore = useWeatherStore();

const { temperatureUnit } = storeToRefs(weatherStore);

interface Props {
  menuStyle?: "default" | "glass";
}

defineProps<Props>();

const isOpen = ref(false);

const emit = defineEmits(["close"]);

function close() {
  isOpen.value = false;
  closeModal();
  setTimeout(() => {
    emit('close');
  }, 350)
}

onMounted(() => {
  isOpen.value = true;
  openModal();
})
</script>

<template>
  <Teleport to="body">
    <Transition>
      <div
        v-if="isOpen"
        class="side-menu-modal"
        :class="{'side-menu-modal--glass' : menuStyle === 'glass'}"
      >
        <!-- TODO: move settings into a different file -->
        <div class="side-menu-modal__head">
          <span class="side-menu-modal__title">Settings</span>
          <button
            class="side-menu-modal__close-button"
            @click="close"
          >
            close
          </button>
        </div>
        <div class="side-menu-modal__body">
          <button @click="weatherStore.toggleTemperatureUnit">
            {{ temperatureUnit }}
          </button>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss">
.side-menu-modal {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;

  background-color: #3382;

  z-index: 100;

  @media (min-width: 576px) {
    width: 384px;
  }

  &--glass {
    background-color: none;
    backdrop-filter: blur(4px);
    border: 1px solid #3382;
  }

  &__title {
    width: 90%;
  }

  &__close-button {
    width: 10%;
  }
}

.v-enter-active,
.v-leave-active {
  transition: right 0.35s ease;
}

.v-enter-from,
.v-leave-to {
  right: -100vw;

  @media (min-width: 576px) {
    right: -384px;
  }
}
</style>
