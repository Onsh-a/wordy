<template>
  <div class="modal" @keydown.esc="handleClose" :class="{ active: popupData.isActive }">
    <authModule v-if="popupData.type === 'auth'" :popupClose="handleClose"/>
    <createEditModule v-else :popupClose="handleClose"/>
  </div>
</template>

<script>
import createEditModule from "../createEditModule";
import authModule from "./../authPopupModule"

export default {
  components: {
    createEditModule,
    authModule
  },
  data() {
    return {}
  },
  computed: {
    popupData() {
      return {
        isActive: this.$store.state.popup.isActive,
        type: this.$store.state.popup.type,
      }
    }
  },
  methods: {
    handleClose() {
      this.$store.state.popup.isActive = false
      setTimeout(() => {
        this.$store.commit('handlePopup', 'close');
      }, 400)
    },
  },
}
</script>

<style lang="scss">
  @import url(/src/assets/styles/popup.scss);
</style>
