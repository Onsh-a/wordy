<template>
  <div class="container">
    <div class="list-header">
      <input class="list-header__search" type="text" placeholder="Поиск" v-model="searchData" @input="search">
      <button class="button-sort" :class="{ up: ascending }" @click="sort">Сортировать</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      searchData: null,
      ascending: true
    }
  },
  methods: {
    search() {
      this.$store.commit('handleSearch', this.searchData);
    },
    sort() {
      this.ascending = !this.ascending;
      this.$store.commit('handleSort', this.ascending);
    }
  }
}
</script>

<style scoped>
.list-header {
  background-color: #b19387;
  padding: 10px;
  display: flex;
  justify-content: space-between;
}

.list-header__search {
  display: block;
  padding: 7px 5px 8px;
  font-family: Nunito, serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 21px;
  color: #2c3e50;
  width: calc(40% - 10px);
}

.button-sort {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: #2c3e50;
  background-size: 20px;
  background-repeat: no-repeat;
  background-position: 50%;
  font-size: 0;
  cursor: pointer;
  background-image: url(/src/assets/icons/down-arrow.svg);
  transition: .2s filter ;
}

.button-sort:hover {
  filter: opacity(80%);
}

.button-sort.up {
  transform: rotate(180deg);
}

</style>
