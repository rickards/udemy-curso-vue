<template>
  <div>
    <div class="slide-top">
      <h2 class="slide-title">{{ title }}</h2>
      <button class="slide-title" @click="button = !button">
        {{ button ? "▲" : "▼" }}
      </button>
    </div>

    <div class="slide-down" v-if="button">
        <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      regex: "",
      button: false,
    };
  },
  props: {
    title: { type: String, required: true },
  },
  methods: {
    add() {
      this.$emit("billAdded", { regex: this.regex.slice() });
      this.regex = "";
    },
  },
};
</script>

<style>
.slide-top {
  margin: 25px 10px 25px 10px;
  font-size-adjust: unset;
  display: flex;
}

.slide-title {
  outline: none;
  font-size: 1,5rem;
  border: 1px solid rgb(3, 3, 3);
  padding: 5px 10px 8px;
  margin: 0%;
}

h2.slide-title {
  width: calc(100% - 40px);
  background: #fff2;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

button.slide-title {
  width: 40px;
  border-left: none;
  background-color: #1664a3;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.slide-down {
  margin: 0%;
}
</style>
