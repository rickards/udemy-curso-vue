<template>
  <div>
    <TitleSlideDown title="Despesas"></TitleSlideDown>

    <br><br>
    <div v-if="expensesGroupByName.length != 0">
      <donut-chart :series="expensesGroupByName.map(i => i.reduce(lambdaAmount, 0))"
        :labels="expensesGroupByName.map(i => i[0].name)" />
    </div>
    <div v-else>
      <h1>Não há despesas cadastradas para esse mês!</h1>
    </div>

    <br>
    <br>
    <input class="input" type="month" v-model="month" />
    <br>
    <br>
    <br>

    <div class="grid-cards">
      <Line v-for="inv in expensesGroupByName" :key="inv.id" :value="inv.reduce(lambdaAmount, 0)" :label="inv[0].name">
        <Line v-for="i in inv" :key="i.id" :value="i.value" :label="i.name">
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
  beforeUpdate() {
    console.log("beforeUpdate")
  },
  watch: {
    // whenever question changes, this function will run
    month(month) {
      database.getExpensesMonth(month).then((result) => {
        const expenses = utils.filter(result, (i) => i.type === "Despesa");

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
    }
  },
  methods: {},
};
</script>

<style>
</style>