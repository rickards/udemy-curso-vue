new Vue({
	el: '#game',
	data: {
        playning: false,
		progressJogador: "500",
        progressMonstro: "500",
        log : [],
	},
    methods: {
        actionGame(x, y, c) {
            let atkJogador = Math.random()*x
            let atkMonstro = Math.random()*y
            let cura = Math.random()*c
            this.progressJogador = this.progressJogador - atkMonstro
            this.progressMonstro = this.progressMonstro - atkJogador
            this.progressJogador = this.progressJogador + cura
            
            actionJogador = {
                atacante: "JOGADOR",
                acao: c > 0 ? "CURA" : "ATINGIU",
                recebedor: c > 0 ? "JOGADOR" : "MONSTRO",
                pts: c > 0 ? cura : atkJogador,
            }
            this.log.push(actionJogador)

            actionMonstro = {
                atacante: "MONSTRO",
                acao: "ATINGIU",
                recebedor: "JOGADOR",
                pts:atkMonstro,
            }
            this.log.push(actionMonstro)
            this.isgameover()
        },
        iniciarGame(){
            this.playning =! this.playning
            this.log = []
            this.progressJogador = "500"
            this.progressMonstro = "500"
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
        }
    }
})
