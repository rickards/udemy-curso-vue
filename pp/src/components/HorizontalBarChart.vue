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
import { commomChartOptions } from "../config/apexchart";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    serie: { type: Array, required: true },
    categories: { type: Array, required: true },
  },
  methods: {
    dataSort(array) {
      let sortedIndex = this.serie
        .slice(0)
        .sort((a, b) => b - a)
        .map((el) => this.serie.indexOf(el));
      // console.log("index", sortedIndex)
      return sortedIndex.map((i) => array[i]);
    },
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
        ...commomChartOptions,
        chart: {
          animations: {
            enabled: false,
          },
          type: "bar",
          height: 50,
          background: "#101010",
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
      },
    };
  },
  created() {
    this.chartOptions.fill.colors = [({ value }) => (value > 0 ? "#2196F3" : "#ff0000")];
    this.chartOptions.fill.gradient.shade = 'light';
    this.chartOptions.xaxis.categories = this.dataSort(this.categories);
  },
};
</script>

<style></style>
