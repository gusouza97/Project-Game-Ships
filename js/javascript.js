function start() { // Inicio da função start()

	// Selectores
	let inicio = document.getElementById("inicio")
	let fundoGame = document.getElementById("fundoGame")

	// Initialize Start
	inicio.style.visibility = "hidden";

	let player = document.createElement("div");
	player.classList.add("anima1")
	player.id = "jogador"

	let inimigoUm = document.createElement("div");
	inimigoUm.classList.add("anima2")
	inimigoUm.id = "inimigo1"

	let inimigoDois = document.createElement("div");
	inimigoDois.id = "inimigo2"

	let friend = document.createElement("div");
	friend.classList.add("anima3")
	friend.id = "amigo"

	fundoGame.appendChild(player)
	fundoGame.appendChild(inimigoUm)
	fundoGame.appendChild(inimigoDois)
	fundoGame.appendChild(friend)

	// Selectores Jogadores e Inimigos
	let jogador = document.getElementById("jogador")
	let inimigo1 = document.getElementById("inimigo1")
	let inimigo2 = document.getElementById("inimigo2")
	let amigo = document.getElementById("amigo")

	// Variables Main 
	let jogo = {}
	var fimdejogo = false;
	var podeAtirar = true;
	var velocidade = 5;
	var posicaoY = parseInt(Math.random() * 334);
	let TECLA = {
		W: 87,
		S: 83,
		D: 68
	}

	jogo.pressionou = [];

	// Listeners
	//Verifica se o usuário pressionou alguma tecla	
	document.addEventListener("keydown", (e) => {
		jogo.pressionou[e.which] = true;
	})

	document.addEventListener("keyup", (e) => {
		jogo.pressionou[e.which] = false;
	})

	//Game Loop
	jogo.timer = setInterval(loop, 30);

	function loop() {

		movefundo();
		movejogador();
		moveinimigo1();
		moveinimigo2();
		moveamigo();
		colisao();

	} // Fim da função loop()


	//Função que movimenta o fundo do jogo
	function movefundo() {

		let esquerda = parseInt(window.getComputedStyle(fundoGame).backgroundPosition)
		fundoGame.style.backgroundPosition = esquerda - 1 + "px";

	} // fim da função movefundo()


	//Função move jogdor
	function movejogador() {

		if (jogo.pressionou[TECLA.W]) {
			let topo = parseInt(window.getComputedStyle(jogador).top)

			if (topo >= 20) {
				jogador.style.top = topo - 10 + "px"
			}

		}

		if (jogo.pressionou[TECLA.S]) {
			let topo = parseInt(window.getComputedStyle(jogador).top)

			if (topo <= 434) {
				jogador.style.top = topo + 10 + "px"
			}
		}

		if (jogo.pressionou[TECLA.D]) {
			disparo();
		}

	} // fim da função movejogador()


	// Funcao move inimigo 1
	function moveinimigo1() {

		let posicaoX = parseInt(window.getComputedStyle(inimigo1).left)

		inimigo1.style.left = posicaoX - velocidade + "px"
		inimigo1.style.top = posicaoY + "px"

		if (posicaoX <= 0) {
			posicaoY = parseInt(Math.random() * 334);
			inimigo1.style.left = "694px"
			inimigo1.style.top = posicaoY + "px"
		}
	} //Fim da função moveinimigo1()


	// Funcao move inimigo 2
	function moveinimigo2() {

		let posicaoX = parseInt(window.getComputedStyle(inimigo2).left)
		inimigo2.style.left = posicaoX - 3 + "px"

		if (posicaoX <= 0) {
			inimigo2.style.left = "775px"
		}
	} // Fim da função moveinimigo2()

	// Funcao move amigo
	function moveamigo() {

		let posicaoX = parseInt(window.getComputedStyle(amigo).left)
		amigo.style.left = posicaoX + 1 + "px"

		if (posicaoX > 906) {
			amigo.style.left = "0px"
		}

	} // fim da função moveamigo()

	// Funcao de disparo
	function disparo() {

		if (podeAtirar == true) {

			podeAtirar = false;

			let topo = parseInt(window.getComputedStyle(jogador).top)
			let posicaoX = parseInt(window.getComputedStyle(jogador).left)

			tiroX = posicaoX + 190;
			topoTiro = topo + 37;

			let disparo = document.createElement("div");
			disparo.id = "disparo"
			fundoGame.appendChild(disparo)

			disparo.style.top = topoTiro + "px"
			disparo.style.left = tiroX + "px"

			var tempoDisparo = window.setInterval(executaDisparo, 30);

		} //Fecha podeAtirar

		function executaDisparo() {

			let disparo = document.getElementById("disparo")

			let posicaoX = parseInt(window.getComputedStyle(disparo).left)
			disparo.style.left = posicaoX + 15 + "px"

			if (posicaoX > 900) {

				window.clearInterval(tempoDisparo);
				tempoDisparo = null;

				disparo.remove();
				podeAtirar = true;
			}
		} // Fecha executaDisparo()
	} // Fecha disparo()

	// Funcao de colisao
	function colisao() {
		var colisao1 = ($("#jogador").collision($("#inimigo1")));
		var colisao2 = ($("#jogador").collision($("#inimigo2")));
		var colisao3 = ($("#disparo").collision($("#inimigo1")));
		var colisao4 = ($("#disparo").collision($("#inimigo2")));
		var colisao5 = ($("#jogador").collision($("#amigo")));
		var colisao6 = ($("#inimigo2").collision($("#amigo")));

		// jogador com o inimigo1

		if (colisao1.length > 0) {

			let inimigo1X = parseInt(window.getComputedStyle(inimigo1).left)
			let inimigo1Y = parseInt(window.getComputedStyle(inimigo1).top)

			explosao1(inimigo1X, inimigo1Y);

			posicaoY = parseInt(Math.random() * 334);
			inimigo1.style.left = "694px"
			inimigo1.style.top = posicaoY + "px"
		}

		// jogador com o inimigo2 
		if (colisao2.length > 0) {

			let inimigo2X = parseInt(window.getComputedStyle(inimigo2).left)
			let inimigo2Y = parseInt(window.getComputedStyle(inimigo2).top)

			explosao2(inimigo2X, inimigo2Y);

			inimigo2.remove();

			reposicionaInimigo2();

		}

	} //Fim da função colisao()


	//Explosão 1
	function explosao1(inimigo1X, inimigo1Y) {

		let explosao1 = document.createElement("div")
		explosao1.id = "explosao1";
		fundoGame.appendChild(explosao1)

		explosao1.style.backgroundImage = "url(imgs/explosao.png)"

		explosao1.style.top = inimigo1Y + "px";
		explosao1.style.left = inimigo1X + "px";

		explosao1.animate({ width: "200px", opacity: 0 }, 400);

		var tempoExplosao = window.setInterval(removeExplosao, 400);

		function removeExplosao() {
			explosao1.remove();
			window.clearInterval(tempoExplosao);
			tempoExplosao = null;
		}

	} // Fim da função explosao1()


	//Reposiciona Inimigo2

	function reposicionaInimigo2() {

		var tempoColisao4 = window.setInterval(reposiciona4, 5000);

		function reposiciona4() {
			window.clearInterval(tempoColisao4);
			tempoColisao4 = null;

			if (fimdejogo == false) {
				let inimigoDois = document.createElement("div");
				inimigoDois.id = "inimigo2"
				fundoGame.appendChild(inimigoDois)
			}

		}
	}


	//Explosão2
	function explosao2(inimigo2X, inimigo2Y) {

		let explosao2 = document.createElement("div")
		explosao2.id = "explosao2";
		fundoGame.appendChild(explosao2)

		explosao2.style.backgroundImage = "url(imgs/explosao.png)"
		explosao2.style.top = inimigo2Y + "px"
		explosao2.style.left = inimigo2X + "px"

		explosao2.animate({ width: "200px", opacity: 0 }, 400);

		var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

		function removeExplosao2() {

			explosao2.remove();
			window.clearInterval(tempoExplosao2);
			tempoExplosao2 = null;

		}


	} // Fim da função explosao2()


} // Fim da função start

