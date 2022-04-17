<template>
  <div>
    <label ref="english" class="modal__edit-label" for="modal__edit-noun">{{ dictionary[part] ? dictionary[part] : part  }}</label>
    <input class="modal__edit-input" :data-part="part" ref="trans_input" type="text"
           autocomplete="off" id='modal__edit-noun' :value="word" @input="handler"/>
  </div>
</template>

<script>
import transl from "./../../assets/utils/translation"

export default {
  data() {
    return {
      dictionary: transl
    }
  },
  props: ['word', 'part', 'handler', 'isActive'],
  watch: {
    isActive: function (val) {
      if (val === true) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.english.focus()
          }, 500)
        })
      }
    }
  }
}
</script>

