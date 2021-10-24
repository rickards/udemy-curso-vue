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
    <Loading v-if="false" />
    <div v-else>

    </div>
  </div>
</template>

<script>
import TitleSlideDown from "../components/TitleSlideDown.vue";
import Loading from "../components/Loading.vue";
import PPInput from "../components/PPInput.vue";
import Line from "../components/Line.vue";
import database from "@/helpers/db-interface";

export default {
  components: {
    TitleSlideDown,
    Loading,
    PPInput,
    Line,
  },
  data() {
    return {
      etf2add: {},
      mappingAssets: undefined,
    }
  },
  created(){
    database.getQuoteAnalysis().then((listAssets) => {
      console.log(listAssets)
      this.mappingAssets = listAssets
      this.etf2add = listAssets
    })
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
</style>
