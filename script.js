const body = document.body;
const botao = document.getElementById("botao");
const botao2 = document.getElementById("botao2");
const arma1 = document.getElementById("arma1")
const arma2 = document.getElementById("arma2")
const arma3 = document.getElementById("arma3")
const arma4 = document.getElementById("arma4")
const arma5 = document.getElementById("arma5")
const arma6 = document.getElementById("arma6")
const personagemColide = [];
const atiradores = [];
const baloes = [];
let atirador1 = null;
let fase = 11;

class Personagem {
    constructor(px, py) {
        this.px = px;
        this.py = py;
    }
}

class Atirador extends Personagem {
    constructor(px, py, cor) {
        super(px, py);
        this.range = 120;
        this.velAtaque = 5;
        this.cor = cor;
        this.tamx = 50;
        this.tamy = 50;
        this.id = Date.now() + "_" + Math.floor(Math.random() * 1000000000);
        this.desenhar();
        this.eu = document.getElementById(this.id);
        personagemColide.push({
            xMin: this.px - (this.tamx / 2),
            xMax: this.px + (this.tamx / 2),
            yMin: this.py - (this.tamy / 2),
            yMax: this.py + (this.tamy / 2)
        })

        this.eu.addEventListener("mouseenter", () => {
            this.eu.style.boxShadow = `0 0 0 ${this.range - this.tamx}px
             rgba(255, 255, 255, 0.4)`;
        });

        this.eu.addEventListener("mouseleave", () => {
            this.eu.style.boxShadow = "none";
        });
        atiradores.push(this);
    }

    desenhar() {
        const div = document.createElement("div");
        div.setAttribute("id", this.id);
        div.setAttribute("class", "atirador");
        div.setAttribute("style", `left:${this.px - (this.tamx / 2)}px;
        top:${this.py - (this.tamy / 2)}px;width:${this.tamx}px;
        height:${this.tamy}px;background-color:${this.cor};`);
        body.appendChild(div);
    }

    verificarBaloes(baloes) {
        return baloes.some(balao => {

            // Centro do balão
            const balaoX = balao.px + balao.tamx / 2;
            const balaoY = balao.py + balao.tamy / 2;

            // Ponto do atirador mais próximo do balão
            const pontoX = Math.max(
                this.px,
                Math.min(balaoX, this.px + this.tamx)
            );

            const pontoY = Math.max(
                this.py,
                Math.min(balaoY, this.py + this.tamy)
            );

            // Distância entre o balão e o ponto mais próximo
            const dx = balaoX - pontoX;
            const dy = balaoY - pontoY;

            const distancia = Math.sqrt(dx * dx + dy * dy);

            return distancia <= this.range;
        });
    }

    atirar() {
    }
}

const arrayCoresBaloes = ["red", "blue", "yellow",
    "green", "white", "black"];
const arrayTamanhoBaloesx = [35, 38, 29, 28, 20, 22];
const arrayTamanhoBaloesy = [42, 55, 38, 35, 29, 31];
const velBaloes = [1.5, 1.4, 1.3, 1.2, 1.1, 1];

class Baloes {
    constructor(vidas) {
        this.vidas = vidas;
        this.cor = arrayCoresBaloes[vidas - 1];
        this.tamx = arrayTamanhoBaloesx[vidas - 1];
        this.tamy = arrayTamanhoBaloesy[vidas - 1];
        this.vel = velBaloes[vidas - 1];
        this.px = 0;
        if(fase <= 5) {
            this.py = 35;
        }
        else if(fase >= 6 && fase <= 10) {
            this.py = 264;
        }
        this.dirx = 1;
        this.diry = 0;
        this.id = Date.now() + "_" + Math.floor(Math.random() * 1000000000);
        this.desenhar();
        this.controle = setInterval(() => this.controlar(), 10);
        this.eu = document.getElementById(this.id);
        baloes.push(this);
    }

    desenhar() {
        const div = document.createElement("div");
        div.setAttribute("id", this.id);
        div.setAttribute("class", "balao");
        div.setAttribute("style", `left:${this.px}px;top:${this.py}px;
        width:${this.tamx}px;height:${this.tamy}px;background-color:${this.cor};`);
        body.appendChild(div);
    }

    controleBordasFase01() {
        if (this.py > 30 && this.py < 40 && this.px > 346 && this.px < 356) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 346 && this.px < 356 && this.py > 221 && this.py < 231) {
            this.dirx = 1;
            this.diry = 0;
        }

