<template>
  <div>
    <label
      class="modal__edit-label"
      for="modal__edit-noun"
    >
      {{ $translate(part) }}
    </label>
    <input
      class="modal__edit-input"
      ref="foreign"
      :data-part="part"
      type="text"
      autocomplete="off"
      id='modal__edit-noun'
      :value="word"
      @input="handler"
    />
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
            this.$refs.foreign.focus()
          }, 500)
        })
      }
    }
  }
}
</script>

