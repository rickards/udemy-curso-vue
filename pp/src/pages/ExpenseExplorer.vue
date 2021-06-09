<template>
  <div>
      <div class="input-new-bill">
        <h1>Explorador de Despesas</h1>
        <new-bill @billAdded="addExpense"/>
      </div>
      <div>
        <line-chart v-if="lineChartShow" />
        <StockGrid :stockCards="assetsBills"/>
      </div>
  </div>
</template>

<script>
import db from '@/helpers/db'
import Translations from '@/helpers/translations'
import StockGrid from '../components/StockGrid'
import NewBill from '../components/NewBill'
import LineChart from '../components/LineChart.vue'

export default {
  name: "ExpenseExplore",
  components: {
    StockGrid,
    NewBill,
    LineChart
  },
  data() {
      return {
          translator: Translations.pp,
          lineChartShow: false,
          stocks: undefined,
          expenses: undefined,
          assetsBills: []
      }
  },
  created(){
    const listResult = db.runAndroidMethod("getExpenses")
    this.expenses = this.filter(listResult, (i) => i.type==='Despesa')
    this.stocks = db.runAndroidMethod("getExpenseStocks")
    this.stocks.forEach(element => {
      this.createAssetBill(element)
    });
  },
  methods: {
    filter(array, lambda){
      let result = []
      for (let i = 0; i < array.length; i++){
        let item = array[i]
        if (lambda(item)){
          item.value = item.value / 100
          result.push(item)
        }
      }
      return result
    },
    createAssetBill(element){
      const splited = element.regex.split("=")
      const regex = splited[1] ? splited.slice(1).join('') : splited[0]
      const valueLastMonth = this.getValueExpensesLastMonth(regex)

      const bill = {
        name: splited[0],
        value: valueLastMonth,
        percent: valueLastMonth / this.getValueExpensesCurrentMonth(regex) || 0
      }

      this.assetsBills.push(bill)
    },
    addExpense(el){
      db.runAndroidMethod("addExpenseStock", JSON.stringify(el))
    },
    getValueExpensesLastMonth(regex){
      const re = new RegExp(`${regex}`);
      let today = new Date();
      today.setMonth(today.getMonth()-1)
      const month = today.toISOString().slice(0, 7)
      const expensesSelected = this.filter(this.expenses, (i) => i.date.includes(month) && re.test(i.name))
      return expensesSelected.reduce((sum, i) => sum + i.value, 0)
    },
    getValueExpensesCurrentMonth(regex){
      const re = new RegExp(`${regex}`);
      const today = new Date();
      const month = today.toISOString().slice(0, 7)
      const expensesSelected = this.filter(this.expenses, (i) => i.date.includes(month) && re.test(i.name))
      console.log("current", expensesSelected, month)
      return expensesSelected.reduce((sum, i) => sum + i.value, 0)
    }
  }
}
</script>

<style>
  .input-new-bill {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 0.5%;
  }
</style>