<template>
  <div>
    <label ref="english" class="modal__edit-label" for="modal__edit-noun">{{ part }}</label>
    <input class="modal__edit-input" :data-part="part" ref="trans_input" type="text"
           autocomplete="off" id='modal__edit-noun' :value="word" @input="handler"/>
  </div>
</template>

<script>
export default {
  props: ['word', 'part', 'handler', 'isActive'],
  watch: {
    isActive: function (val) {
      if (val === true) {
        this.$nextTick(() => {
          setTimeout(() => {
            this.$refs.english.focus()
          }, 500)
        }, 300)
      }
    }
  }
}
</script>

