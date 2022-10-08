<template>
  <div class="container">
    <div class='toaster' :class="{active: getToaster.options.isActive, success: getToaster.options.success, error: !getToaster.options.success}">
      <div class="toaster__icon"></div>
      <div class="toaster__message">
        {{ getPopupText }}
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      content: {
        create: 'Запись успешно добавлена',
        edit: 'Запись успешно редактирована',
        delete: 'Запись успешно удалена',
        error: 'Произошла ошибка'
      }
    }
  },
  computed: {
    getToaster(){
      return this.$store.state.toaster
    },
    getPopupText() {
      const type = this.getToaster.options.type;
      if (this.content.hasOwnProperty(type)) return this.content[type];
      return type;
    }
  },
  methods: {},
  updated() {
    setTimeout(() => { // timeout to let the animation pass
      this.$store.commit('handleToaster', { isActive: false, type: undefined, success: undefined });
    }, 2500);
  }
}
</script>

<style scoped lang="scss">

.toaster {
  position: fixed;
  left: 20px;
  top: 40px;
  width: 200px;
  background: lightcyan;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  opacity: 0;
  transition: .4s;
  z-index: 10;

  &__icon {
    width: 30px;
    height: 30px;
    background-image: url("/src/assets/icons/check-icon.svg");
    background-size: contain;
    background-repeat: no-repeat;
    flex: 1 0 40px;
    margin-left: 10px;
  }

  &__message {
    text-align: left;
    padding-left: 8px;
  }

  &.success {
    background: #d6eddd;
  }

  &.error {
    background: #bf2b2b;

    .toaster__message {
      color: #f8dade;
    }

    .toaster__icon {
      background-image: url("/src/assets/icons/error-icon.svg");
    }
  }

  &.active {
    opacity: 1;
  }
}

</style>
