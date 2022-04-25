function start() { // Inicio da função start()

	// Selectores
	let inicio = document.getElementById("inicio")
	let fundoGame = document.getElementById("fundoGame")

	let somDisparo = document.getElementById("somDisparo");
	let somExplosao = document.getElementById("somExplosao");
	let musica = document.getElementById("musica");
	let somGameover = document.getElementById("somGameover");
	let somPerdido = document.getElementById("somPerdido");
	let somResgate = document.getElementById("somResgate");

	// Initialize Start
	inicio.style.visibility = "hidden";

	//Música em loop
	musica.addEventListener("ended", function () { musica.currentTime = 0; musica.play(); }, false);
	musica.play();

	let energiaStatus = document.createElement("div")
	energiaStatus.id = "energia";

	let placarContent = document.createElement("div");
	placarContent.id = "placar";

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

	fundoGame.appendChild(placarContent)
	fundoGame.appendChild(energiaStatus)
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
	var energiaAtual = 3;
	var pontos = 0;
	var salvos = 0;
	var perdidos = 0;
	var fimdejogo = false;
	var podeAtirar = true;
	var correAmigo = true;
	var andaInimigo2 = true;
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
		colisao();
		placar();
		energia();

		if (andaInimigo2) {
			moveinimigo2();
		}

		if (correAmigo) {
			moveamigo();
		}

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
			somDisparo.play();
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

			energiaAtual--;
			let inimigo1X = parseInt(window.getComputedStyle(inimigo1).left)
			let inimigo1Y = parseInt(window.getComputedStyle(inimigo1).top)

			explosao1(inimigo1X, inimigo1Y);

			posicaoY = parseInt(Math.random() * 334);
			inimigo1.style.left = "694px"
			inimigo1.style.top = posicaoY + "px"
		}

		// jogador com o inimigo2 
		if (colisao2.length > 0) {

			energiaAtual--;
			let inimigo2X = parseInt($("#inimigo2").css("left"));
			let inimigo2Y = parseInt($("#inimigo2").css("top"));
			explosao2(inimigo2X, inimigo2Y);

			let posicaoY = 447;
			inimigo2.style.left = "750px"
			inimigo2.style.top = posicaoY + "px"

			inimigo2.style.visibility = "hidden"
			andaInimigo2 = false;
			reposicionaInimigo2();
		}


		// Disparo com o inimigo1

		if (colisao3.length > 0) {

			velocidade = velocidade + 0.3;
			pontos = pontos + 100;
			let disparo = document.getElementById("disparo")

			let inimigo1X = parseInt(window.getComputedStyle(inimigo1).left)
			let inimigo1Y = parseInt(window.getComputedStyle(inimigo1).top)

			explosao1(inimigo1X, inimigo1Y);
			disparo.style.left = "950px"

			posicaoY = parseInt(Math.random() * 334);
			inimigo1.style.left = "750px"
			inimigo1.style.top = posicaoY + "px"
		}

		// Disparo com o inimigo2

		if (colisao4.length > 0) {

			if (andaInimigo2) {
				pontos = pontos + 50;
				let disparo = document.getElementById("disparo")

				let inimigo2X = parseInt(window.getComputedStyle(inimigo2).left)
				let inimigo2Y = parseInt(window.getComputedStyle(inimigo2).top)

				explosao2(inimigo2X, inimigo2Y);
				disparo.style.left = "950px";

				andaInimigo2 = false;
				inimigo2.style.visibility = "hidden";
				reposicionaInimigo2();
			}
		}

		// jogador com o amigo

		if (colisao5.length > 0) {
			somResgate.play();
			salvos++;
			correAmigo = false;
			amigo.style.display = "none";
			reposicionaAmigo();
		}

		//Inimigo2 com o amigo
		if (colisao6.length > 0) {

			perdidos++;
			var amigoX = parseInt(window.getComputedStyle(amigo).left)
			var amigoY = parseInt(window.getComputedStyle(amigo).top)

			correAmigo = false;
			amigo.style.display = "none";

			reposicionaAmigo();
			explosao3(amigoX, amigoY);
		}

	} //Fim da função colisao()


	//Explosão 1
	function explosao1(inimigo1X, inimigo1Y) {

		somExplosao.play();
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
				inimigo2.style.left = "750px"
				andaInimigo2 = true;
				inimigo2.style.visibility = "visible";
			}

		}
	}


	//Explosão2
	function explosao2(inimigo2X, inimigo2Y) {

		somExplosao.play();
		let explosao2 = document.createElement("div")
		explosao2.id = "explosao2";
		fundoGame.appendChild(explosao2)

		explosao2.style.backgroundImage = "url(imgs/explosao.png)"
		explosao2.style.top = inimigo2Y + "px"
		explosao2.style.left = inimigo2X + "px"

		explosao2.animate({ width: "200px", opacity: 0 }, 400);

		var tempoExplosao2 = window.setInterval(removeExplosao2, 400);

		function removeExplosao2() {

			explosao2.remove();
			window.clearInterval(tempoExplosao2);
			tempoExplosao2 = null;

		}


	} // Fim da função explosao2()


	//Reposiciona Amigo

	function reposicionaAmigo() {

		var tempoAmigo = window.setInterval(reposiciona6, 6000);

		function reposiciona6() {

			let jogadorY = parseInt(window.getComputedStyle(jogador).top)

			window.clearInterval(tempoAmigo);
			tempoAmigo = null;
			let check = false;

			if (fimdejogo == false) {
				correAmigo = true;
				amigo.style.left = "10px"
				amigo.style.display = "block";

			}

		}

	} // Fim da função reposicionaAmigo()


	//Explosão3

	function explosao3(amigoX, amigoY) {

		somPerdido.play();
		let explosao3 = document.createElement("div")
		explosao3.id = "explosao3"
		explosao3.classList.add("anima4")

		explosao3.style.top = amigoY + "px"
		explosao3.style.left = amigoX + "px"

		fundoGame.appendChild(explosao3)

		var tempoExplosao3 = window.setInterval(resetaExplosao3, 1000);

		function resetaExplosao3() {
			explosao3.remove();
			window.clearInterval(tempoExplosao3);
			tempoExplosao3 = null;

		}

	} // Fim da função explosao3


	function placar() {

		let placar = document.getElementById("placar")
		placar.innerHTML = "<h2>Pontos: " + pontos + " Salvos: " + salvos + " Perdidos: " + perdidos + "</h2>";

	} //fim da função placar()


	//Barra de energia

	function energia() {

		let energia = document.getElementById("energia")

		if (energiaAtual == 3) {
			energia.style.backgroundImage = "url(imgs/energia3.png)";
		}

		if (energiaAtual == 2) {
			energia.style.backgroundImage = "url(imgs/energia2.png)";
		}

		if (energiaAtual == 1) {
			energia.style.backgroundImage = "url(imgs/energia1.png)";
		}

		if (energiaAtual == 0) {
			energia.style.backgroundImage = "url(imgs/energia0.png)";
			gameOver();
		}

	} // Fim da função energia()

	//Função GAME OVER
	function gameOver() {
		fimdejogo = true;
		musica.pause();
		somGameover.play();

		window.clearInterval(jogo.timer);
		jogo.timer = null;

		jogador.remove();
		inimigo1.remove();
		inimigo2.remove();
		amigo.remove();

		let fim = document.createElement("div");
		fim.id = "fim";
		fundoGame.appendChild(fim);

		let gameOver = document.getElementById("fim");
		gameOver.innerHTML = "<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<button id='reinicia' onClick='reiniciaJogo()'>Jogar Novamente</button>"
	} // Fim da função gameOver();

} // Fim da função start

// Reinicia jogo
function reiniciaJogo() {
	somGameover.pause();
	fim.remove();
	start();
	
} //Fim da função reiniciaJogo */
