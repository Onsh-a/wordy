<template>
  <div class="container">
    <edit-popup></edit-popup>

    <div class='pair__container'>
      <vocabulary-item v-for='pair in vocabulary' :pair="pair" :key="pair._id"></vocabulary-item>
    </div>


  </div>
</template>

<script>
import vocabularyItem from './vocabularyItem'
import editPopup from './ui/uiPopup.vue'

export default {
  name: 'vocabularyList',
  components: {
    vocabularyItem,
    editPopup,
  },
  props: {
    vocabulary: Array,
  },
  methods: {}
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

</style>
