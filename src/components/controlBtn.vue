<template>
  <button :class='type'></button>
</template>

<script>

export default {
  name: 'controlBtn',
  props: {
    type: String
  },
  methods: {
  
  },
}
</script>


<style scoped>
  button {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 5px;
    background-size: 50%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-color: #b19387;
    cursor: pointer;
    transition: .2s;
  }

  button:hover {
    filter: opacity(80%);
  }



  .del {
    background-image: url(/src/assets/icons/trash.svg); 
  }

  .edit {
    background-image: url(/src/assets/icons/edit.svg);
    margin-right: 10px;
  }
  

</style>
