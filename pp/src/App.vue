<template>
  <div>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <component :is="page"/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import PP from './pages/PP'
import Despesas from './pages/Despesas'

export default {
  name: 'App',
  components: {
    PP,
    Despesas
  },
  data() {
    return {
      page: 'Despesas'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
