<template>
  <div class="logged-out__overlay">
    <div class="logged-out__container">
      <div class="logged-out__title">Wordy</div>

      <div class="logged-out__description">
        Пожалуйста, зайдтие в аккаунт или зарегистрируйтесь
      </div>

      <button @click.prevent='handleAuth($event)' data-auth="signin" class="logged-out__button">Войти</button>
      <button @click.prevent='handleAuth($event)' data-auth="signup" class="logged-out__button">Зарегистрироваться</button>
    </div>
  </div>
</template>

<script>

export default {
  methods: {
    handleAuth(e) {
      this.$store.commit('handlePopup', {
        type: 'auth',
        authType: e.target.dataset.auth,
      })
    }
  },
};
</script>

<style lang="scss">
.logged-out {

  &__overlay {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    backdrop-filter: blur(6px);
    z-index: 10;
  }

  &__container {
    width: 280px;
    border-radius: 10px;
    background: #FFFFFF;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
  }

  &__title {
    margin-bottom: 20px;
    font-size: 21px;
    line-height: 24px;
    font-weight: 700;
  }

  &__description {
    font-size: 16px;
    margin-bottom: 20px;
  }

  &__button {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border-radius: 10px;
    border: 2px solid $base-color;
    font-size: 16px;
    padding: 6px 0;
    cursor: pointer;
    transition: .2s;
    color: $btn-color;

    &:hover {
      background-color: $secondary-color;
    }

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
}

</style>
