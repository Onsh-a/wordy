<template>
  <div class="modal__container">
    <h2 class="modal__title">
      Здравствуйте, {{ userName }}!
    </h2>
    <div class="modal__text">Вы успешно авторизованы!</div>
    <button @click="popupClose" class="modal__save">Дальше</button>
  </div>
</template>

<script>
export default {
  props: {
    popupClose: Function,
    userName: String,
  }
}
</script>

<style scoped lang="scss">
.modal {
  &__text {
    margin-bottom: 20px;
  }
}

</style>

