<template>
    <div class="account-record">
        <h1>Registro Contábil</h1>
        <select name="tipo" v-model="label">
            <option value="gasto" selected>Gasto</option>
            <option value="ganho">Ganho</option>
            <option value="investimento">Investimentos</option>
        </select>
        <input type="date" :value="date">
        <input type="text" placeholder="nome descritor" v-model="name">
        <input type="number" placeholder="valor">
        <div>
            <input v-model="isAsset" type="checkbox"> <label>Bem</label>
        </div>
        <div v-show="label=='investimento'">
            <label>Quantidade de cotas:</label>
            <input type="number" placeholder="5" style="width:50px;" v-model="numberQuotes">
        </div>
        <label v-show="info" style="color: red;">Há campos obrigatórios vazios!</label>
        <button @click="sendRecord">Registrar</button>
    </div>
</template>

<script>
import db from '@/helpers/db'

export default {
    name: 'AccountRecord',
    data() {
        return {
            date: '',
            label: 'gasto',
            info: false,
            value: 0,
            id: undefined,
            isAsset: false,
            name: undefined,
            numberQuotes: undefined
        }
    },
    created(){
        this.preload()
    },
    watch: {
        label(n){
            console.log(n)
        }
    },
    methods: {
        capitalize(value){
            return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
        },
        preload(){
            var url = new URL(window.location.href);
            this.id = url.searchParams.get("id");
            this.name = url.searchParams.get("name");
            this.date = url.searchParams.get("date") || new Date().toISOString().slice(0,10);
            const price = url.searchParams.get("value") || this.value;
            this.value = parseFloat(price)
            const type = url.searchParams.get("type");

            switch (type) {
                case 'Bem_ganho':
                    this.isAsset = true
                    this.label = 'ganho'
                    break
                case 'Bem_gasto':
                    this.isAsset = true
                    this.label = 'gasto'
                    break
                case 'Receita':
                    this.isAsset = false
                    this.label = 'ganho'
                    break
                case 'Despesa':
                    this.isAsset = false
                    this.label = 'gasto'
                    break
                case 'Investimento':
                    this.isAsset = false
                    this.label = 'investimento'
                    break
                default:
            }
        },
        sendRecord(){
            // Adiciona ao banco de dados os atributos de registro
            let type = undefined;
            switch (this.label) {
                case 'ganho':
                    type = this.isAsset ? 'Bem_ganho' : 'Receita'
                    break
                case 'gasto':
                    type = this.isAsset ? 'Bem_gasto' : 'Despesa'
                    break
                default:
                    type = this.label
                    break
            }

            // Gatilho para função em android para adicionar um objeto expense
            var expense = {}
            expense.name = this.capitalize(this.name)
            expense.value = this.value
            expense.date = this.date
            expense.type = type
            if (type == "Investimento") {
                expense.qtde = this.numberQuotes
                expense.name = expense.name.toUpperCase()
            }

            if (!this.name || !this.value || !this.date || !type) {
                console.log(this.name, this.value, this.date, type)
                this.info = true
            } else {
                this.name = ''
                this.value = ''
                this.isAsset = false
                this.info = false
                if (this.id) {
                    expense.id = this.id
                    db.runAndroidMethod("updateExpense", JSON.stringify(expense))
                } else {
                    db.runAndroidMethod("addExpense", JSON.stringify(expense))
                }
                window.history.back()
            }
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