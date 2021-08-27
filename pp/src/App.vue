<template>
  <div>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <keep-alive>
      <component :is="page" />
    </keep-alive>
    <div v-if="androidEnv">
      <button @click="page = 'AccountRecord'">RegistroContábil</button>
      <button @click="page = 'ExpenseExplorer'">Explorador de Despesas</button>
      <button @click="page = 'PP'">PP</button>
      <button @click="page = 'Investiments'">Investimentos</button>
      <button @click="page = 'Analytics'">Análise de Investimentos</button>
    </div>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import bridge from "@/helpers/db-bridge.js";
import PP from "./pages/PP";
import ExpenseExplorer from "./pages/ExpenseExplorer";
import AccountRecord from "./pages/AccountRecord";
import Investiments from "./pages/Investiments.vue";
import Analytics from "./pages/QuotesAnalysis.vue"

export default {
  name: "App",
  components: {
    PP,
    ExpenseExplorer,
    AccountRecord,
    Investiments,
    Analytics,
  },
  data() {
    return {
      page: "Analytics",
      androidEnv: bridge.ANDROID_ENVIROMENT
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 2%;
}
</style>
