<template>
  <div class="container">
    <Pagination
      :activePage="activePage"
      :totalPaginationPages="totalPaginationPages"
      @update-pagination="updatePaginationOffest"
    />
    <div class='pair__container'>
      <VocabularyItem v-for='pair in getPaginatedVocabulary' :pair="pair" :key="pair._id"/>
      <div class='pair__not-found' v-if="getPaginatedVocabulary.length === 0 || getPaginatedVocabulary.length === 0">
        {{
          vocabulary.length === 0 ?
            'Пока что ваш словарь пуст' :
            'На данный момент словарь не содрежит ничего похожего'
        }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VocabularyItem from '@/components/vocabularyItem.vue';
import Pagination from '@/components/pagination.vue';
import vocabularyPair from '@/types/vocabulary';
import {computed, ref, ComputedRef, watch } from 'vue';
import { useStore } from 'vuex';

const props = defineProps<{
  vocabulary: vocabularyPair[]
}>()

const store = useStore();
const DEFAULT_PAGINATION = 6;

const searchData: ComputedRef<string> = computed(() => store.state.search);
const isAscendingSort = computed(():string => store.state.ascending);
const preparedVocabulary: ComputedRef<vocabularyPair[]> = computed(() => {
  if (props.vocabulary.length === 0) return true;
  const vocabularyCopy = JSON.parse(JSON.stringify(props.vocabulary));
  let filteredVocabulary = isAscendingSort ? props.vocabulary : vocabularyCopy.reverse();
  return filteredVocabulary.filter((item: vocabularyPair) => {
    return item.foreign.join('').toLowerCase().includes(searchData.value.toLowerCase());
  })
});

const updatePaginationOffest = (offset:number) => {
  activePage.value = offset;
  paginationOffset.value = offset * DEFAULT_PAGINATION;
}

const totalPaginationPages = computed(() => {
  return Math.ceil(preparedVocabulary.value.length / DEFAULT_PAGINATION);
})

const activePage = ref(0);
const paginationOffset = ref(0);

const getPaginatedVocabulary = computed(() => {
  if (!preparedVocabulary.value.length) return []
  const topBorder = paginationOffset.value + DEFAULT_PAGINATION;
  return preparedVocabulary.value.slice(paginationOffset.value, topBorder);
})

watch(() => store.state.lang, () => {
  paginationOffset.value = 0;
  activePage.value = 0;
});
</script>

<style>
.pair__container {
  border: 1px solid black;
  margin-bottom: 20px;
}

.pair__not-found {
  padding: 30px;
}
</style>
