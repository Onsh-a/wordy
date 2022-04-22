<template>
  <div class="container">
    <div class='pair__container'>
      <vocabulary-item v-for='pair in getVocabulary' :pair="pair" :key="pair._id"/>
      <div class='pair__not-found' v-if="getVocabulary.length === 0">На данный момент словарь не содрежит ничего похожего</div>
    </div>
  </div>
</template>

<script>
import vocabularyItem from './vocabularyItem'

export default {
  components: {
    vocabularyItem,
  },
  props: {
    vocabulary: Array
  },
  computed: {
    getSearchData() {
      return this.$store.state.search
    },
    getSort() {
      return this.$store.state.ascending
    },
    getVocabulary() {
      if (this.vocabulary.length === 0) return true;
      let filteredVocabulary = JSON.parse(JSON.stringify(this.vocabulary));
      filteredVocabulary = this.getSort ? this.vocabulary  : JSON.parse(JSON.stringify(this.vocabulary)).reverse();
      return filteredVocabulary.filter(item => item.foreign.join('').toLowerCase().includes(this.getSearchData.toLowerCase()))
    },
  },
}
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.pair__container {
  border: 1px solid black;
  margin-bottom: 40px;
}

.pair__not-found {
  padding: 30px;
}

</style>
