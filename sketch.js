//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//variáveis dados da Raquete
let raqueteComprimento = 10;
let raqueteAltura = 90;

//variáveis da raquete
let xRaquete = 5;
let yRaquete = 150;


//variáveis do oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar do jogo
let meusPontos = 0
let pontosDoOponente = 0

//chance do oponente errar
let chanceDeErrar = 0;

//sons do jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}

function setup() {
    createCanvas(600, 400);
    trilha.loop();
}

function draw() {
  background(0); // 1-Desenha o cenário
  mostraBolinha(); 
  movimentaBolinha();
  verificaColisaoBorda(); 
  mostraRaquete(xRaquete,yRaquete);
  movimentaMinhaRaquete();
  //verificaColisaoRaquete();
  verificaColisaoRaquete(xRaquete,yRaquete);
  mostraRaquete(xRaqueteOponente,yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente,yRaqueteOponente);
  incluiPlacar();
  marcaPonto();

// 2-Desenha a bolinha
function mostraBolinha() {
    circle(xBolinha, yBolinha, diametro);
}

// 3-Movimenta a Bolinha
function movimentaBolinha() {
    xBolinha += velocidadeXBolinha;
    yBolinha += velocidadeYBolinha;
}

// 4-Verifica Colisão da bolinha e borda
function verificaColisaoBorda() {
  if (xBolinha + raio > width || 
      xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
    }
  if (yBolinha + raio > height || 
      yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
    }
}

// 5-Desenha raquete do oponente
function mostraRaquete(x,y) {
    rect(x, y, raqueteComprimento, 
         raqueteAltura);
}

// 6-Movimenta minha raquete
function movimentaMinhaRaquete() {
    if (keyIsDown(UP_ARROW)) {
        yRaquete -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yRaquete += 10;
    }
}

// 7-Verifica colisão da minha raquete
function verificaColisaoRaquete() {
    if (xBolinha - raio < xRaquete + raqueteComprimento &&
        yBolinha - raio < yRaquete + raqueteAltura && 
        yBolinha + raio > yRaquete) {
        velocidadeXBolinha *= -1;
        raquetada.play();
    }
}

// 8-Verifica colisão da minha raquete e do oponente
function verificaColisaoRaquete(x, y){
  colidiu = collideRectCircle(x, y,raqueteComprimento,raqueteAltura,
                              xBolinha,yBolinha,raio);
  if (colidiu){
    velocidadeXBolinha *= -1;
    raquetada.play();
  }
}

// 9-Movimenta Raquete Oponente
function movimentaRaqueteOponente(){
  velocidadeYOponente = yBolinha -yRaqueteOponente - raqueteComprimento / 2 - 30;
  yRaqueteOponente += velocidadeYOponente + chanceDeErrar
  calculaChanceDeErrar()
}

// 10-Incluir placar
function incluiPlacar(){
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255,140,0));
  rect(150,10,40,20);
  fill(255);
  text(meusPontos, 170,26);
  fill(color(255,140,0));
  rect(450,10,40,20);
  fill(255);
  text(pontosDoOponente, 470,26);
   }
}

// 11-Marcar Pontos
function marcaPonto() {
    if (xBolinha > 590) {
        meusPontos += 1;
        ponto.play();
    }
    if (xBolinha < 10) {
        pontosDoOponente += 1;
        ponto.play();
    }
}

// 12-Chance do oponente errar
function calculaChanceDeErrar() {
  if (pontosDoOponente >= meusPontos) {
    chanceDeErrar += 1
    if (chanceDeErrar >= 39){
    chanceDeErrar = 40
    }
  } else {
    chanceDeErrar -= 1
    if (chanceDeErrar <= 35){
    chanceDeErrar = 35
    }
  }

// 13-solução para Bolinha não ficar presa
function bolinhaNaoFicaPresa(){
    if (XBolinha - raio < 0){
    XBolinha = 23
    }
}

}