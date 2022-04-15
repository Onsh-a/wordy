<template>
  <div id="app">
    <vocabulary-header></vocabulary-header>
    <vocabulary-list v-bind:vocabulary="vocabulary"></vocabulary-list>
  </div>
</template>

<script>
import vocabularyList from "./components/vocabularyList.vue"
import vocabularyHeader from "./components/vocabularyHeader.vue"

export default {
  name: "App",
  components: {
    vocabularyList,
    vocabularyHeader,
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
</style>
