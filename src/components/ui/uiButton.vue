<template>
  <button :class='options.type' @click='handleClick'></button>
</template>

<script>

export default {
  props: {
    options: Object,
    id: String,
  },
  methods: {
    handleClick() {
      this.$store.commit('handlePopup', {
        type: this.options.type,
        id: this.id
      })
      if (this.options.type === 'delete') {
        this.$store.dispatch('deletePair', {
          id: this.id,
        })
      }
    }
  },
}
</script>

<style scoped lang="scss">
  button {
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background-size: 50%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-color: $secondary-color;
    border: 2px solid $border-color;
    cursor: pointer;
    transition: .2s;

    &:hover {
      opacity: 80%;
    }

    &.delete {
      background-image: url(/src/assets/icons/trash.svg);
    }

    &.edit {
      background-image: url(/src/assets/icons/edit.svg);
      margin-right: 10px;
    }
  }
</style>
