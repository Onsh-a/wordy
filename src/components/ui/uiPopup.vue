<template>
  <div
    ref="modal"
    :class="['modal', { active: popupData.isActive }]"
    @keydown.esc="handleClose"
  >
    <ui-popup-errors
      v-if="popupData.errors.length > 0"
      :errors="popupData.errors"
    />

    <AuthModule
      v-if="popupData.type === 'auth'"
      :authType="popupData.authType"
      :popupClose="handleClose"
    />

    <AuthSuccessModule
      v-else-if="popupData.type === 'auth-success'"
      :authType="popupData.type"
      :userName="popupData.userName"
      :popupClose="handleClose"
    />

    <CreateEditModule
      v-else
      @close-popup="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import AuthModule from '@/components/authPopupModule';
import AuthSuccessModule from '@/components/authSuccessPopupModule';
import UiPopupErrors from '@/components/ui/uiPopupErrors';
import CreateEditModule from '@/components/createEditModule.vue';
import { computed, watch, nextTick, ref, Ref } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

const modal: Ref<HTMLDivElement | null>= ref(null);
const popupData = computed(() => {
  return {
    isActive: store.state.popup.isActive,
    type: store.state.popup.type,
    authType: store.state.auth.authType ?? null,
    errors: store.state.popup.errors,
    userName: store.state.auth.userName,
  }
})

const handleClose = () => {
  store.state.popup.isActive = false
  setTimeout(() => {
    store.commit('handleErrorMessages', []);
    store.commit('handlePopup', 'close');
  }, 400)
}

watch(async () => popupData.value.isActive, async () => {
  if (!popupData.value.isActive || !modal.value) return;
  await nextTick();
  setTimeout(() => {
    const firstInput = modal.value?.querySelector('input')
    if (!firstInput) return;
    firstInput.focus();
  }, 50);
})

</script>

<style lang="scss">
  @import url(/src/assets/styles/popup.scss);
</style>
