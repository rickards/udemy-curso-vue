<template>
  <div>
    <TitleSlideDown title="Meus Índices">
      <div class="qa-input">
        <PPInput placeholder="Seu ETF" @billAdded="addETF" style="transform: scale(0.85);" />
        <div class="grid-cards">
          <Line
            v-for="inv in Object.keys(etf2add)"
            :key="inv"
            :label="inv"
          >
            <Line
              v-for="i in etf2add[inv]"
              :key="i"
              :label="i"
              :expansive="false"
            ></Line>
            <PPInput placeholder="Cotas" @billAdded="addQuote($event, inv)" style="transform: scale(0.8);" />
          </Line>
        </div>
        <div style="display: flex-root; margin-right=2%;">
          <button class="qa-button" @click="saveSetup">➲</button>
        </div>
        <!-- <p v-if="invalidInput" style="color: red">{{ invalidInput }}</p> -->
      </div>
    </TitleSlideDown>

    <Loading v-if="!hist" />
    <div v-else>
      <div v-if="selectionCategory" style="margin: 2%;">
        <button 
          v-for="category in Object.keys(mappingAssets)" :key="category"
          @click="selectionCategory=category"
          :class="{ active: selectionCategory === category, 'qa-chart-button': true }"
        > 
          {{category}}
        </button>
      </div>

      <BarChart
        :serie="fallbackPercents"
        :categories="mappingAssets[selectionCategory]"
        :key="updateChart"
      ></BarChart>

      <div class="slidecontainer">
        <input 
          type="range" 
          :min="slideChart.min" 
          :max="slideChart.max" 
          class="slider" 
          id="myRange" 
          v-model="slideChart.valueSlideChart"
          @click.prevent="updateChart=updateChart*-1"
        >
        <h4 class="label-slider">
          {{selectionCategory}} desde {{hist.date[slideChart.valueSlideChart]}}
        </h4>
      </div>

    </div>
  </div>
</template>

<script>
import { HTTP } from "../plugins/axios";
import TitleSlideDown from "../components/TitleSlideDown.vue";
import Loading from "../components/Loading.vue";
import PPInput from "../components/PPInput.vue";
import Line from "../components/Line.vue";
import database from "@/helpers/db-interface";
import BarChart from "../components/HorizontalBarChart.vue";


export default {
  components: {
    TitleSlideDown,
    Loading,
    PPInput,
    Line,
    BarChart,
  },
  data() {
    return {
      etf2add: {},
      mappingAssets: undefined,
      selectionCategory: undefined,
      slideChart: {
        min: 0,
        max: 0,
        valueSlideChart: 0
      },
      hist: undefined,
      updateChart: 1,
    }
  },
  watch: {
    selectionCategory(){
      this.updateChart = this.updateChart * -1
    }
  },
  computed: {
    fallbackPercents(){
      const codes = this.mappingAssets[this.selectionCategory]

      const growth = codes.map((cod) => {
        const before = this.hist[cod][this.slideChart.valueSlideChart]
        const after = this.hist[cod].slice(-1).pop()
        return before ? ((after/before - 1) * 100).toFixed(2) : 0
      })

      return growth
    }
  },
  mounted(){
    (async () => {
      let listAssets = await database.getQuoteAnalysis()
      listAssets = !Object.keys(listAssets) ? {'IBOVESPA': ['^BVSP', 'EWZ']} : listAssets
      console.log(listAssets)
      this.mappingAssets = listAssets
      this.etf2add = listAssets
      this.selectionCategory = Object.keys(listAssets).pop()

      const codes = Object.keys(this.mappingAssets).reduce(
        (acc, i) => acc.concat(...this.mappingAssets[i]),
        []
      )

      this.hist = (await HTTP.get("/historical?query=" + codes.join(['%2C']))).data.response
      this.updateSlide(this.hist.date)
    })();
  },
  methods:{
    addETF(el){
      this.etf2add[el.regex] = [];
    },
    addQuote(el, el2){
      this.etf2add[el2].push(el.regex)
    },
    saveSetup(){
      database.putQuoteAnalysis(this.etf2add)
      window.location.reload()
    },
    updateSlide(dates){
      this.slideChart.max = dates.length - 1
    }
  }
};
</script>

<style>
.qa-input {
  background: #fff2;
  padding: 1%;
}

.qa-button {
  outline: none;
  font-size: 1.5rem;
  border: 1px solid rgb(3, 3, 3);
  padding: 5px 10px 8px;
  color: rgb(0, 0, 0);
  border-left: none;
  background-color: #21f33d;
  border-radius: 8px;
  float: right;
}

.qa-chart-button {
  outline: none;
  border: 3px solid rgba(3, 3, 3, 0.144);
  border-radius: 10%;
  background-color: #2195f3bb;
  color: rgb(236, 226, 226);
  font-size: 1rem;
  margin-bottom: 5px;
  margin: 0.2%;
}

.active {
  background-color: #315740bb;
  box-shadow: 0px 0px 8px 8px rgba(36, 211, 103, 0.658);
}

.label-slider {
  min-width: 15em;
}

.slidecontainer {
  display: flex;
  /* width: 100%; Width of the outside container */
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
  align-self: center;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: #06f164;
  box-shadow: 0px 0px 8px 8px rgba(36, 211, 103, 0.658);
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
