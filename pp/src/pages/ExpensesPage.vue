<template>
  <div>
    <h1>Despesas</h1>
    <div class="grid-cards">
      <Line
        v-for="inv in expensesGroupByName.sort(
          (a, b) => b.reduce(lambdaAmount, 0) - a.reduce(lambdaAmount, 0)
        )"
        :key="inv.id"
        :value="inv.reduce(lambdaAmount, 0)"
        :label="inv[0].name"
      >
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

export default {
  name: "ExpensesPage",
  components: {
    Line,
  },
  data() {
    return {
      expenses: [],
      expensesGroupByName: [],
      lambdaAmount: (sum, i) => i.value + sum,
    };
  },
  created() {
    database.getExpensesDatabase().then((result) => {
      this.expenses = utils.filter(result, (i) => i.type === "Despesa");

      const expensesGroupByName = utils.groupBy(this.expenses, (i) => i.name);

      const names = [];
      const values = Object.keys(expensesGroupByName).map((name) => {
        names.push(name);
        return expensesGroupByName[name].reduce(
          (sum, inv) => sum + inv.value,
          0
        );
      });

      const indexOrder = values.sort().map((i) => values.indexOf(i));
      this.expensesGroupByName = indexOrder.map(
        (i) => expensesGroupByName[names[i]]
      );
      console.log(this.expensesGroupByName);
    });
  },
  methods: {},
};
</script>

<style>
</style>