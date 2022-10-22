<template>
  <div class="modal__container">
    <spinner :is-active="getAsyncData.pending" />
    <h3 class="modal__title"> {{ authType === 'signup' ? 'Зарегистрироваться' : 'Войти' }}</h3>

    <div v-for="(_, name, index) in getPopupSceleton" :key="name">
      <label class="modal__edit-label" :for="`modal__${name}`">{{ $translate(name) }}</label>
      <input class="modal__edit-input"
             @keydown.enter="handleSign"
             :ref="`input_${index}`"
             type="text" autocomplete="off"
             :id='`modal__${name}`'
             :data-type="name"
             v-model="getPopupSceleton[name]"/>
    </div>

    <div v-if="getAsyncData.errorMessage" class="modal__error">
      {{ getAsyncData.errorMessage }}
    </div>

    <button class="modal__save" @click='handleSign'>{{this.authType === 'signup' ? 'Зарегистрироваться' : 'Войти'}}
    </button>
    <button @click='popupClose' class="modal__close">Закрыть</button>
  </div>
</template>

<script>
import utils from '../assets/utils/common';
import spinner from './ui/uiSpinner'

export default {
  components: {
    spinner,
  },
  data() {
    return {
      createUser: {
        name: '',
        login: '',
        pwd: '',
        email: '',
      },
      loginUser: {
        login: '',
        pwd: '',
      }
    }
  },
  props: ['popupClose', 'authType'],
  computed: {
    getPopupSceleton: {
      get: function () {
        return this.authType === "signup" ? this.createUser : this.loginUser;
      },
      set: function(newValue) {
        this.getPopupSceleton = newValue;
      }
    },
    getAsyncData() {
      return this.$store.state.asyncManagement
    }
  },
  methods: {
    validatePopup(clearError = false) {
      const errors = [];
      for (let key in this.getPopupSceleton) {
        const input = this.getPopupSceleton[key];

        if (key === 'email') {
          if (!utils._validateEmail(input)) {
            errors.push(`Введен еmail неверноего формата`);
          }
        } else {
          if (input.length < 1) {
            errors.push(`Поле ${this.$translate(key)} должно быть заполнено`);
          }
        }
      }

      this.$store.commit("handleErrorMessages", errors);

      return errors.length <= 0;
    },
    handleSign() {
      if (!this.validatePopup()) return false;
      if (this.authType === 'signup') {
        this.$store.dispatch('signIn', {
          name: this.createUser.name,
          login: this.createUser.login,
          email: this.createUser.email,
          pwd: this.createUser.pwd,
        })
      } else {
        this.$store.dispatch('logIn', {
          login: this.loginUser.login,
          pwd: this.loginUser.pwd,
        })
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        this.$refs['input_0'][0].focus();
      }, 300)
    })
  }
}
</script>

<style scoped lang="scss">
.modal {

  .modal__edit-error-text {
    display: none;
  }

  &__edit-input.error {
    border: 2px solid red;
    margin-bottom: 5px;

    + .modal__edit-error-text {
      display: block;
      text-align: left;
      color: red;
      margin-bottom: 15px;
    }
  }

  &__error {
    margin-bottom: 10px;
    text-align: left;
    color: red;
  }

  &__save {
    margin-top: 20px;
    cursor: pointer;
    transition: .2s;

    &:hover {
      opacity: 80%;
    }
  }

  &__edit-label {
    text-transform: capitalize;
  }
}
</style>
