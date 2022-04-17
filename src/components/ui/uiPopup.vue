<template>
  <div class="modal" :class="{ active: popupData.isActive }">
    <div class="modal__container">
      <h3 class="modal__title">{{ popupData.type === 'create' ? 'Новый перевод' : 'Редактирование' }}</h3>
      <div class="modal__edit">
        <label class="modal__edit-label" for="modal__edit-english">Английский</label>
        <input class="modal__edit-input"
               ref="english"
               type="text"
               autocomplete="off"
               id="modal__edit-english"
               :value="popupData.pair.english"
               @input="updateEnglish">
        <div v-for="(word, part, index) in popupData.pair.russian" :key="index">
          <label class="modal__edit-label" for="modal__edit-noun">{{ part }}</label>
          <input class="modal__edit-input"
                 :data-part="part"
                 ref="trans_input"
                 type="text"
                 autocomplete="off"
                 id='modal__edit-noun'
                 :value="word"
                 @input="updateRussian">
        </div>
      </div>
      <button class="modal__save" @click='handleSave'>Сохранить</button>
      <button class="modal__close" @click='handleClose'>Закрыть</button>
    </div>
  </div>
</template>

<script>
class Translation {
  constructor(data = {}) {
    this.noun = data.noun ? data.noun : null;
    this.verb = data.verb ? data.verb : null;
    this.adjective = data.adjective ? data.adjective : null;
    this.other = data.other ? data.other : null;
  }
}

export default {
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

    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.english.focus()
      }, 300)
    });
  }
}
</script>

<style>
@import url(/src/assets/styles/popup.css);
</style>
