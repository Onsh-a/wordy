<template>
  <div class="container">
    <div
      :class="['toaster', { active: toaster.isActive, success: toaster.isSuccess, error: !toaster.isSuccess }]">
      <div class="toaster__icon"></div>
      <div class="toaster__message">
        {{ toasterText }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import type { ComputedRef } from 'vue';
import Toaster from "@/types/toaster";

const TOASTER_ACTIVE_TIME = 2500;
const store = useStore();
const content: { [index: string]: string } = {
  create: 'Запись успешно добавлена',
  edit: 'Запись успешно редактирована',
  delete: 'Запись успешно удалена',
  error: 'Произошла ошибка'
}

const toaster: ComputedRef<Toaster> = computed(() => store.state.toaster);

const toasterText = computed(() => {
  const type = toaster.value.type;
  return content.hasOwnProperty(type) ? content[type] : type;
});

watch(toaster, () => {
    if (!toaster.value.isActive) return;
    setTimeout(() => {
      store.commit('handleToaster', { type: undefined, isSuccess: undefined });
    }, TOASTER_ACTIVE_TIME);
  },
  {deep: true})
</script>

<style scoped lang="scss">
.toaster {
  position: fixed;
  left: 20px;
  top: 40px;
  width: 200px;
  background: lightcyan;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  opacity: 0;
  transition: .4s;
  z-index: 10;

  &__icon {
    width: 30px;
    height: 30px;
    background-image: url('/src/assets/icons/check-icon.svg');
    background-size: contain;
    background-repeat: no-repeat;
    flex: 1 0 40px;
    margin-left: 10px;
  }

  &__message {
    text-align: left;
    padding-left: 8px;
  }

  &.success {
    background: #d6eddd;
  }

  &.error {
    background: #bf2b2b;

    .toaster__message {
      color: #f8dade;
    }

    .toaster__icon {
      background-image: url('/src/assets/icons/error-icon.svg');
    }
  }

  &.active {
    opacity: 1;
  }
}

</style>
