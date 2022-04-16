<template>
  <div id="app">
    <toaster></toaster>
    <vocabulary-header></vocabulary-header>
    <vocabulary-list v-bind:vocabulary="vocabulary"></vocabulary-list>
  </div>
</template>

<script>
import vocabularyList from "./components/vocabularyList.vue"
import vocabularyHeader from "./components/vocabularyHeader.vue"
import toaster from "./components/ui/uiToaster.vue"

export default {
  name: "App",
  components: {
    vocabularyList,
    vocabularyHeader,
    toaster,
  },
  methods: {},
  computed: {
    vocabulary() {
      return this.$store.state.vocabulary
    }
  },
  
  mounted() {
    this.$store.dispatch('getData');
  },
};
</script>

<style>
@font-face {
  font-family: Nunito;
  src: url(/src/assets/font/Nunito-Regular.ttf);
}

body {
  margin: 0;
  padding: 0;

}

#app {
  font-family: Nunito, serif;
  text-align: center;
  color: #2c3e50;
}

@import url(/src/assets/styles/common.css);
</style>
