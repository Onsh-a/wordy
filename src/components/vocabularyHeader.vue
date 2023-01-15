<template>
  <header class='header'>
    <div class="container">
      <AuthControls />
      <h2 class='header__logo'>Wordy</h2>
      <div class="header__right">
        <button @click.prevent='toggleCurrentLang' class="header__lang-toggle">{{ currentLang }}</button>
        <button @click.prevent="createNew" class='header__add'>Add pair</button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import AuthControls from './authControls';
import { useStore } from 'vuex';
import { computed } from 'vue';
const store = useStore();

const currentLang = computed(() => {
  return store.state.lang.toUpperCase();
})

const createNew = () => {
  store.commit('handlePopup', {
    type: 'create',
  })
}

const toggleCurrentLang = () => {
  store.dispatch('changeLang');
}
</script>

<style scoped lang="scss">

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $base-color;
    margin-bottom: 40px;
    height: 60px;

    &__right {
      display: flex;
    }

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
      background: $base-bkg-color;
      border: 2px solid $border-color;
      color: $btn-color;
      border-radius: 10px;
      cursor: pointer;
      transition: .2s;

      &:hover {
        opacity: 80%;
      }
    }

    &__lang-toggle {
      display: flex;
      justify-content: center;
      align-items: center;
      background: $base-bkg-color;
      border: 2px solid $border-color;
      color: $btn-color;
      border-radius: 10px;
      height: 30px;
      width: 50px;
      cursor: pointer;
      user-select: none;
      margin-right: 10px;
      transition: .2s;

      &:hover {
        opacity: 80%;
      }
    }

    &__logo {
      font-size: 32px;
      color: #ffffff;
      margin: 0;
    }
  }

</style>
