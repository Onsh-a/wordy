<template>
  <div>
    <label
      class="modal__edit-label"
      :for="`modal__edit-${part}`"
    >
      {{ $translate(part) }}
    </label>
    <input
      class="modal__edit-input"
      :id="`modal__edit-${part}`"
      autocomplete="off"
      ref="input"
      :value="word"
      type="text"
      @input="inputUpdated"
    />
  </div>
</template>

<script setup lang='ts'>
import { watch, ref } from 'vue';
import type { Ref } from 'vue';
const props = defineProps({
  word: [String, Array],
  part: String,
  handler: Function,
  isActive: Boolean,
})
const emit = defineEmits(['input'])

const inputUpdated = (e:InputEvent) => {
  if (!e.target) return;
  emit('input', [props.part, (e.target as HTMLInputElement).value]);
}

const input: Ref<HTMLInputElement | null> = ref(null);
// watch(() => props.isActive, async (val) => {
//   if (val) {
//     setTimeout(() => {
//       if (!input.value) return;
//       input.value.focus();
//     }, 400)
//   }
// })
</script>

