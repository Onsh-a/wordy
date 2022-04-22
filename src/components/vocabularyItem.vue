<template>
  <div class='pair__item'>
    <div class='pair__foreign'>
      {{ pair.foreign.toString() }}
    </div>

    <div class='pair__russian'>
      <div class="pair__russian-wrapper" v-for='(translation, part) in pair.russian' :key="part">
        <div v-if="translation" class="pair__russian-part">{{ dictionary[part] }}</div>
        <div v-if="translation" class="pair__russian-translation">{{ translation }}</div>
      </div>
    </div>

    <div class='pair__controls'>
      <control-btn :options="{ type: 'edit' }" :id='pair._id' />
      <control-btn :options="{ type: 'delete'}" :id='pair._id' />
    </div>
  </div>
</template>

<script>
import controlBtn from "./ui/uiButton.vue"
import transl from "./../../src/assets/utils/translation"

export default {
  data() {
    return {
      dictionary: transl
    }
  },
  components: {
    controlBtn,
  },
  props: {
    pair: Object
  },
}
</script>


<style scoped lang="scss">
  .pair {
    &__item {
      display: flex;
      width: 100%;

      div {
        text-align: left;
        padding: 10px 10px 10px 15px;
      }
    }

    &__foreign {
      border-right: 1px solid black;
      font-weight: 300;
    }

    &__russian,
    &__foreign {
      width: 40%;
    }

    &__controls {
      width: 20%;
      min-width: 120px;
      display: flex;
      justify-content: flex-end;
    }

    &__item:not(:last-child) {
      border-bottom: 1px solid black;
    }

    &__item .pair__russian-translation,
    &__item .pair__russian-part,
    &__item .pair__russian-wrapper {
      margin: 0;
      padding: 0;
    }

    &__item .pair__russian-part {
      font-weight: 700;
      margin-bottom: 5px;
    }

    &__item .pair__russian-translation {
      font-weight: 300;
      margin-bottom: 15px;
    }
  }
</style>
