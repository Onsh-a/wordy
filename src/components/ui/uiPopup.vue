<template>
  <div class="modal" @keydown.esc="handleClose" :class="{ active: popupData.isActive }">
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
      :popupClose="handleClose"
    />
  </div>
</template>

<script setup lang="ts">
import AuthModule from '@/components/authPopupModule';
import AuthSuccessModule from '@/components/authSuccessPopupModule';
import UiPopupErrors from '@/components/ui/uiPopupErrors';
import CreateEditModule from '@/components/createEditModule.vue';
import { computed } from 'vue';
import { useStore } from 'vuex';
const store = useStore();

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

</script>

<style lang="scss">
  @import url(/src/assets/styles/popup.scss);
</style>
