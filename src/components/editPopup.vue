<template>
  <div class="modal" :class="isActive ? 'modal--open' : ''">
    <div class="modal__container">
      <h3 class="modal__title">Редактирование:</h3>
      <p class="modal__text">Тут будут данные</p>
      <button class="modal__close">Закрыть</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "editPopup",
  data() {
    return {
      isActive: true,
    }
  }
};
</script>


<style scoped>
  .modal {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10000;

    display: flex;
    flex-direction: column;
    justify-content: center;

    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
  }

  .modal--open {
    opacity: 1;
    visibility: visible;
  }

  .modal__close {
    position: absolute;
    top: 10px;
    right: 10px;

    width: 30px;
    height: 30px;

    font-size: 0;

    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .modal__close::before,
  .modal__close::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -7px;
    width: 14px;
    height: 2px;
    background: #9f9f9f;
  }

  .modal__close::before {
    transform: rotate(45deg);
  }

  .modal__close::after {
    transform: rotate(-45deg);
  }

  .modal__container {
    position: relative;

    max-width: 430px;
    padding: 30px;
    margin: 0 auto;

    background-color: #fff;
  }
</style>
