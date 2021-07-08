<template>
  <div class="stock-card stock-labels">
    <span @click.stop="$emit('stockDeleted', bill)" class="stock-close">x</span>
    <p>{{ bill.name }}</p>
    <h2>{{ bill.value }}</h2>
    <p :class="{ green: bill.percent >= 0, red: bill.percent < 0 }">
      {{ spread }} ({{ bill.percent }})
      <span v-if="bill.percent >= 0">⇧</span>
      <span v-else>⇩</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    bill: { type: Object, required: true },
  },
  data() {
    return {
      
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
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  margin: 2%;
  width: 95%;
  cursor: pointer;
}

.stock-labels {
  text-align: left;
  padding-left: 3%;
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
