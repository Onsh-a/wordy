<template>
  <div class="modal__container">
    <h3 class="modal__title">
      {{ popupDataType === 'create' ? 'New Pair' : 'Edit Pair' }}
    </h3>

    <div class="modal__edit" v-if="newPair">
      <ui-popup-input
        :is-active="popupData.isActive"
        :word="newPair.foreign"
        :part="$translate(newPair.lang)"
        @input="updateForeign"
      />
      <ui-popup-input
        v-for="(word, part, index) in newPair.russian"
        :key="index"
        :word="word"
        :part="part"
        @input="updateRussian"
      />
    </div>
    <button class="modal__save" @click='handleSave'>Save</button>
    <button class="modal__close" @click='emits("close-popup")'>Close</button>
  </div>
</template>

<script setup lang="ts">
import UiPopupInput from '@/components/ui/uiPopupInput';
import { useStore } from 'vuex';
import { computed, ref, watch, Ref } from 'vue';
import { NewPair, RussianVocabularyData } from '@/types/newPair';

const emits = defineEmits(['close-popup']);
const store = useStore();
const popupData = computed(() => store.state.popup);
const popupDataType = computed(() => popupData.value.type);
const preparedPopupData = computed(() => store.getters.getCurrentPairData);
const newPair:Ref<NewPair | null> = ref(null);
const handleSave = () => {
  if (!newPair.value) return;
  if (popupDataType.value === 'create') {
    store.dispatch('addPair', {
      lang: newPair.value.lang,
      foreign: newPair.value.foreign,
      russian: newPair.value.russian
    })
  } else {
    store.dispatch('editPair', {
      id: store.state.currentPairId,
      foreign: newPair.value.foreign,
      russian: newPair.value.russian,
    })
  }
}

const updateForeign = ([part, newValue]:string[]) => {
  if (!newPair.value) return;
  newPair.value.foreign = newValue;
}

const updateRussian = ([part, newValue]:string[]) => {
  if (!newPair.value) return;
  newPair.value.russian[part as keyof RussianVocabularyData] = newValue;
}

watch(() => preparedPopupData.value, () => {
  newPair.value = preparedPopupData.value;
},
  { deep: true })

</script>

