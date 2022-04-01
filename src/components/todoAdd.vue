<template>
  <div>
    <input v-model='name' @keydown.enter='addTodo' type="text">
  </div>
</template>

<script>
export default {
  name: 'todoAdd',
  data() {
    return {
      name: ''
    }
  },
  props: {
    qty: 0,
  },
  methods: {
    addTodo() {
      this.$emit('todoAdded', {
        id: this.qty,
        title: this.name,
        completed: false
        });
      this.name = ''
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  text-align: left;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
