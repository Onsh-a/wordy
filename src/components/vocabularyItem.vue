<template>
  <div class='pair__item'>
    <div class='pair__english'>
      {{ pair.english | makeString }}
    </div>

    <div class='pair__russian'>
      {{ pair.russian | makeString }}
    </div>

    <div class='pair__controls'>
      <control-btn :options="{ type: 'edit' }" :id='pair._id' />
      <control-btn :options="{ type: 'delete'}" :id='pair._id' />
    </div>
  </div>
</template>

<script>
import controlBtn from "./ui/uiButton.vue"

export default {
  components: {
    controlBtn,
  },
  props: {
    pair: Object
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

  .pair__english {
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
