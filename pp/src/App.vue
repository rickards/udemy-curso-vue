<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <LineChart/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import LineChart from './components/LineChart.vue'

export default {
  name: 'App',
  components: {
    HelloWorld,
    LineChart
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
