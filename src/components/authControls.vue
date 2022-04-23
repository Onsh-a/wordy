<template>
  <div class="auth">
    <button data-type="signup" @click.prevent="openAuthPopup($event)" class="auth__signup">Sign up</button>
    <button data-type="signin" @click.prevent="openAuthPopup($event)" class="auth__signin">Sign in</button>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {},
  methods: {
    openAuthPopup() {
      const authType = event.target.dataset.type;
      this.$store.commit('handlePopup', {
        type: 'auth',
        authType: authType,
      })
    },
  },
};
</script>

<style scoped lang="scss">

.auth {
  display: flex;

  &__signup {
    margin-right: 10px;

  }

  &__signup,
  &__signin {
    display: flex;
    justify-content: center;
    align-items: center;
    background: $secondary-color;
    border: 2px solid $border-color;
    color: $btn-color;
    border-radius: 10px;
    height: 30px;
    width: 80px;
    cursor: pointer;
    user-select: none;
    padding: 0 10px;
    transition: .2s;

    &:hover {
      opacity: 80%;
    }
  }
}

</style>