        if (this.py > 210 && this.py < 230 && this.px > 665 && this.px < 675) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 665 && this.px < 675 && this.py > 382 && this.py < 392) {
            this.dirx = -1;
            this.diry = 0;
        }

        if (this.py > 382 && this.py < 392 && this.px > 228 && this.px < 238) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 228 && this.px < 238 && this.py > 545 && this.py < 555) {
            this.dirx = -1;
            this.diry = 0;
        }
    }

    controleBordasFase06() {
        if (this.py > 259 && this.py < 269 && this.px > 115 && this.px < 125) {
            this.dirx = 0;
            this.diry = -1;
        }

        if (this.px > 115 && this.px < 125 && this.py > -5 && this.py < 5) {
            this.dirx = 1;
            this.diry = 0;
        }

        if (this.py > -5 && this.py < 5 && this.px > 280 && this.px < 290) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 280 && this.px < 290 && this.py > 320 && this.py < 330) {
            this.dirx = -1;
            this.diry = 0;
        }

        if (this.py > 320 && this.py < 330 && this.px > 155 && this.px < 165) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 155 && this.px < 165 && this.py > 575 && this.py < 585) {
            this.dirx = 1;
            this.diry = 0;
        }

        if (this.py > 575 && this.py < 585 && this.px > 710 && this.px < 720) {
            this.dirx = 0;
            this.diry = -1;
        }

        if (this.px > 710 && this.px < 720 && this.py > 462 && this.py < 472) {
            this.dirx = -1;
            this.diry = 0;
        }

        if (this.py > 462 && this.py < 472 && this.px > 390 && this.px < 400) {
            this.dirx = 0;
            this.diry = -1;
        }

        if (this.px > 390 && this.px < 400 && this.py > 305 && this.py < 315) {
            this.dirx = 1;
            this.diry = 0;
        }

        if (this.py > 305 && this.py < 315 && this.px > 717 && this.px < 727) {
            this.dirx = 0;
            this.diry = -1;
        }
    }

    controle_bordas() {
        if (fase <= 5) {
            this.controleBordasFase01();
        }

        if (fase >= 6 && fase <= 10) {
            this.controleBordasFase06();
        }
    }

    controlar() {
        this.controle_bordas()
        this.px += this.dirx * this.vel;
        this.py += this.diry * this.vel;
        this.eu.setAttribute("style", `left:${this.px}px;top:${this.py}px;
        width:${this.tamx}px;height:${this.tamy}px;background-color:${this.cor};`);
        if (this.px > (window.innerWidth - 250) || this.py > window.innerHeight
            || this.py < 0 - this.tamy || this.px < 0 - this.tamx ) {
            this.remover()
        }
    }

    remover() {
        clearInterval(this.controle);
        this.eu.remove();
    }
}

const imagemFases = () => {
    if (fase <= 5) {
        document.body.style.setProperty(
            "--fundo",
            "url('./imagens/background-mapa01.jpeg')"
        );
    }

    if (fase >= 6 && fase <= 10) {
        document.body.style.setProperty(
            "--fundo",
            "url('./imagens/background-mapa02.jpeg')"
        );
    }

    if (fase >= 11 && fase <= 15) {
        document.body.style.setProperty(
            "--fundo",
            "url('./imagens/background-mapa03.jpeg')"
        );
    }

    if (fase >= 16 && fase <= 20) {
        document.body.style.setProperty(
            "--fundo",
            "url('./imagens/background-mapa04.jpeg')"
        );
    }
}

imagemFases();

let balao1 = null;

botao.addEventListener("click", () => {
    balao1 = new Baloes(1);
})

function selecionarBotao(botao) {
    const jaSelecionado = botao.classList.contains("selecionado");

    // Remove a seleção de todos
    document.querySelectorAll(".selecionado").forEach((elemento) => {
        elemento.classList.remove("selecionado");
    });

    // Se ele NÃO estava selecionado, seleciona
    if (!jaSelecionado) {
        botao.classList.add("selecionado");
    }
}

arma1.addEventListener("click", () => selecionarBotao(arma1));
arma2.addEventListener("click", () => selecionarBotao(arma2));
arma3.addEventListener("click", () => selecionarBotao(arma3));
arma4.addEventListener("click", () => selecionarBotao(arma4));
arma5.addEventListener("click", () => selecionarBotao(arma5));
arma6.addEventListener("click", () => selecionarBotao(arma6));

const detectarClique = (event, cor) => {
    const x = event.clientX;
    const y = event.clientY;

    if (!colidiu(x, y)) {
        atirador1 = new Atirador(x, y, cor);
    }
};

document.addEventListener("click", (event) => {
    const x = event.clientX;
    const y = event.clientY;

    botao2.innerHTML = "X: " + x + " Y: " + y;
});

document.addEventListener("click", (event) => {
    const selecionado = document.querySelector(".selecionado");
    if (selecionado) {
        const cor = getComputedStyle(selecionado).backgroundColor;
        detectarClique(event, cor);
    }
})

