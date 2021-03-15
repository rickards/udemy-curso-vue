new Vue({
	el: '#game',
	data: {
        playning: false,
		progressJogador: 500,
        progressMonstro: 500,
        log : [],
	},
    methods: {
        actionGame(x, y, c) {
            let atkJogador = this.getRandom(0, x)
            let atkMonstro = this.getRandom(0, y)
            let cura = this.getRandom(0, c)
            this.progressJogador = this.progressJogador - atkMonstro
            this.progressMonstro = this.progressMonstro - atkJogador
            this.progressJogador = this.progressJogador + cura
            
            actionJogador = {
                atacante: "JOGADOR",
                acao: c > 0 ? "CURA" : "ATINGIU",
                recebedor: c > 0 ? "JOGADOR" : "MONSTRO",
                pts: c > 0 ? cura : atkJogador,
            }
            
            actionMonstro = {
                atacante: "MONSTRO",
                acao: "ATINGIU",
                recebedor: "JOGADOR",
                pts:atkMonstro,
            }
            
            this.log.unshift(actionJogador)
            this.log.unshift(actionMonstro)
            this.isgameover()
        },
        iniciarGame(){
            this.playning = !this.playning
            this.log = []
            this.progressJogador = 500
            this.progressMonstro = 500
        },
        isgameover(){
            if (this.progressJogador<=0){
                this.progressJogador = 0
                this.playning = false
            }
            if (this.progressMonstro<=0){
                this.progressMonstro = 0
                this.playning = false
            }
        },
        getRandom(min, max){
            const value = Math.random() * (max-min)+min
            return Math.round(value)
        }
    }
})
