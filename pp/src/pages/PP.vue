<template>
  <div>
    <h1>{{ translator.title["EN"] }}</h1>
    <line-chart />
    <p>Bens: {{ price.format(totalPhysicalGoods) }}</p>
    <p>Despesas: {{ price.format(totalExpenses) }}</p>
    <p>Receitas: {{ price.format(totalRevenue) }}</p>
    <p>Investimentos: {{ price.format(totalInvestiments) }}</p>
  </div>
</template>

<script>
import db from "@/helpers/db";
import Translations from "@/helpers/translations";
import LineChart from "../components/LineChart.vue";

export default {
  name: "PP",
  components: {
    LineChart,
  },
  data() {
    return {
      translator: Translations.pp,
      expenses: undefined,
      physicalGoods: undefined,
      investiments: undefined,
      revenue: undefined,
      price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    };
  },
  created() {
    let listResult = db.runAndroidMethod("getExpenses");
    this.expenses = this.filter(listResult, (i) => i.type === "Despesa");
    this.physicalGoods = this.filter(
      listResult,
      (i) => i.type === "Bem_gasto" || i.type === "Bem_ganho"
    );
    this.investiments = this.filter(
      listResult,
      (i) => i.type === "Investimento"
    );
    this.revenue = this.filter(listResult, (i) => i.type === "Receita");
  },
  computed: {
    totalExpenses() {
      return this.expenses.reduce((sum, i) => sum + i.value, 0);
    },
    totalPhysicalGoods() {
      return this.physicalGoods.reduce((sum, i) => sum + i.value, 0);
    },
    totalRevenue() {
      return this.revenue.reduce((sum, i) => sum + i.value, 0);
    },
    totalInvestiments() {
      return this.investiments.reduce((sum, i) => sum + i.value, 0);
    },
  },
  methods: {
    splitForLabels(array) {
      var types = new Map();

      var len = array.length,
        i;
      for (i = 0; i < len; i++) {
        var item = array[i];
        item.value = item.value / 100;
        var type = item.type;
        if (types.has(type)) {
          types.get(type).push(item);
        } else {
          types.set(type, [item]);
        }
      }
      return types;
    },
    filter(array, lambda) {
      let result = [];
      for (let i = 0; i < array.length; i++) {
        let item = array[i];
        if (lambda(item)) {
          result.push(item);
        }
      }
      return result;
    },
    getExpensesCurrentMonth() {
      const today = new Date();
      const month = today.toISOString().slice(0, 7);
      const expensesSelected = this.filter(this.expenses, (i) =>
        i.date.includes(month)
      );
      return expensesSelected;
    },
  },
};
</script>

<style>
.grid {
  display: flex;
}

.modal {
  /* border-style: solid; */
  border-color: rgb(185, 181, 181);
  margin: 0.5%;
  padding: 0.5%;
  width: 48%;
  /* min-width: 250px; */
}
</style>