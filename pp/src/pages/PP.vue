<template>
  <div>
      <h1>{{translator.title['EN']}}</h1>
      <line-chart />
      <div class="grid">
        <bills-grid class="modal" title="Ativos" :bills="assetsBills"/>
        <bills-grid class="modal" title="Passivos" :bills="liabilitiesBills"/>
      </div>
  </div>
</template>

<script>
import db from '@/helpers/db'
import Translations from '@/helpers/translations'
import BillsGrid from '../components/BillsGrid.vue'
import LineChart from '../components/LineChart.vue'

export default {
  name: "PP",
  components: {
    LineChart,
    BillsGrid,
  },
  data() {
      return {
          translator: Translations.pp,
          assetsBills: [
            {
              name: 'Bens',
              value: 3000,
              percent: 8,
            },
            {
              name: 'Caixa',
              value: 500000,
              percent: 10,
            },
          ],
          liabilitiesBills: [
            {
              name: 'Despesas',
              value: 2500,
              percent: -5,
            },
            {
              name: 'Patrimônio Líquido',
              value: 5500,
              percent: 15
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