<template>
  <div id="chart">
    <div class="toolbar">
      <div>
        <button
          v-for="item in buttons"
          :key="item"
          :id="item"
          @click="updateData(item)"
          :class="{ active: selectionInterval === item, 'chart-button': true }"
        >
          {{ item }}
        </button>
      </div>

      <div>
        <button
          @click="selectionSpacing = 'Amount'"
          :class="{
            active: selectionSpacing === 'Amount',
            'chart-button': true,
          }"
        >
          Montante
        </button>
        <button
          @click="selectionSpacing = 'Variable'"
          :class="{
            active: selectionSpacing === 'Variable',
            'chart-button': true,
          }"
        >
          Variação
        </button>
      </div>
    </div>

    <div id="chart-timeline">
      <apexchart
        type="area"
        height="350"
        ref="chart"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
// https://apexcharts.com/docs/chart-types/area-chart/
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "LineChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    series: { type: Array, required: true },
  },
  watch: {
    selectionSpacing(value) {
      if (value==="Variable"){
        this.variableData();
      }
      if (value==="Amount"){
        this.amountData();
      }
    },
    series: {
      deep: true,
      handler() {
        // https://qastack.com.br/programming/47634258/what-is-nexttick-or-what-does-it-do-in-vuejs
        this.$nextTick(() => {
          this.initialHideSeries();
        });
      }
    }
  },
  data() {
    return {
      selectionInterval: "ALL",
      selectionSpacing: "Amount",
      buttons: ["1M", "6M", "1Y", "YTD", "ALL"],
      chartOptions: {
        chart: {
          id: "area-datetime",
          type: "area",
          height: 350,
          zoom: {
            autoScaleYaxis: true,
          },
        },
        stroke: {
          width: 3,
          curve: "smooth",
        },
        // annotations: {
        //   yaxis: [
        //     {
        //       y: 30,
        //       borderColor: "#999",
        //       label: {
        //         show: true,
        //         text: "Support",
        //         style: {
        //           color: "#fff",
        //           background: "#00E396",
        //         },
        //       },
        //     },
        //   ],
        //   xaxis: [
        //     {
        //       x: new Date("14 Nov 2012").getTime(),
        //       borderColor: "#999",
        //       yAxisIndex: 0,
        //       label: {
        //         show: true,
        //         text: "Rally",
        //         style: {
        //           color: "#fff",
        //           background: "#775DD0",
        //         },
        //       },
        //     },
        //   ],
        // },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
        },
        xaxis: {
          type: "datetime",
          // min: new Date("01 Mar 2012").getTime(),
          tickAmount: 6,
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.1,
            opacityTo: 0.7,
            stops: [0, 100],
          },
        },
        legend: {
          show: true,
          markers: {
            onClick: function(chart, seriesIndex, opts) {
              console.log(
                "series- " + seriesIndex + "'s marker was clicked",
                chart,
                opts
              );
            },
          },
        },
      },
    };
  },
  methods: {
    updateData: function(timeline) {
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
    initialHideSeries: function() {
      for (const serie of this.$refs.chart.series) {
        serie.show === false
          ? this.$refs.chart.hideSeries(serie.name)
          : this.$refs.chart.showSeries(serie.name);
      }
    },
    updateSeries: function(data) {
      const shows = this.$refs.chart.series.map(({ name }) => {
        return { name, show: !this.$refs.chart.toggleSeries(name) };
      });
      this.$refs.chart.updateSeries(data);
      for (const { name, show } of shows) {
        show === false
          ? this.$refs.chart.hideSeries(name)
          : this.$refs.chart.showSeries(name);
      }
      this.updateData(this.selectionInterval)
    },
    amountData: function() {
      this.updateSeries(this.series);
    },
    variableData: function() {
      const dataComputed = [];
      for (const serie of this.series) {
        dataComputed.push({
          ...serie,
          data: this.variance(serie.data),
        });
      }
      this.updateSeries(dataComputed);
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
.chart-button {
  outline: none;
  border: 1px solid rgba(3, 3, 3, 0.144);
  background-color: #2195f3bb;
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
}
</style>
