<template>
  <div class='pair__item'>
    <div class='pair__russian'>
      {{ pair.russian }}
    </div>

    <div class='pair__english'>
      {{ pair.english | makeString }}
    </div>

    <div class='pair__controls'>
      <control-btn type="edit" @click='edit' />
      <control-btn type="del" />
    </div>
  </div>
</template>

<script>
import controlBtn from "./controlBtn.vue"

export default {
  name: 'vocabularyItem',
  components: {
    controlBtn,
  },
  props: {
    pair: Object
  },
  methods: {
    edit(pair) {
      console.log('pair')
    }
  
  },
  filters: {
    makeString(data) {
      return data.join(', ')
    }
  }
}
</script>


<style scoped>
  .pair__item {
    display: flex;
    width: 100%;
  }

  .pair__item div {
    text-align: left;
    padding: 10px 15px;
  }

  .pair__russian {
    border-right: 1px solid black;
  }

  .pair__russian,
  .pair__english { 
    width: 40%;
  }

  .pair__controls {
    width: 20%;
    min-width: 120px;
    display: flex;
    justify-content: flex-end;
  }

  .pair__item:not(:last-child) {
    border-bottom: 1px solid black;
  }

</style>
