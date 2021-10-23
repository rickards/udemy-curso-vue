<template>
  <div>
    <p class="line" @click="show=!show">
      <span class="span-style" style="text-align: left;">{{ label }}</span>
      <span class="span-style" style="text-align: right;" v-if="value">{{
        price.format(value)
      }}</span>
    </p>
    <div class="p" v-if="show">
      <slot>
      </slot>
    </div>
  </div>
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
      show: false
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
.p {
  margin: 10px;
  font-size: 0.8em;
  background: rgba(85, 101, 104, 0.527);
  padding: 2px;
  border-radius: 5%;
}
</style>
