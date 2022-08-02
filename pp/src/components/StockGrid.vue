<template>
  <div>
    <h2 v-if="title">{{ title }}</h2>
    <div class="stock-grid">
      <template v-if="stockCards.length">
        <stock-card
          v-for="bill in stockCards"
          :key="bill.name"
          :bill="bill"
          @stockDeleted="$emit('deleted', bill)"
          @click="$emit('stockClicked', bill)"
        ></stock-card>
      </template>
      <p v-else class="no-bill">Não há contas cadastradas</p>
    </div>
  </div>
</template>

<script>
import StockCard from "./StockCard.vue";

export default {
  components: { StockCard },
  props: {
    stockCards: { type: Array, required: true },
    title: { type: String, required: false },
  },
};
</script>

<style>
.stock-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
}
</style>
