new Vue({
    el: '#desafio',
    data: {
        nome: 'Henrique',
        idade: 27,
        imageLink: 'https://img.ibxk.com.br/2021/03/07/07214441295002.jpg?w=1120&h=420&mode=crop&scale=both'
    },
    methods: {
        myrandom: function () {
            return Math.random()
        }
    }
})