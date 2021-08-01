<template>
  <div>
    <h1>Meus Índices</h1>
    <BarChart
      :serie="[400, 430, 448, -470, 540, 580, 690, 1100, 1200, 1380]"
      :categories="[
        'South Korea',
        'Canada',
        'United Kingdom',
        'Netherlands',
        'Italy',
        'France',
        'Japan',
        'United States',
        'China',
        'Germany',
      ]"
    ></BarChart>
    <NewBill @billAdded="addQuote"></NewBill>
  </div>
</template>

<script>
import BarChart from "../components/HorizontalBarChart.vue";
import NewBill from "../components/NewBill";

export default {
  components: {
    BarChart,
    NewBill,
  },
  methos:{
      addQuote(el){
          console.log(el)
      }
  }
};
</script>

<style></style>
