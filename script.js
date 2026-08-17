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

class Personagem {
    constructor(px, py) {
        this.px = px;
        this.py = py;
    }
}

class Atirador extends Personagem {
    constructor(px, py, cor) {
        super(px, py);
        this.range = 20;
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
        this.py = 46;
        this.dirx = 1;
        this.diry = 0;
        this.id = Date.now() + "_" + Math.floor(Math.random() * 1000000000);
        this.desenhar();
        this.controle = setInterval(() => this.controlar(), 10);
        this.eu = document.getElementById(this.id);
    }

    desenhar() {
        const div = document.createElement("div");
        div.setAttribute("id", this.id);
        div.setAttribute("class", "balao");
        div.setAttribute("style", `left:${this.px}px;top:${this.py}px;
        width:${this.tamx}px;height:${this.tamy}px;background-color:${this.cor};`);
        body.appendChild(div);
    }

    controle_bordas() {
        if (this.py > 36 && this.py < 56 && this.px > 350 && this.px < 360) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 340 && this.px < 360 && this.py > 223 && this.py < 230) {
            this.dirx = 1;
            this.diry = 0;
        }

        if (this.py > 210 && this.py < 230 && this.px > 660 && this.px < 670) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 647 && this.px < 667 && this.py > 380 && this.py < 390) {
            this.dirx = -1;
            this.diry = 0;
        }

        if (this.py > 380 && this.py < 390 && this.px > 240 && this.px < 250) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 240 && this.px < 250 && this.py > 537 && this.py < 547) {
            this.dirx = -1;
            this.diry = 0;
        }
    }

    controlar() {
        this.controle_bordas()
        this.px += this.dirx * this.vel;
        this.py += this.diry * this.vel;
        this.eu.setAttribute("style", `left:${this.px}px;top:${this.py}px;
        width:${this.tamx}px;height:${this.tamy}px;background-color:${this.cor};`);
        if (this.px > (window.innerWidth - 250) || this.py > window.innerHeight
            || this.py < 0 || (this.px < 0 - this.tamx && this.py > 500)) {
            this.remover()
        }
    }

    remover() {
        clearInterval(this.controle);
        this.eu.remove();
    }
}

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

    // if (botao.classList.contains("selecionado")) {
    //     document.addEventListener("click", (event)=>{
    //         detectarClique(event, cor)})
    // }
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
        botao2.innerHTML = "X: " + x + " Y: " + y;
        const atirador1 = new Atirador(x, y, cor);
    }
};

document.addEventListener("click", (event) => {
    const selecionado = document.querySelector(".selecionado");
    if (selecionado) {
        const cor = getComputedStyle(selecionado).backgroundColor;
        detectarClique(event, cor);
    }
})

const obstaculo1 = {
    xMin: 0,
    xMax: 396,
    yMin: 43,
    yMax: 90
}

const obstaculo2 = {
    xMin: 345,
    xMax: 396,
    yMin: 43,
    yMax: 270
}

const obstaculo3 = {
    xMin: 345,
    xMax: 396,
    yMin: 220,
    yMax: 272
}

const obstaculo4 = {
    xMin: 345,
    xMax: 706,
    yMin: 220,
    yMax: 272
}

const obstaculo5 = {
    xMin: 654,
    xMax: 706,
    yMin: 220,
    yMax: 427
}

const obstaculo6 = {
    xMin: 240,
    xMax: 291,
    yMin: 378,
    yMax: 582
}

const obstaculo7 = {
    xMin: 0,
    xMax: 291,
    yMin: 533,
    yMax: 582
}

const obstaculo8 = {
    xMin: 1122,
    xMax: 1395,
    yMin: 0,
    yMax: 700
}

const obstaculos = [
    obstaculo1,
    obstaculo2,
    obstaculo3,
    obstaculo4,
    obstaculo5,
    obstaculo6,
    obstaculo7,
    obstaculo8
];

const colidiu = (x, y) => {
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