<template>
  <div id="donutchart">
    <div>
      <apexchart type="donut" height="500" ref="donutchart" :options="chartOptions" :series="series"></apexchart>
    </div>
  </div>
</template>

<script>
// https://apexcharts.com/docs/chart-types/
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "DonutChart",
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
        colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560', '#775DD0', '#2B908F', '#C7F464', '#6212BD', '#151415', '#A5978B'],
        labels: this.labels,
        chart: {
          id: "donut-chart",
          type: "donut",
          height: 1550,
          background: "#00000000",
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
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                total: {
                  show: true,
                  label: 'Total:',
                  color: '#fff',
                  formatter: function (w) {
                    return w.globals.seriesTotals.reduce((a, b) => {
                      return parseFloat(a + b).toFixed(2);
                    }, 0)
                  }
                },
                value: {
                  show: true,
                  fontSize: '40px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 400,
                  color: "#fff",
                  offsetY: 16,
                  formatter: function (val) {
                    return parseFloat(val).toFixed(2);
                  }
                },
              }
            }
          }
        }
      },
    };
  },
  created() {
  },
  methods: {},
};
</script>

<style>
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
</style>
