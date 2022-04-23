<template>
  <div class="modal__container">
    <h3 class="modal__title"> {{ getPopupType.authType === 'signup' ? 'Зарегистрироваться' : 'Войти' }}</h3>

    <div v-for="(entity, name) in user" :key="name">
      <label class="modal__edit-label" :for="`modal__${name}`">{{ name }}</label>
      <input class="modal__edit-input" type="text" autocomplete="off"
             :id='`modal__${name}`' v-model="user[name]"/>
    </div>

    <button class="modal__save" @click='handleSign'>{{getPopupType.authType === 'signup' ? 'Сохранить' : 'Войти'}}
    </button>
    <button @click='popupClose' class="modal__close">Закрыть</button>
  </div>
</template>

<script>

export default {
  data() {
    return {
      user: {
        name: null,
        login: null,
        pwd: null,
        email: null,
      }
    }
  },
  props: ['popupClose'],
  computed: {
    getPopupType() {
      return {
        authType: this.$store.state.auth.authType
      }
    }
  },
  methods: {
    handleSign({dispatch}) {
      if (this.getPopupType.authType === 'signup') {
        this.$store.dispatch('signIn', {
          name: this.user.name,
          login: this.user.login,
          email: this.user.email,
          pwd: this.user.pwd,
        })
      } else {
        this.$store.dispatch('logIn', {
          login: this.user.login,
          pwd: this.user.pwd,
        })
      }
      this.popupClose();
    },
  }
}
</script>

<style scoped>

.modal__save {
  margin-top: 20px;
}


</style>

