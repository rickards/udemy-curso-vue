<template>
  <div>
    <h1>Investimentos</h1>
    <line-chart :series="getSeries" />
    <div class="grid-cards">
      <Line
        v-for="inv in investiments"
        :key="inv.id"
        :value="inv.value"
        :label="toStringInvestiment(inv)"
      ></Line>
    </div>
  </div>
</template>

<script>
import { HTTP } from "../plugins/axios";
import database from "@/helpers/db-interface";
import LineChart from "../components/LineChart.vue";
import Line from "../components/Line.vue";

export default {
  components: {
    LineChart,
    Line,
  },
  data() {
    return {
      investiments: [],
      series: {
        applied: [],
        variance: [],
        plusProvents: [],
      },
    };
  },
  created() {
    database.getExpensesDatabase().then((result) => {
      this.investiments = this.filter(result, (i) => i.type === "Investimento");
      this.createSeries();
    });
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
    async createSeries() {
      const investimentsGroupByDate = this.groupBy(
        this.investiments,
        (i) => i.date
      );
      console.log("investimentsGroupByDate", investimentsGroupByDate)

      const aportDates = Object.keys(investimentsGroupByDate).sort();

      // aportDates.concat(today).reduce((sum, date) => {
      //   const applied = investimentsGroupByDate[date]
      //     ? investimentsGroupByDate[date].reduce(
      //         (amount, j) => amount + j.value,
      //         0
      //       )
      //     : 0;

      //   this.series.applied.push([
      //     new Date(date).getTime(),
      //     Math.round((sum += applied), 2),
      //   ]);

      //   return sum;
      // }, 0);
      const datesSelected = []

      const query = this.investiments
        .map((el) => el.name + ".SA")
        .join(["%2C"]);

      const historical = (await HTTP.get("/historical?query=" + query)).data.response
      const quotes = Object.keys(historical).slice(0, -1);

      const dayByDay = historical.date.slice(
        historical.date.indexOf(aportDates[0])
      );

      const datesByMonth = this.groupBy(dayByDay, (date) => date.slice(0, 7))

      // Each month I choice 2 dates (min and max)
      Object.keys(datesByMonth).forEach((key) => {

        const dates = datesByMonth[key]

        let minDate, maxDate;
        let minValue, maxValue;

        dates.forEach((date) => {
          const intraDay = this.getVarianceInDay(date, quotes, historical);

          if (minValue||intraDay >= intraDay) minDate = date;
          if (maxValue||intraDay <= intraDay) maxDate = date;
          
        })

        datesSelected.push(minDate)
        datesSelected.push(maxDate)
      })

      const dividends = (await HTTP.get("/dividends?query=" + query)).data.response
      quotes.forEach((quote) => {
        datesSelected.push(...dividends[quote].date.filter((i) => aportDates[0] < i && i > aportDates[-1]))
      })

      datesSelected.push(...aportDates)
      
      Array.from(new Set(datesSelected)).sort().forEach((date) => {
        this.series.variance.push([
          new Date(date).getTime(),
          Math.round(this.getVarianceInDay(date, quotes, historical) || 0, 2),
        ]);

        this.series.applied.push([
          new Date(date).getTime(),
          Math.round(this.getAportsInDay(date, quotes), 2),
        ]);

        // this.series.plusProvents.push([
        //   new Date(date).getTime(),
        //   Math.round(getAmountDividendsInDay(date, quotes, dividends), 2)
        // ]);

      })









      // HTTP.get("/dividends?query=" + query).then((resp) => {
      //   const response = resp.data.response;
      //   const appliedDates = this.getDaysFrom(aportDates[0]);




      //   const dividendsSerie = {};
      //   for (let date of appliedDates) {
      //     dividendsSerie[date] = 0;
      //   }

      //   quotes.forEach((quote) => {
      //     const date = response[quote].date;
      //     const dividends = response[quote].dividends;
      //     for (let i = 0; i < date.length; i++) {
      //       const key = date[i];
      //       if (Object.keys(dividendsSerie).indexOf(key) != -1) {
      //         const weigth = this.getQtdeQuotes(quote, date[i]);
      //         dividendsSerie[key] += dividends[i] * weigth;
      //       }
      //     }
      //   });

      //   Object.keys(dividendsSerie).reduce((sum, key) => {
      //     this.series.plusProvents.push([
      //       new Date(key).getTime(),
      //       Math.round(sum, 2),
      //     ]);
      //     return (sum += dividendsSerie[key]);
      //   }, 0);
      // });
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
    // getAmountDividendsInDay(date, quotes, dividends){
    //   const filtered = this.investiments.filter((inv) => inv.date<=date && quotes.indexOf(inv.name + ".SA")!==-1);
    //   filtered

    //   quotes.map((quote) => {
    //     const dates = dividends[quote].date
    //     for (let i=0; i < dates.length; i++){
    //       if (dates[i] < date){

    //       }
    //     }
    //   })
    //   return 0;
    // },
    getAportsInDay(date, quotes){
      const filtered = this.investiments.filter((inv) => inv.date<=date && quotes.indexOf(inv.name + ".SA")!==-1)
      return filtered.reduce((acc, i) => acc + i.value, 0);
    },
    getVarianceInDay(date, quotes, response){
      return quotes.reduce((sum, quote) => {
        let index = response.date.indexOf(date);

        const weigth = this.getQtdeQuotes(quote, date);
        return sum + response[quote][index] * weigth;
      }, 0);
    },
    toStringInvestiment(inv) {
      return inv.qtde + " x " + inv.name;
    },
  },
};
</script>

<style>
.grid-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  padding: 0.5%;
  margin: 0.5%;
  width: 98%;
}
</style>
