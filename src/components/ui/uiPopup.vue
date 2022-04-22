<template>
  <div class="modal" @keydown.esc="handleClose" :class="{ active: popupData.isActive }">
    <div class="modal__container">
      <h3 class="modal__title">{{ popupData.type === 'create' ? 'Новый перевод' : 'Редактирование' }}</h3>
      <div class="modal__edit">
        <ui-popup-input ref="english" :isActive="popupData.isActive" :word="popupData.pair.foreign"
                        :part="dictionary[popupData.lang]" :handler="updateForeign"/>
        <ui-popup-input v-for="(word, part, index) in popupData.pair.russian"
                        :key="index" :word="word" :part="part" :handler="updateRussian"/>
      </div>
      <button class="modal__save" @click='handleSave'>Сохранить</button>
      <button class="modal__close" @click='handleClose'>Закрыть</button>
    </div>
  </div>
</template>

<script>
import uiPopupInput from "./uiPopupInput";
import transl from "./../../assets/utils/translation"

class Translation {
  constructor(data = {}) {
    this.noun = data.noun ? data.noun : null;
    this.verb = data.verb ? data.verb : null;
    this.adjective = data.adjective ? data.adjective : null;
    this.other = data.other ? data.other : null;
  }
}

export default {
  components: {
    uiPopupInput,
  },
  data() {
    return {
      dictionary: transl,
      newData: {
        russian: {
          noun: null,
          verb: null,
          adjective: null,
          other: null,
        },
        foreign: null
      }
    }
  },
  computed: {
    popupData() {
      const id = this.$store.state.currentId;
      if (!id) return {
        isActive: this.$store.state.popup.isActive,
        type: this.$store.state.popup.type,
        pair: {foreign: '', russian: new Translation()},
        lang: this.$store.state.lang
      }

      let currentData = this.$store.state.vocabulary.filter((item) => item._id === id);

      currentData = {
        russian: currentData[0]?.russian,
        foreign: currentData[0]?.foreign,
      }

      return {
        isActive: this.$store.state.popup.isActive,
        type: this.$store.state.popup.type,
        pair: currentData,
        lang: this.$store.state.lang
      }
    },
  },
  methods: {
    handleClose() {
      this.$store.commit('handlePopup', 'close');
    },
    updateRussian(e) {
      this.newData.russian[e.target.dataset.part] = e.target.value;
    },
    updateForeign(e) {
      this.newData.foreign = e.target.value;
    },
    handleSave() {
      const translation = new Translation(this.newData.russian)
      const type = this.popupData.type;
      if (type === 'create') {
        this.$store.dispatch('addPair', {
          lang: this.popupData.lang,
          foreign: this.newData.foreign,
          russian: translation
        })
      } else {
        this.$store.dispatch('editPair', {
          id: this.$store.state.currentId,
          foreign: this.newData.foreign,
          russian: translation
        })
      }
      this.handleClose();
    }
  },
  updated() {
    this.newData = JSON.parse(JSON.stringify(this.popupData.pair));
  }
}
</script>

<style>
@import url(/src/assets/styles/popup.css);
</style>
