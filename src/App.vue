<template>
  <div id="app">
    <ui-popup />
    <ui-toaster />
    <VocabularyHeader />
    <VocabularyControls />
    <VocabularyList :vocabulary="vocabulary" />
    <LoggedOut v-if="!isUserLogged" />
  </div>
</template>

<script setup lang="ts">
import LoggedOut from '@/components/loggedOut.vue';
import VocabularyList from '@/components/vocabularyList.vue';
import VocabularyHeader from '@/components/vocabularyHeader.vue';
import VocabularyControls from '@/components/vocabularyListControls.vue';
import UiToaster from '@/components/ui/uiToaster.vue';
import UiPopup from '@/components/ui/uiPopup.vue';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';
const store = useStore();

const vocabulary = computed(() => store.state.vocabulary);
const isUserLogged = computed(() => store.state.auth.userId);
onMounted(() => {
  store.commit('handleCurrentUser');
  store.dispatch('getData');
})
</script>

<style lang="scss">
  body {
    background: $base-bkg-color;
  }

  #app {
    font-family: Nunito, serif;
    text-align: center;
    color: #2c3e50;
  }
</style>
