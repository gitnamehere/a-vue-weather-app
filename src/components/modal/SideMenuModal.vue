<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWeatherStore } from '@/stores/weather';

const store = useWeatherStore();
const { temperatureUnit } = storeToRefs(store);

interface Props {
  menuStyle?: "default" | "glass";
  isOpen: boolean;
}

withDefaults(defineProps<Props>(), {
  menuStyle: "default"
});

defineEmits(["close"]);
</script>

<template>
  <Transition>
    <div
      v-if="isOpen"
      class="side-menu-modal"
      :class="{'side-menu-modal--glass' : menuStyle === 'glass'}"
    >
      <div class="side-menu-modal__head">
        wip setting page
        <button @click="$emit('close')">
          close
        </button>
      </div>
      <div class="side-menu-modal__body">
        <button @click="store.toggleTemperatureUnit">
          {{ temperatureUnit }}
        </button>
      </div>
      wtf are cookies
    </div>
  </Transition>
</template>

<style lang="scss">
.side-menu-modal {
  position: fixed;
  width: 100vw;
  height: 100vh;

  top: 0;
  right: 0;

  background-color: #3382;

  @media (min-width: 576px) {
    width: 384px;
  }

  &--glass {
    background-color: none;
    backdrop-filter: blur(4px);
    border: 1px solid #3382;
  }
}

.v-enter-active,
.v-leave-active {
  transition: right 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  right: -100vw;

  @media (min-width: 576px) {
    right: -384px;
  }
}
</style>
