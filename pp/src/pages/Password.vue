<template>
  <div class="grid-columns">
    <div class="account-record">
      <br>

      <div class="grid-columns-inputs gap">
        
        <input
          class="input"
          type="text"
          placeholder="PASSWORD"
          v-model="password"
        />
      </div>

      <button class="acc-record-button" @click="addPassword">Logar</button>
    </div>
  </div>
</template>

<script>

export default {
  name: "AccountRecord",
   components: {
  },
  data() {
    return {
      password: undefined
    };
  },
  created() {
  },
  updated(){
    console.log("updated!")
  },
  methods: {
    addPassword(){
      localStorage.password = localStorage.password || this.password
      if (localStorage.password == this.password){
        localStorage.database = "pp"
      }else{
        localStorage.database = "x0rj9d8XChh0Hzhe3cXjmBbM7hC2"
      }
      console.log("foi")
      // this.$root.currentRoute = "/logado"
      // window.location += "logado";
      window.location.reload();
    }
  },
};
</script>

<style>
.account-record {
  display: inline-grid;
  padding: 1%;
  row-gap: 2em;
}

.acc-record-button {
  outline: none;
  border: 3px solid rgba(3, 3, 3, 0.144);
  border-radius: 20px;
  background-color: #2195f3bb;
  color: rgb(236, 226, 226);
  font-size: 1rem;
  margin-bottom: 5px;
  margin: 0.2%;
  height: 45px;
}

.input {
  font-size: 20px;
  font-size: max(16px, 1em);
  font-family: inherit;
  padding: 0.25em 1.5em;
  background-color: rgb(95, 95, 95);
  color: antiquewhite;
  border: 2px solid var(--input-border);
  border-radius: 50px;
  size: 1rem;
  height: 40px;
}

.gap {
  row-gap: 2em;
  column-gap: 2em;
}

.grid-columns {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
}

.grid-columns-inputs {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
