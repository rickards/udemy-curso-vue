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
          // data: this.serie,
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
          enabled: true,
        },
        xaxis: {
          categories: this.dataSort(this.categories),
        },
        fill: {
          colors: [({value}) => value > 0 ? "#228B22" : "#ff0000"],
          opacity: 0.5,
        },
      },
    };
  },
  created(){
    // console.log("props", this.serie, this.categories)
  }
};
</script>

<style></style>
