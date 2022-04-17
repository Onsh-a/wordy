<template>
  <div class="modal" :class="{ active: popupData.isActive }">
    <div class="modal__container">
      <h3 class="modal__title">{{ popupData.type === 'create' ? 'Новый перевод' : 'Редактирование' }}</h3>
      <div class="modal__edit">
        <ui-popup-input ref="english" :isActive="popupData.isActive" :word="popupData.pair.english"
                        part="Английский" :handler="updateEnglish"/>
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
      newData: {
        russian: {
          noun: null,
          verb: null,
          adjective: null,
          other: null,
        },
        english: null
      }
    }
  },
  computed: {
    popupData() {
      let id = this.$store.state.currentId;
      if (!id) return {
        isActive: this.$store.state.popup.isActive,
        type: this.$store.state.popup.type,
        pair: {english: '', russian: new Translation()}
      }

      let currentData = this.$store.state.vocabulary.filter((item) => item._id === id);

      currentData = {
        russian: currentData[0]?.russian,
        english: currentData[0]?.english,
      }

      return {
        isActive: this.$store.state.popup.isActive,
        type: this.$store.state.popup.type,
        pair: currentData
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
    updateEnglish(e) {
      this.newData.english = e.target.value;
    },
    handleSave() {
      const translation = new Translation(this.newData.russian)
      const type = this.popupData.type;
      if (type === 'create') {
        this.$store.dispatch('addPair', {
          english: this.newData.english,
          russian: translation
        })
      } else {
        this.$store.dispatch('editPair', {
          id: this.$store.state.currentId,
          english: this.newData.english,
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
