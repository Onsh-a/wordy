<template>
  <header class='header'>
    <div class="container">
      <div @click='toggleCurrentLang' class="header__lang-toggle">{{ getCurrentLang }}</div>
      <h2 class='header__logo'>Wordy</h2>
      <button @click.prevent="createNew" class='header__add'>Добавить слово</button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    getCurrentLang() {
      return this.$store.state.lang
    }
  },
  methods: {
    createNew({commit}) {
      this.$store.commit('handlePopup', {
        type: 'create',
      })
    },
    toggleCurrentLang({ dispatch }) {
      this.$store.dispatch('changeLang', )}
  }
};
</script>

<style scoped lang="scss">

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $base-color;
    margin-bottom: 40px;
    height: 60px;

    .container {
      display: flex;
      justify-content: space-between;
      width: 100%;
      align-items: center;
    }

    &__add {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 30px;
      width: 200px;
      //position: absolute;
      background: $secondary-color;
      border: 2px solid #FFFFFF;
      color: #FFFFFF;
      border-radius: 10px;
      cursor: pointer;
      transition: .2s;

      &:hover {
        opacity: 80%;
      }
    }

    &__lang-toggle {
      left: 20px;
      display: flex;
      justify-content: center;
      align-content: center;
      background: $secondary-color;
      border: 2px solid #FFFFFF;
      color: #FFFFFF;
      border-radius: 10px;
      bottom: 50%;
      height: 30px;
      width: 50px;
      cursor: pointer;
      user-select: none;
    }

    &__logo {
      font-size: 32px;
      color: #ffffff;
      margin: 0;
    }
  }

</style>
