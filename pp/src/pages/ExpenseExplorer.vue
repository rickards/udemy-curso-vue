<template>
  <div>
      <div class="input-new-bill">
        <h1>Explorador de Despesas</h1>
        <new-bill/>
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
          assetsBills: [
            {
              name: 'Bens',
              value: 3000,
              percent: 8,
            },
            {
              name: 'Caixa',
              value: 500000,
              percent: -10,
            },
            {
              name: 'Caixa',
              value: 500000,
              percent: -10,
            },
            {
              name: 'Caixa',
              value: 500000,
              percent: -10,
            },
            {
              name: 'Caixa',
              value: 500000,
              percent: -10,
            },
            {
              name: 'Caixa',
              value: 500000,
              percent: -10,
            }
          ]
      }
  },
  created(){
    let listResult = db.runAndroidMethod("getExpenses")
    console.log(listResult)
  }
}
</script>

<style>
  .input-new-bill {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    padding: 0.5%;
  }
</style>