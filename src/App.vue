<template>
  <div id="app">
    <edit-popup/>
    <toaster/>
    <vocabulary-header/>
    <vocabulary-controls/>
    <vocabulary-list :vocabulary="getVocabulary"/>
    <logged-out v-if="!isUserLogged"/>

  </div>
</template>

<script>
import loggedOut from "./components/loggedOut"
import vocabularyList from "./components/vocabularyList.vue"
import vocabularyHeader from "./components/vocabularyHeader.vue"
import vocabularyControls from "./components/vocabularyListControls.vue"
import toaster from "./components/ui/uiToaster.vue"
import editPopup from './components/ui/uiPopup.vue'

export default {
  name: "App",
  components: {
    vocabularyList,
    vocabularyControls,
    vocabularyHeader,
    toaster,
    editPopup,
    loggedOut
  },
  methods: {},
  computed: {
    getVocabulary() {
      return this.$store.state.vocabulary;
    },
    isUserLogged() {
      return this.$store.state.auth.currentUser;
    }
  },

  mounted() {
    this.$store.commit('handleCurrentUser');
    this.$store.dispatch('getData');
  },
};
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
