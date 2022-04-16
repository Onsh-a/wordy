<template>
  <div class="modal" :class="popupData.isActive ? 'modal--open' : ''">
    <div class="modal__container">
      <h3 class="modal__title">{{ popupData.type === 'create' ? 'Новый перевод' : 'Редактирование' }}</h3>
      <div class="modal__edit">
        <label class="modal__edit-label" for="modal__edit-english">English</label>
        <input class="modal__edit-input"
               ref="english"
               type="text"
               autocomplete="off"
               id="modal__edit-english"
               :value="currentPair.english"
               @input="updateEnglish">
        <label class="modal__edit-label" for="modal__edit-russian">Russian</label>
        <input class="modal__edit-input"
               type="text"
               autocomplete="off"
               id='modal__edit-russian'
               :value="currentPair.russian"
               @input="updateRussian">
      </div>
      <button class="modal__close" @click='handleClose'>Закрыть</button>
      <button class="modal__save" @click='handleSave'>Сохранить</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newData: {
        russian: null,
        english: null
      }
    }
  },
  computed: {
    popupData() {
      return {
        isActive: this.$store.state.popup.isActive,
        type: this.$store.state.popup.type,
      }
    },
    currentPair: {
      get: function() {
        let id = this.$store.state.currentId;
        if (!id) return { russian: '', english: '' }

        let currentData = this.$store.state.vocabulary.filter((item) => item._id === id);

        currentData = {
          russian: currentData[0]?.russian.join(', '),
          english: currentData[0]?.english.join(', '),
        }

        return currentData
      }
    }
  },
  methods: {
    handleClose() {
      this.$store.commit('handlePopup', 'close');
    },
    updateRussian(e) {
      this.newData.russian = e.target.value;
    },
    updateEnglish(e) {
      this.newData.english = e.target.value;
    },
    handleSave() {
      const type = this.popupData.type;
      this.handleClose();
      if (type === 'create') {
        this.$store.dispatch('addPair', {
          russian: this.newData.russian,
          english: this.newData.english
        })
      } else {
        this.$store.dispatch('editPair', {
          id: this.$store.state.currentId,
          russian: this.newData.russian,
          english: this.newData.english
        })
      }
    }
  },
  updated() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs.english.focus()
      }, 500)
    });
  }
};
</script>

<style>
  @import url(/src/assets/styles/popup.css);
</style>
