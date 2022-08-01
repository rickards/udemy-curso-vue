<template>
  <div :key="expensesGroupByName">
    <TitleSlideDown title="Despesas"></TitleSlideDown>

    <br><br>
    <div v-if="expensesGroupByName.length != 0">
      <donut-chart :series="top10value"
        :labels="top10label" />
    </div>
    <div v-else>
      <h1>Não há despesas cadastradas para esse mês!</h1>
    </div>

    <br>
    <br>
    <input class="input" type="month" v-model="month" />{{month}}
    <br>
    <br>
    <br>

    <div class="grid-cards">
      <Line v-for="inv in expensesGroupByName" :key="inv.id" :value="inv.reduce(lambdaAmount, 0)" :label="inv[0].name">
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
      expensesGroupByName: [],
      lambdaAmount: (sum, i) => i.value + sum,
      month: undefined
    };
  },
  created() {
    console.log("created!")
    this.month = ""
  },
  updated() {
    console.log("update")
  },
  watch: {
    // whenever question changes, this function will run
    month(month) {
      this.updatePage(month)
    }
  },
  methods: {
    updatePage(month){
      database.getExpensesMonth(month).then((result) => {
        const expenses = utils.filter(result, (i) => i.type === "Despesa");
        console.log(expenses)

        let expensesGroupByName = utils.groupBy(expenses, (i) => i.name);

        const names = [];
        const values = Object.keys(expensesGroupByName).map((name, index) => {
          names.push(name);
          return expensesGroupByName[name].reduce(
            (sum, inv) => sum + inv.value + 0.00000001 * index,
            0
          );
        });

        const indexOrder = values.slice().sort().map((i) => values.indexOf(i));
        expensesGroupByName = indexOrder.map(
          (i) => expensesGroupByName[names[i]]
        );

        expensesGroupByName.sort(
          (a, b) =>
            b.reduce(this.lambdaAmount, 0) - a.reduce(this.lambdaAmount, 0)
        );

        // Modifica um data e aciona o updated apenas 1 vez
        this.expensesGroupByName = expensesGroupByName
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
      const somatorio = this.expensesGroupByName.map(i => i.reduce(this.lambdaAmount, 0))
      if (somatorio.slice(9).length!=0){
        return somatorio.slice(0,9).concat(somatorio.slice(9).reduce((sum,i)=> i+sum))
      }else{
        return somatorio
      }
    },
    top10label(){
      const names = this.expensesGroupByName.map(i => i[0].name)
      if(names.slice(9).length!=0){
        return names.slice(0,9).concat(["Outros"])
      }else{
        return names
      }
    },
  }
};
</script>

<style>
</style>