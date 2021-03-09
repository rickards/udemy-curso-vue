new Vue({
    el: '#desafio',
    data: {
        valor: ''
    },
    methods:{
        alerta(){
            alert("Estou te alertando!")
        },
        alterarValor(event){
            this.valor = event.target.value
        }
    }
})