<template>
  <div id="app">
    <toaster/>
    <vocabulary-header/>
    <vocabulary-list :vocabulary="getVocabulary"/>
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
    getVocabulary() {
      return this.$store.state.vocabulary
    }
  },

  mounted() {
    this.$store.dispatch('getData');
  },
};
</script>

<style>
@import url(/src/assets/styles/common.css);

@font-face {
  font-family: Nunito;
  src: url(/src/assets/font/Nunito-Regular.ttf);
  font-weight: 400;
}

@font-face {
  font-family: Nunito;
  src: url(/src/assets/font/Nunito-SemiBold.ttf);
  font-weight: 700;
}

@font-face {
  font-family: Nunito;
  src: url(/src/assets/font/Nunito-ExtraLight.ttf);
  font-weight: 300;
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
