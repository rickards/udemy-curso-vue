<template>
  <div>
    <Post>
      <h1>{{ translator.title["PT"] }}</h1>
    </Post>
    <br>
    <br>
    <Post>
      <line-chart :series="getSeries" />
    </Post>
    <Post>
      <div class="grid-column">
        <div class="column">
          <h3>Ativos</h3>
          <Line label="Caixa" :value="totalCash" />
          <Line label="Bens" :value="totalPhysicalGoods" />
          <Line label="Investimentos" :value="totalInvestiments" />
        </div>
        <div class="column">
          <h3>Passivos</h3>
          <Line label="Despesas" :value="totalExpenses" />
          <Line label="Depreciação" :value="0" />
          <Line label="Patrimônio Líquido" :value="totalPL" />
        </div>
      </div>
    </Post>
  </div>
</template>

<script>
import database from "@/helpers/db-interface";
import Translations from "@/helpers/translations";
import LineChart from "../components/LineChart.vue";
import Line from "../components/Line.vue";
import Post from "../components/Post.vue";

export default {
  name: "PP",
  components: {
    LineChart,
    Line,
    Post,
  },
  data() {
    return {
      translator: Translations.pp,
      expenses: [],
      physicalGoods: [],
      investiments: [],
      revenue: [],
      series: {
        pls: [],
        expenses: [],
        cash: [],
        revenues: [],
      },
      price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    };
  },
  created() {
    database.getExpensesDatabase().then((listResult) => {
      this.expenses = this.filter(listResult, (i) => i.type === "Despesa");
      this.physicalGoods = this.filter(
        listResult,
        (i) => i.type === "Bem_gasto" || i.type === "Bem_ganho"
      );
      this.investiments = this.filter(listResult, (i) => {
        return i.type === "Investimento";
      });
      this.revenue = this.filter(listResult, (i) => i.type === "Receita");
  
      const groupByDate = this.groupBy(listResult, (i) => i.date.slice(0, 7));
      this.createSeries(groupByDate);
    })
  },
  computed: {
    getSeries() {
      return [
        {
          name: "PL",
          data: this.series.pls,
        },
        {
          name: "Despesas",
          data: this.series.expenses,
          show: false,
        },
        {
          name: "Caixa",
          data: this.series.cash,
          show: false,
        },
        {
          name: "Receitas",
          data: this.series.revenues,
          show: false,
        },
      ];
    },
    totalExpenses() {
      return this.expenses.reduce((sum, i) => sum + i.value, 0);
    },
    totalCash() {
      return (
        this.totalRevenue -
        this.totalExpenses -
        this.totalInvestiments -
        this.physicalGoods.reduce(
          (sum, i) => (i.type == "Bem_gasto" ? sum + i.value : 0),
          0
        )
      );
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
    totalPL() {
      return (
        this.physicalGoods.reduce(
          (sum, i) => (i.type == "Bem_ganho" ? sum + i.value : 0),
          0
        ) +
        this.totalRevenue -
        this.totalExpenses
      );
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
    groupBy(array, keys) {
      return array.reduce(function(rv, i) {
        (rv[keys(i)] = rv[keys(i)] || []).push(i);
        return rv;
      }, {});
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
    createSeries(groupByDate) {
      const weightsPl = {
        Bem_gasto: 0,
        Bem_ganho: 1,
        Receita: 1,
        Investimento: 0,
        Despesa: -1,
      };
      const weightsCash = {
        Bem_gasto: -1,
        Bem_ganho: 0,
        Receita: 1,
        Investimento: -1,
        Despesa: -1,
      };
      const weightsExpenses = {
        Bem_gasto: 0,
        Bem_ganho: 0,
        Receita: 0,
        Investimento: 0,
        Despesa: 1,
      };
      const weightsRevenues = {
        Bem_gasto: 0,
        Bem_ganho: 0,
        Receita: 1,
        Investimento: 0,
        Despesa: 0,
      };

      Object.keys(groupByDate)
        .sort()
        .reduce(
          (sum, i) => {
            const pl = groupByDate[i].reduce(
              (amount, j) => amount + j.value * weightsPl[j.type],
              0
            );
            const cash = groupByDate[i].reduce(
              (amount, j) => amount + j.value * weightsCash[j.type],
              0
            );
            const expenses = groupByDate[i].reduce(
              (amount, j) => amount + j.value * weightsExpenses[j.type],
              0
            );
            const revenues = groupByDate[i].reduce(
              (amount, j) => amount + j.value * weightsRevenues[j.type],
              0
            );
            this.series.pls.push([
              new Date(i).getTime(),
              Math.round((sum["pls"] += pl), 2),
            ]);
            this.series.cash.push([
              new Date(i).getTime(),
              Math.round((sum["cash"] += cash), 2),
            ]);
            this.series.expenses.push([
              new Date(i).getTime(),
              Math.round((sum["expenses"] += expenses), 2),
            ]);
            this.series.revenues.push([
              new Date(i).getTime(),
              Math.round((sum["revenues"] += revenues), 2),
            ]);
            return sum;
          },
          { pls: 0, cash: 0, expenses: 0, revenues: 0 }
        );
    },
  },
};
</script>

<style>
.grid-column {
  display: grid;
  padding: 2%;
  width: 98%;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.column {
  margin: 0% 2% 2% 2%;
}

.modal {
  /* border-style: solid; */
  border-color: rgb(185, 181, 181);
  margin: 0.5%;
  padding: 0.5%;
  width: 48%;
  /* min-width: 250px; */
}

.active {
  background-color: #315740bb!important;
  box-shadow: 0px 0px 8px 8px #315740bb!important;
}
</style>
