//Configurações do canvas e criação do contexto.
var canvas = document.getElementById("canvasjogo");
canvas.width = 480;
canvas.height = 320;
var contexto = canvas.getContext("2d"); 

/* VARIÁVEIS GLOBAIS */
//Posição inicial da bola
var x = canvas.width/2;
var y = canvas.height-30;

//Velocidade da bola
var dx = 2;
var dy = -2;

//Raio da bola
var raioBola = 10;

//Base (controlada pelo jogador)
var baseAltura = 10;
var baseLargura = 75;
var baseX = (canvas.width-baseLargura)/2;

//Estado dos controladores do jogo
var teclaEsquerdaPressionada = false;
var teclaDireitaPressionada = false;


/*FUNÇÕES DO JOGO*/
//Função que desenha a bola na posição contida nas variáveis globais x,y
function desenharBola(){
	contexto.beginPath();
	contexto.arc(x, y, raioBola, 0, Math.PI*2);
	contexto.fillStyle = "#0095DD";
	contexto.fill();
	contexto.closePath();
}

//Função para desenhar a base controlada pelo jogador
function desenharBase() {
    contexto.beginPath();
    contexto.rect(baseX, canvas.height-baseAltura, baseLargura, baseAltura);
    contexto.fillStyle = "#0095DD";
    contexto.fill();
    contexto.closePath();
}

//Função que desenha todos os componentes do jogo a cada loop
function desenha(){
	contexto.clearRect(0, 0, canvas.width, canvas.height);
	
	desenharBola();
	desenharBase();
	
	
	//Atualiza a posição da bola
	x += dx;
  y += dy;
  
	//Colisão com borda direita e esquerda
	if(x + dx > canvas.width - raioBola || x + dx < raioBola){
		dx = -dx;
	}

	//Colisão com borda superior
	if(y + dy < raioBola){
		dy = -dy;
	}
	//Colisão com a borda inferior
	else if(y + dy > canvas.height - raioBola){
		//Caso esteja na direção da base, altera o movimento da bola
		if(x > baseX && x < baseX + baseLargura){
			dy = -dy;
		}
		//Senão termina o jogo
		else{
			//Imprime mensagem de gameover
      contexto.font = "40px Arial";
      contexto.fillText("Fim do Jogo",150,50);
      // Atualiza a página
			setTimeout(function() {
      location.reload(true);
        }, 30000);
		  }
	}
	//Move a base controlada pelo jogador
	if(teclaDireitaPressionada && baseX < canvas.width - baseLargura){
		baseX += 7;
	}else if(teclaEsquerdaPressionada && baseX > 0){
		baseX -= 7;
	}
}

//Leitores de eventos do teclado
document.addEventListener("keydown", trataTeclaBaixo, false);
document.addEventListener("keyup", trataTeclaCima, false);

//Funções que tratam os eventos keydown e keyup
function trataTeclaBaixo(evento){
	//Se o keyCode == Seta para Direita
	if(evento.keyCode == 39) {
		teclaDireitaPressionada = true;
	}
	//Se o keyCode == Seta para Esquerda
	else if(evento.keyCode == 37){
		teclaEsquerdaPressionada = true;
	}
}

function trataTeclaCima(evento){
	//Se o keyCode == Seta para Direita
    if(evento.keyCode == 39){
        teclaDireitaPressionada = false;
    }
	//Se o keyCode == Seta para Esquerda
    else if(evento.keyCode == 37){
        teclaEsquerdaPressionada = false;
    }
}


//Loop do jogo
setInterval(desenha, 10);