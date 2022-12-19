<template>
  <div>
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <!-- <keep-alive> -->
      <component :is="page" @runPage="updatePage" :item="item" />
    <!-- </keep-alive> -->
    <br /><br /><br />
    <div class="grid" v-if="page != 'Password'">
      <div class="button-card" @click="page = 'AccountRecord'">
        Registro Contábil
      </div>
      <div class="button-card" @click="page = 'ExpensesPage'">
        Despesas
      </div>
      <div class="button-card" @click="page = 'PP'">Patrimônio</div>
      <div class="button-card" @click="page = 'ExpenseExplorer'">
        Explorador de Despesas
      </div>
    </div>
    <div class="grid" v-else-if="androidEnv">
      <div class="button-card" @click="page = 'Investiments'">
        Investimentos
      </div>
      <div class="button-card" @click="page = 'Analytics'">
        Análise de Cotações
      </div>
      <div class="button-card" @click="page = 'ImportData'">
        ImportData
      </div>
    </div>
    <!-- <div class="menu">
      <div class="item-menu">></div>
      <div class="item-menu">2</div>
      <div class="item-menu">3</div>
      <div class="item-menu">4</div>
      <div class="item-menu">5</div>
    </div> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import firebase from "@/helpers/db-firebase.js";
import PP from "./pages/PP";
import ExpenseExplorer from "./pages/ExpenseExplorer";
import AccountRecord from "./pages/AccountRecord";
import Investiments from "./pages/Investiments.vue";
import Analytics from "./pages/QuotesAnalysis.vue";
import ExpensesPage from "./pages/ExpensesPage.vue";
import ImportData from "./pages/ImportData.vue";
import Password from "./pages/Password.vue";

export default {
  name: "App",
  components: {
    PP,
    ExpenseExplorer,
    AccountRecord,
    Investiments,
    Analytics,
    ExpensesPage,
    ImportData,
    Password
  },
  data() {
    return {
      page: localStorage.database == "" ? "Password" : "ExpensesPage",
      androidEnv: firebase.FIREBASE_ENVIROMENT,
      item: "Despesa"
    };
  },
  created(){
  },
  mounted(){
    localStorage.database = ""
  },
  methods: {
    updatePage(arg){
      this.item = arg
      this.page = 'ExpensesPage'
    }
  }
};
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #c5c5c5;
  animation: gradient 10s ease alternate infinite;
  background: linear-gradient(-45deg, #202020, #202020, #202020, #202020)
    no-repeat;
  background-size: 500% 500%;
  /* padding: 1%; */
}

/* @keyframes gradient {
  0% {
    background-position: 0 50%;
  }

  100% {
    background-position: 100% 50%;
  }
} */

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  margin: 5%;
}

.button-card {
  box-shadow: 0 0 8px 8px rgba(126, 126, 126, 0.658);
  margin: 10%;
  width: 80%;
  padding: 5%;
  cursor: pointer;
  text-align: center;
  padding-left: 8%;
}
</style>
