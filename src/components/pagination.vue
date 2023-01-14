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
  if (!props.totalPaginationPages) return []
  return Array.from(Array(props.totalPaginationPages).keys())
})
</script>

<style lang="scss">
.pagination {
  display: flex;
  margin-bottom: 40px;

  &__item {
    display: block;
    width: 25px;
    height: 25px;
    border-radius: 5px;
    background-color: #778da9;
    border: 2px solid #0d1b2a;
    color: #FFFFFF;
    cursor: pointer;
    transition: .2s;

    &:not(:first-child) {
      margin-left: 5px;
    }

    &.active {
      background-color: #FFFFFF;
      color: #778da9;
    }
  }
}

</style>
