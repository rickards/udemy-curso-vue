<template>
  <div>
    <h1>Investimentos</h1>
    <line-chart :series="getSeries" />
  </div>
</template>

<script>
import { HTTP } from "../plugins/axios";
import database from "@/helpers/interfaceAndroid";
import LineChart from "../components/LineChart.vue";

export default {
  components: {
    LineChart,
  },
  data() {
    return {
      investiments: undefined,
      series: {
        applied: [],
        variance: [],
        plusProvents: [],
      },
    };
  },
  created() {
    this.investiments = this.filter(
      database.getExpensesDatabase(),
      (i) => i.type === "Investimento"
    );

    this.createSeries();
  },
  computed: {
    getSeries() {
      return [
        {
          name: "Montante",
          data: this.series.applied,
        },
        {
          name: "Valorização",
          data: this.series.variance,
        },
        {
          name: "Proventos",
          data: this.series.plusProvents,
        },
        // {
        //   name: "+ Proventos",
        //   data: this.series.plusProvents.map((item, index) => [
        //     item[0],
        //     item[1] + this.series.variance[index]
        //       ? this.series.variance[index][1]
        //       : 0,
        //   ]),
        // },
      ];
    },
  },
  methods: {
    filter(array, lambda) {
      let result = [];
      for (let i = 0; i < array.length; i++) {
        let item = array[i];
        if (lambda(item)) {
          result.push(item);
        }
      }
      return result;
    },
    groupBy(array, keys) {
      return array.reduce(function(rv, i) {
        (rv[keys(i)] = rv[keys(i)] || []).push(i);
        return rv;
      }, {});
    },
    createSeries() {
      const investimentsGroupByDate = this.groupBy(
        this.investiments,
        (i) => i.date
      );

      const startDate = Object.keys(investimentsGroupByDate).sort();
      const appliedDates = this.getDaysFrom(startDate[0]);

      appliedDates.reduce((sum, date) => {
        const applied = investimentsGroupByDate[date]
          ? investimentsGroupByDate[date].reduce(
              (amount, j) => amount + j.value,
              0
            )
          : 0;
        this.series.applied.push([
          new Date(date).getTime(),
          Math.round((sum += applied), 2),
        ]);
        return sum;
      }, 0);

      const query = this.investiments
        .map((el) => el.name + ".SA")
        .join(["%2C"]);

      HTTP.get("/historical?query=" + query).then((resp) => {
        const response = resp.data.response;

        const dateSerie = response.date.slice(
          response.date.indexOf(appliedDates[0])
        );

        dateSerie.forEach((date) => {
          const quotes = Object.keys(response).slice(0, -1);
          const intraDay = quotes.reduce((sum, quote) => {
            const index = response.date.indexOf(date);

            const weigth = this.getQtdeQuotes(quote, date);
            return sum + response[quote][index] * weigth;
          }, 0);

          this.series.variance.push([
            new Date(date).getTime(),
            Math.round(intraDay, 2),
          ]);
        });
      });

      HTTP.get("/dividends?query=" + query).then((resp) => {
        const response = resp.data.response;
        const quotes = Object.keys(response);

        const startDate = this.investiments.map((i) => i.date).sort()[0];
        const appliedDates = this.getDaysFrom(startDate);

        const dividendsSerie = {};
        for (let date of appliedDates) {
          dividendsSerie[date] = 0;
        }

        quotes.forEach((quote) => {
          const date = response[quote].date;
          const dividends = response[quote].dividends;
          for (let i = 0; i < date.length; i++) {
            const key = date[i];
            if (Object.keys(dividendsSerie).indexOf(key) != -1) {
              const weigth = this.getQtdeQuotes(quote, date[i]);
              dividendsSerie[key] += dividends[i] * weigth;
            }
          }
        });

        Object.keys(dividendsSerie).reduce((sum, key) => {
          this.series.plusProvents.push([
            new Date(key).getTime(),
            Math.round(sum, 2),
          ]);
          return (sum += dividendsSerie[key]);
        }, 0);
      });
    },
    getDaysFrom(startDate) {
      const firstDay = new Date(startDate);
      const today = new Date();

      const days = [];
      for (let i = firstDay; i <= today; i.setDate(i.getDate() + 1)) {
        days.push(i.toISOString().slice(0, 10));
      }

      return days;
    },
    getQtdeQuotes(quote, date) {
      const weigth = this.investiments.reduce((qtdeQuotes, inv) => {
        if (new Date(inv.date) <= new Date(date) && inv.name + ".SA" === quote)
          qtdeQuotes += inv.qtde;
        return qtdeQuotes;
      }, 0);
      return weigth;
    },
  },
};
</script>
