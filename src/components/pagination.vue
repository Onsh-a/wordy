<template>
  <div class="pagination">
    <button
      :class="['pagination__item', { active: activePage === page }]"
      v-for="page in pages"
      @click.prevent="updatePagination(page)"
    >
      {{ page + 1 }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  totalPaginationPages: Number,
  activePage: Number,
})
const emit = defineEmits(['updatePagination']);

const updatePagination = (offset:number) => emit('updatePagination', offset);

const pages = computed(() => {
  if (!props.totalPaginationPages) return [];
  return Array.from(Array(props.totalPaginationPages).keys());
})
</script>

<style lang="scss">
.pagination {
  display: flex;
  padding: 10px 10px;
  border-left: 1px solid black;
  border-right: 1px solid black;

  &__item {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 5px;
    background-color: $secondary-color;
    border: 2px solid $secondary-color;
    color: #FFFFFF;
    cursor: pointer;
    transition: .2s;

    &:not(:first-child) {
      margin-left: 5px;
    }

    &.active {
      background-color: $base-bkg-color;
      color: $secondary-color;
    }
  }
}

</style>
