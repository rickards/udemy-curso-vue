<template>
  <div class="stock-card stock-labels">
    <span @click.stop="$emit('stockDeleted', bill)" class="stock-close">x</span>
    <p>{{ bill.name }}</p>
    <h2>{{ price.format(bill.value) }}</h2>
    <p :class="{ green: bill.percent >= 0, red: bill.percent < 0 }">
      {{ spreadFormat.format(spread) }} ({{ percent.format(bill.percent) }})
      <span v-if="bill.percent >= 0">⇧</span>
      <span v-else>⇩</span>
    </p>
    <span>{{bill.id}}</span>
  </div>
</template>

<script>
export default {
  props: {
    bill: { type: Object, required: true },
  },
  data() {
    return {
      price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      percent: new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
      spreadFormat: new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    };
  },
  computed: {
    spread() {
      return (this.bill.value * this.bill.percent) / (1 + this.bill.percent);
    },
  },
};
</script>

<style>
.stock-card {
  box-shadow: 1px 4px 8px 1px rgba(248, 248, 248, 0.658);
  background-color: rgb(21, 21, 21);
  margin: 5%;
  width: 85%;
  cursor: pointer;
}

.stock-labels {
  text-align: left;
  padding-left: 8%;
  font-size: 1.3em;
}

.red {
  color: tomato;
}

.green {
  color: teal;
}

.stock-close {
  position: relative;
  left: 88%;
  top: 1%;
  font-size: 0.9rem;
  font-weight: 600;
  height: 20px;
  width: 20px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
}
</style>
