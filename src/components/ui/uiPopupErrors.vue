<template>
  <ul class="modal-error">
    <li class="modal-error__item" v-for="error in errors">{{ error }}</li>
  </ul>
</template>

<script>
export default {
  props: ['errors'],
}
</script>