const obsFase01 = () => {
    const obstaculo1 = {
        xMin: 0,
        xMax: 388,
        yMin: 30,
        yMax: 81
    }

    const obstaculo2 = {
        xMin: 336,
        xMax: 388,
        yMin: 30,
        yMax: 267
    }

    const obstaculo3 = {
        xMin: 336,
        xMax: 711,
        yMin: 215,
        yMax: 267
    }

    const obstaculo4 = {
        xMin: 658,
        xMax: 711,
        yMin: 214,
        yMax: 430
    }

    const obstaculo5 = {
        xMin: 226,
        xMax: 711,
        yMin: 380,
        yMax: 430
    }

    const obstaculo6 = {
        xMin: 226,
        xMax: 280,
        yMin: 381,
        yMax: 592
    }

    const obstaculo7 = {
        xMin: 0,
        xMax: 280,
        yMin: 539,
        yMax: 593
    }

    const obstaculo8 = {
        xMin: 1146,
        xMax: 1395,
        yMin: 0,
        yMax: 690
    }

    const obstaculo9 = {
        xMin: 0,
        xMax: 220,
        yMin: 112,
        yMax: 381
    }


    const obstaculos = [
        obstaculo1,
        obstaculo2,
        obstaculo3,
        obstaculo4,
        obstaculo5,
        obstaculo6,
        obstaculo7,
        obstaculo8,
        obstaculo9
    ];

    return obstaculos;
}

const obsFase06 = () => {
    const obstaculo1 = {
        xMin: 0,
        xMax: 160,
        yMin: 260,
        yMax: 311
    }

    const obstaculo2 = {
        xMin: 108,
        xMax: 159,
        yMin: 0,
        yMax: 311
    }

    const obstaculo3 = {
        xMin: 125,
        xMax: 332,
        yMin: 0,
        yMax: 51
    }

    const obstaculo4 = {
        xMin: 271,
        xMax: 323,
        yMin: 0,
        yMax: 368
    }

    const obstaculo5 = {
        xMin: 155,
        xMax: 323,
        yMin: 316,
        yMax: 368
    }

    const obstaculo6 = {
        xMin: 155,
        xMax: 208,
        yMin: 318,
        yMax: 623
    }

    const obstaculo7 = {
        xMin: 155,
        xMax: 751,
        yMin: 573,
        yMax: 623
    }

    const obstaculo8 = {
        xMin: 700,
        xMax: 752,
        yMin: 468,
        yMax: 624
    }

    const obstaculo9 = {
        xMin: 394,
        xMax: 752,
        yMin: 468,
        yMax: 519
    }

    const obstaculo10 = {
        xMin: 394,
        xMax: 445,
        yMin: 306,
        yMax: 519
    }

    const obstaculo11 = {
        xMin: 395,
        xMax: 760,
        yMin: 307,
        yMax: 360
    }

    const obstaculo12 = {
        xMin: 708,
        xMax: 760,
        yMin: 0,
        yMax: 360
    }

    const obstaculo13 = {
        xMin: 1146,
        xMax: 1395,
        yMin: 0,
        yMax: 690
    }

    const obstaculo14 = {
        xMin: 208,
        xMax: 325,
        yMin: 467,
        yMax: 572
    }

    const obstaculo15 = {
        xMin: 56,
        xMax: 108,
        yMin: 160,
        yMax: 260
    }

     const obstaculo16 = {
        xMin: 632,
        xMax: 708,
        yMin: 195,
        yMax: 307
    }

     const obstaculos = [
        obstaculo1,
        obstaculo2,
        obstaculo3,
        obstaculo4,
        obstaculo5,
        obstaculo6,
        obstaculo7,
        obstaculo8,
        obstaculo9,
        obstaculo10,
        obstaculo11,
        obstaculo12,
        obstaculo13,
        obstaculo14,
        obstaculo15,
        obstaculo16
    ];

    return obstaculos;
}

const colidiu = (x, y) => {
    let obstaculos;
    if(fase <= 5) {
        obstaculos = obsFase01()
    }
    else if(fase >= 6 && fase <= 10) {
        obstaculos = obsFase06()
    }
    for (let i = 0; i < obstaculos.length; i++) {
        const obstaculo = obstaculos[i];

        if (
            x >= obstaculo.xMin &&
            x <= obstaculo.xMax &&
            y >= obstaculo.yMin &&
            y <= obstaculo.yMax
        ) {
            return true;
        }
    }

    for (let i = 0; i < personagemColide.length; i++) {
        const obstaculo = personagemColide[i];

        if (
            x >= obstaculo.xMin &&
            x <= obstaculo.xMax &&
            y >= obstaculo.yMin &&
            y <= obstaculo.yMax
        ) {
            return true;
        }
    }

    return false;
};

setInterval(() => {
    const baloesNoRange = atiradores.some((atirador) => {
        return atirador.verificarBaloes(baloes);
    });
    // botao2.innerHTML = baloesNoRange;
}, 1000)

//=====REMOVI O CODIGO DE VERIFICAR BALOES==============