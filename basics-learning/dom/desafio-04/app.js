new Vue({
	el: '#desafio',
	data: {
		classe1: "",
		classesCSS: '',
		activaClasseCSS: '',
		state: true,
		cor5: "",
		estilo5: {
			width: '100px',
			height: '100px',
		},
		width: "0",
	},
	methods: {
		iniciarEfeito() {
			setInterval(() => {
				this.classe1 = this.classe1 == "destaque"
					? "encolher" : "destaque"
			}, 1000)
		},
		iniciarProgresso() {
			let valor = 0
			const temporizador = setInterval(()=>{
				valor+=5
				this.width = `${valor}%`
				if (valor==100) clearInterval(temporizador)
			}, 500)
		}
	},
	computed: {
		ativador() {
			if (this.activaClasseCSS == "true" || this.activaClasseCSS == "false") {
				this.state = this.activaClasseCSS == "true"
			}
			return {
				destaque: this.state,
				encolher: this.state
			}
		},
		meuEstilo() {
			return {
				backgroundColor: "red",
				width: "200px !important",
			}
		}

	}
})
