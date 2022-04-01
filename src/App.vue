<template>
  <div id="app">
    <vocabulary-list v-bind:vocabulary="vocabulary"></vocabulary-list>
  </div>
</template>

<script>
import vocabularyList from "./components/vocabularyList.vue"

export default {
  name: "App",
  components: {
    vocabularyList,
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
