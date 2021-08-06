<template>
  <div>
    <h1>Meus Índices</h1>
    <div v-for="cat in Object.keys(mappingAssets)" :key="cat">
      <h5>{{cat}}</h5>
      <BarChart
        :serie="mappingAssets[cat].assets.map((quote)=>getDictQuoteGrowth[cat][quote])"
        :categories="mappingAssets[cat].assets"
        :key="update"
      ></BarChart>
    </div>
    <NewBill @billAdded="addQuote"></NewBill>
  </div>
</template>

<script>
import { HTTP } from "../plugins/axios";
import BarChart from "../components/HorizontalBarChart.vue";
import NewBill from "../components/NewBill";

export default {
  components: {
    BarChart,
    NewBill,
  },
  data(){
    return {
      startDate: new Date(),
      mappingAssets : {
        'Bancos': {
          'assets': ["ITUB4.SA", "BBSE3.SA", "ABCB4.SA", "WIZS3.SA", "BPAC11.SA", "B3SA3.SA", "BRAP4.SA", "SANB3.SA", "BPAN4.SA", "BBAS3.SA"],
        },
        'FIIs': {
          'assets': ["RBRP11.SA", "HGRU11.SA", "HSML11.SA", "MALL11.SA", "VILG11.SA", "IRDM11.SA", "VRTA11.SA", "VISC11.SA", "RBRR11.SA", "XPLG11.SA", "XPML11.SA", "ALZR11.SA", "HGCR11.SA", "HGLG11.SA", "FIIB11.SA"],
        },
        'Industrial': {
          'assets': ["UNIP6.SA", "LEVE3.SA", "TUPY3.SA", "GRND3.SA", "MYPK3.SA", "CSAN3.SA", "SUZB3.SA", "KLBN11.SA", "BRKM5.SA", "VALE3.SA"],
        },
        'BDRs': {
          'assets': ["ITLC34.SA", "TSLA34.SA", "NVDC34.SA", "GOGL34.SA"],
        },
        'ETFs': {
          'assets': ["GOLD11.SA", "XINA11.SA", "EURP11.SA", "IVVB11.SA", "ACWI11.SA"],
        }
      },
      hist: undefined,
      quotes: undefined,
      update: true
    }
  },
  created() {
    this.startDate.setDate(this.startDate.getDate() - 730);
  },
  mounted() {
    (async () => {
      const codes = Object.keys(this.mappingAssets).reduce(
        (list, key) => {
          list.push(...this.mappingAssets[key].assets)
          return list
        }, []
      )
      const query = codes.join(['%2C'])

      this.hist = (await HTTP.get("/historical?query=" + query)).data.response
      this.quotes = (await HTTP.get("/quotes?query=" + query)).data.response

      this.update = !this.update
    })();
  },
  computed: {
    getDictQuoteGrowth(){
      if (!this.hist || !this.quotes){
        return Object.keys(this.mappingAssets).reduce((dic, i) => {
          dic[i] = this.mappingAssets[i].assets.reduce((sum, quote) => {
            sum[quote]=0;
            return sum;
          }, {});
          return dic;
        }, {});
      }
      const growths = {}
      for (let key of Object.keys(this.mappingAssets)) {
        const codes = this.mappingAssets[key].assets
        //TODO: resolver linha abaixo
        const indexHomoDay = this.hist.date.indexOf(this.startDate) == -1 ? 0 : this.hist.date.indexOf(this.startDate)
        const { weights, amountPart } = this.getQuotesWeight(codes.map((cod) => this.hist[cod][indexHomoDay]))

        const prices = this.quotes.map((x) => x.regularMarketPrice)
        // const percents = quotes.map((x) => x.regularMarketChangePercent)

        const growth = codes.reduce((d, quote) => {
          d[quote] = (((weights[codes.indexOf(quote)] * prices[codes.indexOf(quote)]) / amountPart) * 100) - 100
          return d
        }, {})
        growths[key] = growth
      }
      return growths
    }
  },
  methods:{
      addQuote(el){
        console.log(el)
      },
      getQuotesWeight(quotesPrice) {    
        const amountPart = 100 / quotesPrice.length
        const weights = []
        for (let price of quotesPrice) {
            const weight = (price == 0) ? 0 : amountPart / price
            weights.push(weight)
        }
        return { weights, amountPart }
    }
  }
};
</script>

<style></style>
