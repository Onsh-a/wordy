<template>
  <div :class="['spinner', {'active': isActive}]">
    <div class="spinner__element"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isActive: Boolean
})
</script>

<style scoped lang="scss">
.spinner {
  display: none;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #FFFFFF;
  z-index: 2;
  top: 0;
  left: 0;

  &__element {
    display: none;
    margin: 0 auto;
    font-size: 10px;
    position: relative;
    width: 40px;
    height: 40px;
    text-indent: -9999em;
    border-radius: 50%;
    border-top: 5px solid $base-color;
    border-right: 5px solid $base-color;
    border-bottom: 5px solid $base-color;
    border-left: 5px solid #ffffff;
    -webkit-animation: spinner 1.1s infinite linear;
    animation: spinner 1.1s infinite linear;
    top: calc(50% - 20px);
  }

  &.active {
    display: block;

    .spinner__element {
      display: block;
    }
  }

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>




