<template>
  <div>
    <TitleSlideDown title="Explorador de Despesas">
      <div class="pp-input">
        <PPInput @billAdded="addExpense" placeholder="<conta>=<regex>"/>
        <p v-if="invalidInput" style="color: red">{{ invalidInput }}</p>
      </div>
    </TitleSlideDown>
    <div>
      <line-chart :series="serie" v-if="lineChartShow" />
      <StockGrid
        :stockCards="assetsBills"
        @deleted="rmStockExpense"
        @stockClicked="cardClicked"
      />
    </div>
  </div>
</template>

<script>
import database from "@/helpers/db-interface";
import utils from "../plugins/utils";
import Translations from "@/helpers/translations";
import StockGrid from "../components/StockGrid";
import PPInput from "../components/PPInput";
import LineChart from "../components/LineChart.vue";
import TitleSlideDown from "../components/TitleSlideDown.vue";

export default {
  name: "ExpenseExplore",
  components: {
    StockGrid,
    PPInput,
    LineChart,
    TitleSlideDown,
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
  activated(){
    console.log("activated!")
  },
  computed: {
    serie() {
      const re = new RegExp(`${this.serieRegex}`);
      if (this.expenses) {
        const groupByDate = utils.groupBy(
          utils.filter(this.expenses, (i) => re.test(i.name)),
          (i) => i.date.slice(0, 7)
        );

        const dates = Object.keys(groupByDate).sort()
        let initialDate = new Date(dates[0]).getTime()+(3600000*4)
        const currentDate = new Date(dates[dates.length-1]).getTime()+(3600000*4)

        const expensesSerie = [];
        while (initialDate <= currentDate){
          const initialDateString = new Date(initialDate).toISOString().slice(0, 7)
          const value = groupByDate[initialDateString] ? groupByDate[initialDateString].reduce((sum, j) => sum + j.value, 0) : 0
          const amount = expensesSerie.length ? value + expensesSerie[expensesSerie.length-1][1] : value
          expensesSerie.push([
            initialDate,
            Math.round(amount, 2)
          ]);

          const nd = new Date(initialDate)
          initialDate = nd.setMonth(nd.getMonth()+1)
        }

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
        this.expenses = utils.filter(resp, (i) => i.type === "Despesa");
      });
      database.getExpenseStocksDatabase().then((resp) => {
        this.stocks = resp;
        this.stocks.forEach((element) => {
          this.createAssetBill(element);
        });
      });
    },
    createAssetBill(element) {
      const splited = element.regex.split("=");
      const regex = splited[1] ? splited.slice(1).join("") : splited[0];
      const valueCurrentMonth = this.getValueExpensesCurrentMonth(regex);
      const valueLastMonth = this.getValueExpensesLastMonth(regex);

      const bill = {
        id: element.id,
        name: splited[0],
        value: valueCurrentMonth,
        percent: valueCurrentMonth / valueLastMonth - 1 || 0,
        regex: regex
      };

      this.assetsBills.push(bill);
    },
    getValueExpensesLastMonth(regex) {
      const re = new RegExp(`${regex}`);
      let today = new Date();
      today.setMonth(today.getMonth() - 1);
      const stringToday = today.toISOString();
      const expensesSelected = utils.filter(
        this.expenses,
        (i) =>
          re.test(i.name) && this.dateBetweenStartOfMonth(i.date, stringToday)
      );
      return expensesSelected.reduce((sum, i) => sum + i.value, 0);
    },
    getValueExpensesCurrentMonth(regex) {
      const re = new RegExp(`${regex}`);
      const today = new Date().toISOString();
      const expensesSelected = utils.filter(
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
      database.rmExpenseStockDatabase(el).then(() => {
        this.updateStocks();
      });
    },
    cardClicked(el) {
      this.lineChartShow = this.serieName == el.name ? !this.lineChartShow : true
      this.serieName = el.name;
      this.serieRegex = el.regex;
    },
  },
};
</script>

<style>
.pp-input {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 0.5%;
}
</style>
