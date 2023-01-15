<template>
  <div class="container">
    <div class="list-header">
      <input
        class="list-header__search"
        type="text"
        placeholder="Поиск"
        v-model="searchData"
        @input="search"
      >
      <button
        :class="['list-header__button-sort', {'up': isAscending}]"
        @click="sort"
      >
        Сортировать
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      searchData: null,
      isAscending: true
    }
  },
  methods: {
    search() {
      this.$store.commit('handleSearch', this.searchData);
    },
    sort() {
      this.isAscending = !this.isAscending;
      this.$store.commit('handleSort', this.isAscending);
    }
  }
}
</script>

<style scoped lang="scss">
  .list-header {
    background-color: $base-color;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    border-radius: 5px 5px 0 0;
    border: 1px solid black;
    border-bottom: none;

    &__search {
      display: block;
      padding: 7px 5px 8px;
      font-family: Nunito, serif;
      font-weight: 300;
      font-size: 16px;
      line-height: 21px;
      color: $secondary-color;
      width: calc(100% - 52px);
      border-radius: 5px;
      border: none;
    }

    &__button-sort {
      width: 40px;
      height: 40px;
      border-radius: 5px;
      background-color: $secondary-color;
      border: 2px solid $border-color;
      background-size: 20px;
      background-repeat: no-repeat;
      background-position: 50%;
      font-size: 0;
      cursor: pointer;
      background-image: url(/src/assets/icons/down-arrow.svg);
      transition: .2s filter;

      &:hover {
        filter: opacity(80%);
      }

      &.up {
        transform: rotate(180deg);
      }
    }
  }
</style>
