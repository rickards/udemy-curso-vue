<template>
    <div class="account-record">
        <h1>Registro Contábil</h1>
        <select name="tipo" v-model="isInvestiment">
            <option value="gasto" selected>Gasto</option>
            <option value="ganho">Ganho</option>
            <option value="investimento">Investimentos</option>
        </select>
        <input type="date" :value="date">
        <input type="text" placeholder="nome descritor">
        <input type="number" placeholder="valor">
        <div>
            <input type="checkbox"> <label>Bem</label>
        </div>
        <div v-show="isInvestiment=='investimento'">
            <label>Quantidade de cotas:</label>
            <input type="number" placeholder="5" style="width:50px;">
        </div>
        <label v-show="info" style="color: red;">Há campos obrigatórios vazios!</label>
        <button @click="sendRecord">Registrar</button>
    </div>
</template>

<script>
export default {
    name: 'AccountRecord',
    data() {
        return {
            date: '',
            isInvestiment: 'gasto',
            info: true
        }
    },
    created(){
        var date = new Date(); //create date object 
        var min_date = date.toISOString().slice(0,10); ////get current date specific part "2018-02-02"
        this.date = min_date
    },
    watch: {
        isInvestiment(n){
            console.log(n)
        }
    },
    methods: {
        sendRecord(){

        }
    }
}
</script>

<style>
    .account-record {
        display: inline-grid;
        padding: 1%;
        row-gap: 1em;
    }
</style>