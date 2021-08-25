<template>
  <div>
    <h1>Meus Índices</h1>
    <div class="toolbar">
      <div v-for="cat in Object.keys(mappingAssets)" :key="cat">
        <button class="chart-button">{{cat}}</button>
      </div>
    </div>
    <div v-for="cat in Object.keys(mappingAssets)" :key="cat">
      <h5>{{cat}}</h5>
      <BarChart
        v-if="getDictQuoteGrowth"
        :serie="mappingAssets[cat].assets.map((quote)=>getDictQuoteGrowth[cat][quote])"
        :categories="mappingAssets[cat].assets"
        :key="getDictQuoteGrowth[cat]"
      ></BarChart>
      <div v-if="hist" class="slidecontainer">
        <input type="range" :min="sliderInterval[cat][0]" :max="sliderInterval[cat][1]" class="slider" id="myRange" v-model="sliderValues[cat]">
        <h5>{{hist.date[sliderValues[cat]]}}</h5>
      </div>
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
          'assets': ["GOLD11.SA", "XINA11.SA", "IVVB11.SA", "ACWI11.SA"], //"EURP11.SA" retirado por erro
        }
      },
      hist: undefined,
      marketData: undefined,
      quotes: undefined,
      sliderValues: {},
      sliderInterval: {}
    }
  },
  watch: {
    // sliderValues(n){
    //   console.log(n)
    // }
  },
  created() {
    this.startDate.setDate(this.startDate.getDate() - 365*4); //4 anos
    Object.keys(this.mappingAssets).map((index) => {
      this.sliderValues[index] = 0
      this.sliderInterval[index] = [0, 100]
    })
  },
  mounted() {
    (async () => {
      const codes = []
      Object.keys(this.mappingAssets).forEach((i) => codes.push(...this.mappingAssets[i].assets))

      const query = codes.join(['%2C'])

      this.hist = (await HTTP.get("/historical?query=" + query)).data.response
      // this.marketData = (await HTTP.get("/quotes?query=" + query)).data.response

      // this.quotes = this.marketData.reduce((dict, qt) => dict.set(qt.symbol, qt.regularMarketPrice), new Map())

      this.quotes = codes.reduce((dict, code) => dict.set(code, this.hist[code].slice(-1).pop()), new Map())

      this.getSliderInterval()
    })();
  },
  computed: {
    getDictQuoteGrowth(){
      if (!this.hist) return undefined

      const growths = {}

      for (let key of Object.keys(this.mappingAssets)) {
        const codes = this.mappingAssets[key].assets
        const indexHomoDay = this.sliderValues[key]

        const growth = codes.reduce((d, cod) => {
          const before = this.hist[cod][indexHomoDay]
          const after = this.quotes.get(cod)
          d[cod] = ((after/before - 1) * 100).toFixed(2)
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
      getSliderInterval(){
        Object.keys(this.mappingAssets).map((index) => {
          const codes = this.mappingAssets[index].assets
          const indexHomoDay = this.getPossibleIndex(codes)

          this.sliderValues[index] = indexHomoDay
          this.sliderInterval[index] = [indexHomoDay, this.hist.date.length-1]
        })
      },
      getPossibleIndex(codes){
        const date = this.hist.date.filter((i) => i > this.startDate.toISOString().slice(0, 10))
                      .sort()
                      .reverse()
                      .pop()
        const indexs = codes.map((code) => this.getValueFromIndex(this.hist.date.indexOf(date), this.hist[code]))
        return Math.max(...indexs)
      },
      getValueFromIndex(index, array){
        while (array[index]===0){
          index += 1
        }
        return index
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

<style>
.slidecontainer {
  width: 100%; /* Width of the outside container */
}

/* The slider itself */
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: #2196F3;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #2196F3;
  cursor: pointer;
}
</style>
