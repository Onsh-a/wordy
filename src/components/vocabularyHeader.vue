<template>
  <header class='header'>
    <div class="container">
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
  computed: {},
  methods: {
    createNew({commit}) {
      this.$store.commit('handlePopup', {
        type: 'create',
      })
    }
  }
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b19387;
  margin-bottom: 40px;
  height: 60px;
}

.container {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
}

.header__add {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 200px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  background: #FFFFFF;
  border-radius: 10px;
  cursor: pointer;
}

h2 {
  font-size: 32px;
  color: #ffffff;
  margin: 0;
}

</style>
