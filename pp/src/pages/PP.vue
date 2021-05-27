<template>
  <div>
      <h1>{{translator.title['EN']}}</h1>
      <line-chart />
      <div class="bill-grid">
        <bills-grid title="Ativo" :bills="assetsBills"/>
        <bills-grid title="Passivo" :bills="liabilitiesBills"/>
      </div>
  </div>
</template>

<script>
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
              name: 'Bens'
            },
            {
              name: 'Caixa'
            }
          ],
          liabilitiesBills: [
            {
              name: 'Despesas'
            },
            {
              name: 'Patrimônio Líquido'
            }
          ]
      }
  }
}
</script>

<style>
  .bill-grid {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
  }
</style>