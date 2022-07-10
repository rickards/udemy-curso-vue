<template>
  <div class="grid-columns">
    <div class="account-record">
      <h1>Registro Contábil</h1>
      <div class="grid-buttons">
        <button
          :class="{
            active: natureCombobox == 'gasto',
            'acc-record-button': true,
          }"
          @click="natureCombobox = 'gasto'"
        >
          Gasto
        </button>
        <button
          :class="{
            active: natureCombobox == 'ganho',
            'acc-record-button': true,
          }"
          @click="natureCombobox = 'ganho'"
        >
          Ganho
        </button>
        <button
          :class="{
            active: natureCombobox == 'investimento',
            'acc-record-button': true,
          }"
          @click="natureCombobox = 'investimento'"
        >
          Investimento
        </button>
      </div>
      <br>

      <input class="input" type="date" :value="date" />

      <div class="grid-columns gap">
        <input
          class="input"
          type="text"
          placeholder="nome descritor"
          v-model="billname"
        />
        <input
          class="input"
          type="number"
          placeholder="valor"
          v-model="value"
        />
      </div>

      <div><input v-model="isAsset" type="checkbox" /> <label>Bem</label></div>
      <div v-show="natureCombobox == 'investimento'">
        <label>Quantidade de cotas:</label>
        <input
          type="number"
          placeholder="5"
          style="width: 50px"
          v-model="numberQuotes"
        />
      </div>
      <label v-show="info" style="color: red"
        >Há campos obrigatórios vazios!</label
      >
      <button class="acc-record-button" @click="sendRecord">Registrar</button>
    </div>
  </div>
</template>

<script>
import database from "@/helpers/db-interface";
// import Post from "../components/Post.vue";

export default {
  name: "AccountRecord",
  // components: {
  //   Post,
  // },
  data() {
    return {
      natureCombobox: "gasto",
      date: undefined,
      info: false,
      isAsset: false,
      value: undefined,
      id: undefined,
      billname: undefined,
      numberQuotes: undefined,
      type: undefined,
    };
  },
  created() {
    this.preloadSetup();
  },
  watch: {
    natureCombobox() {
      this.typeFromSetup();
    },
  },
  methods: {
    preloadSetup() {
      this.loadParamsURL();
      this.mappingSetupFromLabel();
      this.typeFromSetup();
    },
    loadParamsURL() {
      var url = new URL(window.location.href);
      this.id = url.searchParams.get("id");
      this.billname = url.searchParams.get("label");
      this.date =
        url.searchParams.get("date") || new Date().toISOString().slice(0, 10);
      const price = url.searchParams.get("value") || this.value;
      this.value = parseFloat(price);
      this.type = url.searchParams.get("type");
    },
    mappingSetupFromLabel() {
      switch (this.type) {
        case "Bem_ganho":
          this.isAsset = true;
          this.natureCombobox = "ganho";
          break;
        case "Bem_gasto":
          this.isAsset = true;
          this.natureCombobox = "gasto";
          break;
        case "Receita":
          this.isAsset = false;
          this.natureCombobox = "ganho";
          break;
        case "Despesa":
          this.isAsset = false;
          this.natureCombobox = "gasto";
          break;
        case "Investimento":
          this.isAsset = false;
          this.natureCombobox = "investimento";
          break;
        default:
      }
    },
    sendRecord() {
      if (this.validData()) {
        var expense = {
          name:
            this.natureCombobox == "Investimento"
              ? this.billname.toUpperCase()
              : this.capitalize(this.billname),
          value: this.value,
          date: this.date,
          type: this.type,
          qtde: this.numberQuotes,
        };
        if (this.id) {
          expense.id = this.id;
          database.updateExpenseDatabase(expense);
        } else {
          database.addExpenseDatabase(expense);
        }
        this.clearForm();
      } else {
        this.info = true;
      }
    },
    validData() {
      return this.billname && this.value && this.date && this.type;
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    },
    clearForm() {
      this.billname = "";
      this.value = "";
      this.isAsset = false;
      this.info = false;
    },
    typeFromSetup() {
      switch (this.natureCombobox) {
        case "ganho":
          this.type = this.isAsset ? "Bem_ganho" : "Receita";
          break;
        case "gasto":
          this.type = this.isAsset ? "Bem_gasto" : "Despesa";
          break;
        default:
          this.type = this.natureCombobox;
          break;
      }
    },
  },
};
</script>

<style>
.account-record {
  display: inline-grid;
  padding: 1%;
  row-gap: 2em;
}

.acc-record-button {
  outline: none;
  border: 3px solid rgba(3, 3, 3, 0.144);
  border-radius: 20px;
  background-color: #2195f3bb;
  color: rgb(236, 226, 226);
  font-size: 1rem;
  margin-bottom: 5px;
  margin: 0.2%;
  height: 40px;
}

.active {
  background-color: #21f372bb;
  box-shadow: 0px 0px 8px 8px rgba(36, 211, 103, 0.658);
}

.input {
  font-size: 20px;
  font-size: max(16px, 1em);
  font-family: inherit;
  padding: 0.25em 1.5em;
  background-color: rgb(95, 95, 95);
  color: antiquewhite;
  border: 2px solid var(--input-border);
  border-radius: 50px;
  size: 1rem;
  height: 40px;
}

.gap {
  row-gap: 2em;
  column-gap: 2em;
}

.grid-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  padding: 0.5%;
  margin: 0.5%;
  width: 98%;
}

.grid-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}
</style>
