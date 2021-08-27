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
        },
      ],
      chartOptions: {
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
        dataLabels: {
          enabled: true,
          color: undefined,
        },
        xaxis: {
          categories: this.dataSort(this.categories),
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
        axisTicks: {
          show: true,
          borderType: "solid",
          color: "#78909C",
          height: 6,
          offsetX: 0,
          offsetY: 0,
        },
        fill: {
          colors: [({ value }) => (value > 0 ? "#2196F3" : "#ff0000")],
          opacity: 0.5,
        },
        grid: {
          borderColor: "#817f7f79",
          strokeDashArray: 7,
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
      },
    };
  },
  created() {
    // console.log("props", this.serie, this.categories)
  },
};
</script>

<style></style>
