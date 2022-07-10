<template>
  <div id="chart">
    <div id="chart-timeline">
      <apexchart
        type="donut"
        height="500"
        ref="chart"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
// https://apexcharts.com/docs/chart-types/
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "LineChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    series: { type: Array, required: true },
    labels: { type: Array, required: false },
  },
  data() {
    return {
      chartOptions: {
        labels: this.labels,
        chart: {
          id: "donut-chart",
          type: "donut",
          height: 1550,
          background: "#202020",
        },
        legend: {
          position: "bottom",
          labels: {
            colors: "fff",
          },
          show: true,
        },
        fill: {
          type: "gradient",
          gradient: {
            opacityFrom: 0.6,
            opacityTo: 0.7,
          },
        },
      },
    };
  },
  created() {},
  methods: {},
};
</script>

<style>
#chart-timeline {
  margin-top: 5%;
  margin-bottom: 2%;
}

.chart-button {
  outline: none;
  border: 3px solid rgba(3, 3, 3, 0.144);
  border-radius: 10%;
  background-color: #2195f3bb;
  color: rgb(236, 226, 226);
  font-size: 1rem;
  margin-bottom: 5px;
  margin: 0.2%;
}

.toolbar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.active {
  background-color: #21f372bb;
  box-shadow: 0px 0px 8px 8px rgba(36, 211, 103, 0.658);
}
</style>
