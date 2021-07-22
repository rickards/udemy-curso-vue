<template>
  <p class="line">
    <span class="span-style" style="text-align: left;">{{ label }}</span>
    <span class="span-style" style="text-align: right;">{{
      price.format(value)
    }}</span>
  </p>
</template>
<script>
export default {
  name: "Line",
  props: {
    label: { type: String, required: true },
    value: { type: Number, required: false },
  },
  data() {
    return {
      price: new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    };
  },
};
</script>

<style>
.line {
  background-color: #2195f3bb;
  display: flex;
  padding: 1%;
  margin: 1%;
}
.span-style {
  width: 100%;
}
</style>
