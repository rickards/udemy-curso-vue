<template>
  <div id="chart">
    <div class="toolbar">
      <button 
        v-for="item in buttons" 
        :key="item"
        :id="item"
        @click="updateData(item)"
        :class="{ active: selection === item, 'chart-button': true }"
      >
        {{item}}
      </button>
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
  mounted() {
    // https://qastack.com.br/programming/47634258/what-is-nexttick-or-what-does-it-do-in-vuejs
    this.$nextTick(()=>{
      this.hideSeries()
    });
  },
  data() {
    return {
      buttons: ['1M', '6M', '1Y', 'YTD', 'ALL'],
      chartOptions: {
        chart: {
          id: "area-datetime",
          type: "area",
          height: 350,
          zoom: {
            autoScaleYaxis: false,
          },
        },
        stroke: {
          width: 3,
          curve: 'smooth',
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
              console.log("series- " + seriesIndex + "'s marker was clicked", chart, opts)
            }
          },
        },
      },

      selection: "1Y",
    };
  },
  methods: {
    updateData: function(timeline) {
      this.selection = timeline;

      const endPoint = new Date();
      let startingPoint = new Date(endPoint);

      switch (timeline) {
        case "1M":
          startingPoint.setMonth(startingPoint.getMonth() - 1);
          this.$refs.chart.zoomX(
            startingPoint.getTime(),
            endPoint.getTime()
          );
          break;
        case "6M":
          startingPoint.setMonth(startingPoint.getMonth() - 6);
          this.$refs.chart.zoomX(
            startingPoint.getTime(),
            endPoint.getTime()
          );
          break;
        case "1Y":
          startingPoint.setMonth(startingPoint.getMonth() - 12);
          this.$refs.chart.zoomX(
            startingPoint.getTime(),
            endPoint.getTime()
          );
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
    hideSeries: function() {
      for (const serie of this.series){
        serie.show == false ? this.$refs.chart.hideSeries(serie.name) : console.log(serie.name)
      }
    },
  },
};
</script>

<style>
.chart-button {
  outline: none;
  border: 1px solid rgb(3, 3, 3);
  background-color: #2195f3bb;
  font-size: 1rem;
}
</style>
