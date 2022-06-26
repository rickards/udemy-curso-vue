<template>
  <div id="chart">
    <div class="toolbar">
      <div>
        <button
          v-for="item in buttons"
          :key="item"
          :id="item"
          @click="selectionInterval = item"
          :class="{ active: selectionInterval === item, 'chart-button': true }"
        >
          {{ item }}
        </button>
      </div>

      <div>
        <button
          @click="preprocessor = amountData"
          :class="{
            active: preprocessor === amountData,
            'chart-button': true,
          }"
        >
          ACUMULADO
        </button>
        <button
          @click="preprocessor = variableData"
          :class="{
            active: preprocessor === variableData,
            'chart-button': true,
          }"
        >
          VARIAÇÃO
        </button>
      </div>
    </div>

    <div id="chart-timeline">
      <apexchart
        type="area"
        height="350"
        ref="chart"
        :options="chartOptions"
        :series="preprocessor(series)"
      ></apexchart>
    </div>
  </div>
</template>

<script>
// https://apexcharts.com/docs/chart-types/area-chart/
import VueApexCharts from "vue3-apexcharts";
import { commomChartOptions } from "../config/apexchart";

export default {
  name: "LineChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    series: { type: Array, required: true },
  },
  watch: {
    series: {
      deep: true,
      handler() {
        this.updateGraphycsChart();
      },
    },
    preprocessor(){
      this.updateGraphycsChart();
    },
    selectionInterval(){
      this.updateGraphycsChart();
    }
  },
  data() {
    return {
      selectionInterval: "ALL",
      preprocessor: this.amountData, 
      buttons: ["1M", "6M", "1Y", "YTD", "ALL"],
      chartOptions: {
        ...commomChartOptions,
        chart: {
          id: "area-datetime",
          type: "area",
          height: 1550,
          background: "#101010",
          zoom: {
            autoScaleYaxis: false,
          },
        },
        tooltip: {
          x: {
            format: "MMM yyyy",
          },
        },
        stroke: {
          width: 3,
          curve: "smooth",
        },
      },
    };
  },
  created() {
    this.chartOptions.dataLabels.enabled = false;
    this.chartOptions.xaxis.type = "datetime";
    this.chartOptions.fill.colors = undefined;
    this.chartOptions.colors = ['blue', 'red', 'green', 'yellow', 'purple'];
    this.chartOptions.legend.markers.onClick = (chart, seriesIndex) => this.$refs.chart.series[seriesIndex].show = !this.$refs.chart.series[seriesIndex].show;
  },
  methods: {
    updateGraphycsChart: function () {
      // https://qastack.com.br/programming/47634258/what-is-nexttick-or-what-does-it-do-in-vuejs
      this.$nextTick(() => {
        this.updateToggleSeries()
        this.updateData(this.selectionInterval)
      });
    },
    updateToggleSeries: function () {
      for (const serie of this.$refs.chart.series) {
        serie.show = serie.show === false
          ? this.$refs.chart.hideSeries(serie.name) || false
          : this.$refs.chart.showSeries(serie.name) || true;
      }
    },
    updateData: function (timeline) {
      console.log("updateData", timeline);
      this.selectionInterval = timeline;

      const endPoint = new Date();
      let startingPoint = new Date(endPoint);

      switch (timeline) {
        case "1M":
          startingPoint.setMonth(startingPoint.getMonth() - 1);
          this.$refs.chart.zoomX(startingPoint.getTime(), endPoint.getTime());
          break;
        case "6M":
          startingPoint.setMonth(startingPoint.getMonth() - 6);
          this.$refs.chart.zoomX(startingPoint.getTime(), endPoint.getTime());
          break;
        case "1Y":
          startingPoint.setMonth(startingPoint.getMonth() - 12);
          this.$refs.chart.zoomX(startingPoint.getTime(), endPoint.getTime());
          break;
        case "YTD":
          this.$refs.chart.zoomX(
            new Date("01 Jan 2013").setYear(endPoint.getFullYear()),
            endPoint.getTime()
          );
          break;
        case "ALL":
          this.$refs.chart.zoomX();
          break;
        default:
      }
    },
    amountData: function (series) {
      return series;
    },
    variableData: function (series) {
      const dataComputed = [];
      for (const serie of series) {
        dataComputed.push({
          ...serie,
          data: this.variance(serie.data),
        });
      }
      return dataComputed
    },
    variance(array) {
      const varianceArray = [];
      for (let i = 0; i < array.length; i++) {
        varianceArray.push([
          array[i][0],
          array[i - 1] ? array[i][1] - array[i - 1][1] : 0,
        ]);
      }
      return varianceArray;
    },
  },
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
