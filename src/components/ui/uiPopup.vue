<template>
  <div class="modal" @keydown.esc="handleClose" :class="{ active: popupData.isActive }">
    <popupErrors :errors="popupData.errors" v-if="popupData.errors.length > 0" />
    <authModule :authType="popupData.authType" v-if="popupData.type === 'auth'" :popupClose="handleClose"/>
    <authSuccessModule v-else-if="popupData.type === 'auth-success'" :popupClose="handleClose"/>
    <createEditModule v-else :popupClose="handleClose"/>
  </div>
</template>

<script>
import createEditModule from "../createEditModule";
import authModule from "./../authPopupModule";
import authSuccessModule from "./../authSuccessPopupModule";
import popupErrors from "./uiPopupErrors";

export default {
  components: {
    createEditModule,
    authModule,
    authSuccessModule,
    popupErrors,
  },
  computed: {
    popupData() {
      return {
        isActive: this.$store.state.popup.isActive,
        type: this.$store.state.popup.type,
        authType: this.$store.state.auth.authType ?? null,
        errors: this.$store.state.popup.errors,
      }
    }
  },
  methods: {
    handleClose() {
      this.$store.state.popup.isActive = false
      setTimeout(() => {
        this.$store.commit('handleErrorMessages', []);
        this.$store.commit('handlePopup', 'close');
      }, 400)
    },
  },
}
</script>

<style lang="scss">
  @import url(/src/assets/styles/popup.scss);
</style>
