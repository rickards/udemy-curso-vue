<template>
  <div :key="expensesGroupByAttribute">
    <TitleSlideDown title="Despesas"></TitleSlideDown>

    <br><br>
    <div v-if="expensesGroupByAttribute.length != 0">
      <donut-chart :series="top10value"
        :labels="top10label" />
    </div>
    <div v-else>
      <h1>Não há despesas cadastradas para esse mês!</h1>
    </div>

    <br>
    <br>
    <input class="input" type="month" v-model="month" />
    <button v-if="order=='name'" class="button" @click="order='date'">📅</button>
    <button v-else-if="order=='date'" class="button" @click="order='name'">✍🏻</button>
    <br>
    <br>
    <br>

    <div class="grid-cards">
      <Line v-for="inv in expensesGroupByAttribute" :key="inv.id" :value="inv.reduce(lambdaAmount, 0)" :label="lambdaOrders[order](inv[0])">
        <Line v-for="i in inv" :key="i.id" :value="i.value" :label="i.name">
          <Line :label="i.date" @delete="rmExpense(i)"></Line>
        </Line>
      </Line>
    </div>
  </div>
</template>

<script>
import database from "@/helpers/db-interface";
import Line from "../components/Line.vue";
import utils from "../plugins/utils";
import DonutChart from "../components/DonutChart.vue";
import TitleSlideDown from "../components/TitleSlideDown.vue";

export default {
  name: "ExpensesPage",
  components: {
    Line,
    DonutChart,
    TitleSlideDown
  },
  data() {
    return {
      expensesGroupByAttribute: [],
      lambdaAmount: (sum, i) => i.value + sum,
      month: undefined,
      order: "name",
      lambdaOrders: {
        "date": (i) => i.date,
        "name": (i) => i.name
      }
    };
  },
  created() {
    console.log("created!")
    this.month = new Date().toISOString().slice(0,7);
  },
  updated() {
    console.log("update")
  },
  watch: {
    // whenever question changes, this function will run
    month(month) {
      this.updatePage(month, this.lambdaOrders[this.order])
    },
    order(order){
      this.updatePage(this.month, this.lambdaOrders[order])
    }
  },
  methods: {
    updatePage(month, attribute){
      database.getExpensesMonth(month).then((result) => {
        const expenses = utils.filter(result, (i) => i.type === "Despesa");

        let expensesGroupByAttribute = utils.groupBy(expenses, attribute);

        const keys = [];
        const values = Object.keys(expensesGroupByAttribute).map((name, index) => {
          keys.push(name);
          return expensesGroupByAttribute[name].reduce(
            (sum, inv) => sum + inv.value + 0.00000001 * index,
            0
          );
        });

        const indexOrder = values.slice().sort().map((i) => values.indexOf(i));
        expensesGroupByAttribute = indexOrder.map(
          (i) => expensesGroupByAttribute[keys[i]]
        );

        expensesGroupByAttribute.sort(
          (a, b) =>
            b.reduce((sum, i) => i[this.order] + sum, 0) - a.reduce((sum, i) => i[this.order] + sum, 0)
        );

        // Modifica um data e aciona o updated apenas 1 vez
        this.expensesGroupByAttribute = expensesGroupByAttribute
      });
    },
    editExpense(expense){
      console.log(expense)
      // var a = document.createElement('a')
      // a.href = `add_item.html?id=${listResult[id].id}&type=${listResult[id].type}&value=${listResult[id].value}&label=${listResult[id].name}&date=${listResult[id].date}`
      // a.click()
    },
    rmExpense(expense){
      database.rmExpenseDtabase(expense).then(()=>this.updatePage(this.month))
      
    }
  },
  computed: {
    top10value(){
      const somatorio = this.expensesGroupByAttribute.map(i => i.reduce(this.lambdaAmount, 0))
      if (somatorio.slice(9).length!=0){
        return somatorio.slice(0,9).concat(somatorio.slice(9).reduce((sum,i)=> i+sum))
      }else{
        return somatorio
      }
    },
    top10label(){
      const keys = this.expensesGroupByAttribute.map(i => i[0][this.order])
      if(keys.slice(9).length!=0){
        return keys.slice(0,9).concat(["Outros"])
      }else{
        return keys
      }
    },
  }
};
</script>

<style>
.button {
  border-left: none;
  background-color: #1664a3;
  border-radius: 18px;
  padding: 1em;
  margin: 1em;
}
</style>