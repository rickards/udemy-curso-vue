<template>
  <div>
    <div class="input-new-bill">
      <h2>Explorador de Despesas</h2>
      <new-bill @billAdded="addExpense" />
      <p v-if="invalidInput" style="color: red">{{ invalidInput }}</p>
    </div>
    <div>
      <line-chart :series="serie" v-if="lineChartShow" />
      <StockGrid
        :stockCards="assetsBills"
        @deleted="rmStockExpense"
        @stockClicked="clicked"
      />
    </div>
  </div>
</template>

<script>
import database from "@/helpers/db-interface";
import Translations from "@/helpers/translations";
import StockGrid from "../components/StockGrid";
import NewBill from "../components/NewBill";
import LineChart from "../components/LineChart.vue";

export default {
  name: "ExpenseExplore",
  components: {
    StockGrid,
    NewBill,
    LineChart,
  },
  data() {
    return {
      translator: Translations.pp,
      lineChartShow: false,
      stocks: undefined,
      expenses: undefined,
      invalidInput: undefined,
      assetsBills: [],
      serieName: "Despesas",
      serieRegex: ".*?",
    };
  },
  created() {
    this.updateStocks();
  },
  computed: {
    serie() {
      const re = new RegExp(`${this.serieRegex}`);
      if (this.expenses) {
        console.log(this.filter(this.expenses, (i) => re.test(i.name)), 'haha')
        const groupByDate = this.groupBy(
          this.filter(this.expenses, (i) => re.test(i.name)),
          (i) => i.date.slice(0, 7)
        );
        const expensesSerie = [];
        Object.keys(groupByDate)
          .sort()
          .reduce((sum, i) => {
            const expenses = groupByDate[i].reduce(
              (amount, j) => amount + j.value,
              0
            );
            expensesSerie.push([
              new Date(i).getTime(),
              Math.round((sum += expenses), 2),
            ]);
            return sum
          }, 0);
        console.log(expensesSerie)
        return [
          {
            name: this.serieName,
            data: expensesSerie,
          },
        ];
      }
      return [];
    },
  },
  methods: {
    updateStocks() {
      this.assetsBills = [];
      this.invalidInput = undefined;
      database.getExpensesDatabase().then((resp) => {
        this.expenses = this.filter(resp, (i) => i.type === "Despesa");
      });
      database.getExpenseStocksDatabase().then((resp) => {
        this.stocks = resp;
        this.stocks.forEach((element) => {
          this.createAssetBill(element);
        });
      });
    },
    groupBy(array, keys) {
      return array.reduce(function (rv, i) {
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
    createAssetBill(element) {
      const splited = element.regex.split("=");
      const regex = splited[1] ? splited.slice(1).join("") : splited[0];
      const valueCurrentMonth = this.getValueExpensesCurrentMonth(regex);
      const valueLastMonth = this.getValueExpensesLastMonth(regex);

      const bill = {
        id: element.regex,
        name: splited[0],
        value: valueCurrentMonth,
        percent: valueCurrentMonth / valueLastMonth - 1 || 0,
      };

      this.assetsBills.push(bill);
    },
    getValueExpensesLastMonth(regex) {
      const re = new RegExp(`${regex}`);
      let today = new Date();
      today.setMonth(today.getMonth() - 1);
      const stringToday = today.toISOString();
      const expensesSelected = this.filter(
        this.expenses,
        (i) =>
          re.test(i.name) && this.dateBetweenStartOfMonth(i.date, stringToday)
      );
      return expensesSelected.reduce((sum, i) => sum + i.value, 0);
    },
    getValueExpensesCurrentMonth(regex) {
      const re = new RegExp(`${regex}`);
      const today = new Date().toISOString();
      const expensesSelected = this.filter(
        this.expenses,
        (i) => re.test(i.name) && this.dateBetweenStartOfMonth(i.date, today)
      );
      return expensesSelected.reduce((sum, i) => sum + i.value, 0);
    },
    dateBetweenStartOfMonth(dateToEvaluate, deadline) {
      const after = new Date(deadline);
      let before = new Date(deadline);
      before.setDate(0);
      before.setHours(0, 0, 0, 0);
      const midDate = new Date(dateToEvaluate);
      if (before <= midDate && midDate <= after) return true;
      else return false;
    },
    addExpense(el) {
      if (this.inputRegexValidateData(el)) {
        database.addExpenseStockDatabase(el).then(() => {
          this.updateStocks();
        });
      } else {
        this.invalidInput = "Regex inválida:\n" + el.regex;
      }
    },
    inputRegexValidateData(el) {
      const re = el.regex;
      const regex = re.includes("=") ? re.split("=").slice(1).join("") : re;
      try {
        new RegExp(`${regex}`);
        return true;
      } catch {
        return false;
      }
    },
    rmStockExpense(el) {
      database.rmExpenseStockDatabase({ regex: el.id }).then(() => {
        this.updateStocks();
      });
    },
    clicked(el) {
      console.log(el)
      this.serieName = el.name;
      this.serieRegex = el.id.split("=")[1] || el.id.split("=")[0];
    },
  },
};
</script>

<style>
.input-new-bill {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 0.5%;
}
</style>
