new Vue({
    el: '#desafio',
    data: {
        valor: ''
    },
    methods:{
        alerta(){
            alert("Estou te alertando!")
        },
        keydown(event){
            this.valor = event.target.value
        }
    }
})