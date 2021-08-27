<template>
  <div>
    <h1>Meus Índices</h1>
    <div>
      <div>
        <button 
          v-for="category in Object.keys(mappingAssets)" :key="category"
          @click="selectionCategory=category"
          :class="{ active: selectionCategory === category, 'qa-button': true }"
        > 
          {{category}}
        </button>
      </div>
    </div>
    <div>
      <div v-if="!hist" class="c-loader"></div>
      <h4 v-if="hist">{{selectionCategory}} desde {{hist.date[sliderValues[selectionCategory]]}}</h4>
      <BarChart
        v-if="fallbackPercents"
        :serie="fallbackPercents[selectionCategory][hist.date[sliderValues[selectionCategory]]]"
        :categories="fallbackPercents[selectionCategory].assets"
        :key="sliderValues[selectionCategory]"
      ></BarChart>
      <div v-if="hist" class="slidecontainer">
        <input type="range" :min="sliderInterval[selectionCategory][0]" :max="sliderInterval[selectionCategory][1]" class="slider" id="myRange" v-model="sliderValues[selectionCategory]">
      </div>
    </div>
    <NewBill v-show="false" @billAdded="addQuote"></NewBill>
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
      fallbackPercents: undefined,
      sliderValues: {},
      sliderInterval: {},
      selectionCategory: undefined,
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
    this.selectionCategory = Object.keys(this.mappingAssets).pop()
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
      this.fallbackPercents = this.generateDictQuoteGrowth()
    })();
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
      generateDictQuoteGrowth(){
        const growths = {}

        for (let key of Object.keys(this.mappingAssets)) {
          const codes = this.mappingAssets[key].assets

          const growth = {
            "assets": codes
          }

          for (let i = this.sliderValues[key]; i < this.hist.date.length; i++){
            const date = this.hist.date[i]
            growth[date] = codes.map((cod) => {
              const before = this.hist[cod][i]
              const after = this.quotes.get(cod)
              return ((after/before - 1) * 100).toFixed(2)
            })
          }
          growths[key] = growth
        }
        return growths
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
  width: 90%;
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

.c-loader {
  animation: is-rotating 1s infinite;
  width: 150px;
  height: 150px;
  border: 6px solid #e5e5e5;
  border-radius: 50%;
  border-top-color: #51d4db;
  display: inline-block;
  margin: 10%;
}

@keyframes is-rotating {
  to {
    transform: rotate(1turn);
  }
}

.qa-button {
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
  background-color: #315740bb;
}

</style>
