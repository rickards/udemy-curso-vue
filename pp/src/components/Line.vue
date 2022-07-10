<template>
  <div>
    <p class="line" @click="show=!show">
      <span class="icon-expansive" v-if="expansive">{{ show ? "▲" : "▼" }}</span>
      <span v-if="!editLabel" class="span-style" style="text-align: left;">{{ llabel }}</span>
      <input v-else class="input-style" type="text" @keydown.enter="labelChanged" v-model="llabel" />
      <span class="span-style" style="text-align: right;" v-if="value">
        {{price.format(value)}}
      </span>
      <span v-else-if="!editLabel" class="button-panel">
        <button class="button-style" @click="onEditChange()">✎</button>
        <button class="button-style" @click="$emit('delete', label)">✘</button>
      </span>
    </p>
    <div :class="{p : expansive}" v-if="show && expansive">
      <slot />
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
      show: false,
      editLabel: false,
      llabel: "",
      oldLabel: "",
    };
  },
  created() {
    this.llabel = this.label
  },
  computed: {
    expansive() {
      return this.$slots.default || false;
    },
  },
  methods: {
    labelChanged() {
      this.editLabel=!this.editLabel
      this.$emit("labelChanged", {new: this.llabel, old: this.oldLabel})
    },
    onEditChange() {
      this.editLabel=!this.editLabel
      this.oldLabel=this.llabel
    }
  }
};
</script>

<style>
.line {
  background-color: #2195f3bb;
  border-radius: 20px;
  height: 20px;
  display: flex;
  margin: 1%;
  padding: 0.5em 0.5em 0.5em;
}
.span-style {
  width: 100%;
}
.button-style {
  background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
  margin-right: 5px;
}

.button-panel {
  text-align: right;
  display: flex;
}

.p {
  margin: 10px;
  font-size: 0.8em;
  background: rgba(0, 0, 0, 0);
  padding: 2px;
  border-radius: 5%;
}

.icon-expansive {
  margin-right: 5px;
}

.input-style {
  background: none;
	color: inherit;
	font: inherit;
	outline: inherit;
}
</style>
