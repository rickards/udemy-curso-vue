<template>
  <div v-if="expenses.length!=0">
    <TitleSlideDown title="Despesas"></TitleSlideDown>

    <br><br>
    <donut-chart 
      :series="expensesGroupByName.map(i => i.reduce(lambdaAmount, 0))" 
      :labels="expensesGroupByName.map(i => i[0].name)"  
    />

    <br><br>
    <div class="grid-cards">
      <Line
        v-for="inv in expensesGroupByName"
        :key="inv.id"
        :value="inv.reduce(lambdaAmount, 0)"
        :label="inv[0].name"
      >
        <Line v-for="i in inv" :key="i.id" :value="i.value" :label="i.name">
        </Line>
      </Line>
    </div>
  </div>
  <div v-else>
    <h1>Não há despesas cadastradas!</h1>
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
      expenses: [],
      expensesGroupByName: [],
      lambdaAmount: (sum, i) => i.value + sum
    };
  },
  created() {
    database.getExpensesDatabase().then((result) => {
      console.log(result)
      this.expenses = utils.filter(result, (i) => i.type === "Despesa");

      const expensesGroupByName = utils.groupBy(this.expenses, (i) => i.name);

      const names = [];
      const values = Object.keys(expensesGroupByName).map((name, index) => {
        names.push(name);
        return expensesGroupByName[name].reduce(
          (sum, inv) => sum + inv.value + 0.00000001*index,
          0
        );
      });

      const indexOrder = values.slice().sort().map((i) => values.indexOf(i));
      this.expensesGroupByName = indexOrder.map(
        (i) => expensesGroupByName[names[i]]
      );

      this.expensesGroupByName.sort(
        (a, b) =>
          b.reduce(this.lambdaAmount, 0) - a.reduce(this.lambdaAmount, 0)
      );
    });
  },
  methods: {},
};
</script>

<style>
</style>