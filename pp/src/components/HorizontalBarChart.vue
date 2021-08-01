<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="450"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    serie: { type: Array, required: true },
    categories: { type: Array, required: true }
  },
  methods: {
      dataSort(array){
          let sortedIndex = this.serie.slice(0).sort((a, b) => b - a).map((el) => this.serie.indexOf(el))
          return sortedIndex.map((i) => array[i])
      }
  },
  data() {
    return {
      series: [
        {
          //apexcharts
          data: this.dataSort(this.serie),
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          height: 50,
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        xaxis: {
          categories: this.dataSort(this.categories),
        },
        fill: {
          // colors: this.dataSort(this.categories).map((i) => i>0 ? '#97fb91': '#ff0000' ),
          colors: ['#000', '#FFF', '#9C27B0']
        },
      },
    };
  },
};
</script>

<style></style>
