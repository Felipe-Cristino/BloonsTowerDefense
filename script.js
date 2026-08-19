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
let fase = 16;

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
        if (fase <= 5) {
            this.px = 0;
            this.py = 35;
            this.dirx = 1;
            this.diry = 0;
        }
        else if (fase >= 6 && fase <= 10) {
            this.px = 0;
            this.py = 264;
            this.dirx = 1;
            this.diry = 0;
        }
        else if (fase >= 11 && fase <= 15) {
            this.px = 163;
            this.py = 668;
            this.dirx = 0;
            this.diry = -1;
        }
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

    controleBordasMapa01() {
        if (this.py > 30 && this.py < 40 && this.px > 365 && this.px < 375) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 365 && this.px < 375 && this.py > 221 && this.py < 231) {
            this.dirx = 1;
            this.diry = 0;
        }

        if (this.py > 210 && this.py < 230 && this.px > 690 && this.px < 700) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 690 && this.px < 700 && this.py > 382 && this.py < 392) {
            this.dirx = -1;
            this.diry = 0;
        }

        if (this.py > 382 && this.py < 392 && this.px > 247 && this.px < 257) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 247 && this.px < 257 && this.py > 545 && this.py < 555) {
            this.dirx = -1;
            this.diry = 0;
        }
    }

    controleBordasMapa02() {
        if (this.py > 259 && this.py < 269 && this.px > 138 && this.px < 148) {
            this.dirx = 0;
            this.diry = -1;
        }

        if (this.px > 138 && this.px < 148 && this.py > -5 && this.py < 5) {
            this.dirx = 1;
            this.diry = 0;
        }

        if (this.py > -5 && this.py < 5 && this.px > 300 && this.px < 310) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 300 && this.px < 310 && this.py > 320 && this.py < 330) {
            this.dirx = -1;
            this.diry = 0;
        }

        if (this.py > 320 && this.py < 330 && this.px > 178 && this.px < 188) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 178 && this.px < 188 && this.py > 575 && this.py < 585) {
            this.dirx = 1;
            this.diry = 0;
        }

        if (this.py > 575 && this.py < 585 && this.px > 730 && this.px < 740) {
            this.dirx = 0;
            this.diry = -1;
        }

        if (this.px > 730 && this.px < 740 && this.py > 462 && this.py < 472) {
            this.dirx = -1;
            this.diry = 0;
        }

        if (this.py > 462 && this.py < 472 && this.px > 416 && this.px < 426) {
            this.dirx = 0;
            this.diry = -1;
        }

        if (this.px > 416 && this.px < 426 && this.py > 305 && this.py < 315) {
            this.dirx = 1;
            this.diry = 0;
        }

        if (this.py > 305 && this.py < 315 && this.px > 737 && this.px < 747) {
            this.dirx = 0;
            this.diry = -1;
        }
    }

    controleBordasMapa03() {
        if (this.px > 158 && this.px < 168 && this.py > 515 && this.py < 525) {
            this.dirx = 1;
            this.diry = 0;
        }

        if (this.py > 515 && this.py < 525 && this.px > 426 && this.px < 436) {
            this.dirx = 0;
            this.diry = -1;
        }

        if (this.px > 426 && this.px < 436 && this.py > 355 && this.py < 365) {
            this.dirx = -1;
            this.diry = 0;
        }

        if (this.py > 355 && this.py < 365 && this.px > 53 && this.px < 63) {
            this.dirx = 0;
            this.diry = -1;
        }

        if (this.px > 53 && this.px < 63 && this.py > 63 && this.py < 73) {
            this.dirx = 1;
            this.diry = 0;
        }

        if (this.py > 63 && this.py < 73 && this.px > 926 && this.px < 936) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 926 && this.px < 936 && this.py > 253 && this.py < 263) {
            this.dirx = -1;
            this.diry = 0;
        }

        if (this.py > 253 && this.py < 263 && this.px > 553 && this.px < 563) {
            this.dirx = 0;
            this.diry = 1;
        }

        if (this.px > 553 && this.px < 563 && this.py > 473 && this.py < 483) {
            this.dirx = 1;
            this.diry = 0;
        }

        if (this.py > 473 && this.py < 483 && this.px > 924 && this.px < 934) {
            this.dirx = 0;
            this.diry = 1;
        }
    }

    controle_bordas() {
        if (fase <= 5) {
            this.controleBordasMapa01();
        }

        if (fase >= 6 && fase <= 10) {
            this.controleBordasMapa02();
        }

        if (fase >= 11 && fase <= 15) {
            this.controleBordasMapa03();
        }
    }

    controlar() {
        this.controle_bordas()
        this.px += this.dirx * this.vel;
        this.py += this.diry * this.vel;
        this.eu.setAttribute("style", `left:${this.px}px;top:${this.py}px;
        width:${this.tamx}px;height:${this.tamy}px;background-color:${this.cor};`);
        if (this.px > (window.innerWidth - 250) || this.py > window.innerHeight
            || this.py < 0 - this.tamy || this.px < 0 - this.tamx) {
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

    if (fase >= 21 && fase <= 25) {
        document.body.style.setProperty(
            "--fundo",
            "url('./imagens/background-mapa05.jpeg')"
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

const obsMapa01 = () => {
    const obstaculo1 = {
        xMin: 0,
        xMax: 411,
        yMin: 30,
        yMax: 81
    }

    const obstaculo2 = {
        xMin: 359,
        xMax: 411,
        yMin: 30,
        yMax: 267
    }

    const obstaculo3 = {
        xMin: 359,
        xMax: 734,
        yMin: 215,
        yMax: 267
    }

    const obstaculo4 = {
        xMin: 680,
        xMax: 734,
        yMin: 214,
        yMax: 430
    }

    const obstaculo5 = {
        xMin: 250,
        xMax: 734,
        yMin: 380,
        yMax: 430
    }

    const obstaculo6 = {
        xMin: 250,
        xMax: 303,
        yMin: 381,
        yMax: 592
    }

    const obstaculo7 = {
        xMin: 0,
        xMax: 303,
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
        xMax: 242,
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

const obsMapa02 = () => {
    const obstaculo1 = {
        xMin: 0,
        xMax: 182,
        yMin: 260,
        yMax: 311
    }

    const obstaculo2 = {
        xMin: 130,
        xMax: 182,
        yMin: 0,
        yMax: 311
    }

    const obstaculo3 = {
        xMin: 130,
        xMax: 346,
        yMin: 0,
        yMax: 51
    }

    const obstaculo4 = {
        xMin: 294,
        xMax: 346,
        yMin: 0,
        yMax: 368
    }

    const obstaculo5 = {
        xMin: 178,
        xMax: 346,
        yMin: 316,
        yMax: 368
    }

    const obstaculo6 = {
        xMin: 178,
        xMax: 232,
        yMin: 318,
        yMax: 623
    }

    const obstaculo7 = {
        xMin: 178,
        xMax: 774,
        yMin: 573,
        yMax: 623
    }

    const obstaculo8 = {
        xMin: 723,
        xMax: 774,
        yMin: 468,
        yMax: 624
    }

    const obstaculo9 = {
        xMin: 417,
        xMax: 774,
        yMin: 468,
        yMax: 519
    }

    const obstaculo10 = {
        xMin: 417,
        xMax: 468,
        yMin: 306,
        yMax: 519
    }

    const obstaculo11 = {
        xMin: 417,
        xMax: 783,
        yMin: 307,
        yMax: 360
    }

    const obstaculo12 = {
        xMin: 732,
        xMax: 783,
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
        xMin: 232,
        xMax: 348,
        yMin: 467,
        yMax: 572
    }

    const obstaculo15 = {
        xMin: 77,
        xMax: 130,
        yMin: 160,
        yMax: 260
    }

    const obstaculo16 = {
        xMin: 656,
        xMax: 731,
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

const obsMapa03 = () => {
    
    const obstaculo1 = {
        xMin: 154,
        xMax: 208,
        yMin: 520,
        yMax: 668
    }

    const obstaculo2 = {
        xMin: 154,
        xMax: 472,
        yMin: 520,
        yMax: 574
    }

    const obstaculo3 = {
        xMin: 418,
        xMax: 472,
        yMin: 358,
        yMax: 574
    }

    const obstaculo4 = {
        xMin: 55,
        xMax: 472,
        yMin: 358,
        yMax: 410
    }

    const obstaculo5 = {
        xMin: 55,
        xMax: 108,
        yMin: 67,
        yMax: 410
    }

    const obstaculo6 = {
        xMin: 55,
        xMax: 972,
        yMin: 67,
        yMax: 119
    }

    const obstaculo7 = {
        xMin: 919,
        xMax: 972,
        yMin: 65,
        yMax: 302
    }

    const obstaculo8 = {
        xMin: 554,
        xMax: 972,
        yMin: 249,
        yMax: 302
    }

    const obstaculo9 = {
        xMin: 554,
        xMax: 607,
        yMin: 249,
        yMax: 520
    }

    const obstaculo10 = {
        xMin: 554,
        xMax: 970,
        yMin: 467,
        yMax: 520
    }

    const obstaculo11 = {
        xMin: 916,
        xMax: 970,
        yMin: 467,
        yMax: 668
    }

    const obstaculo12 = {
        xMin: 1146,
        xMax: 1395,
        yMin: 0,
        yMax: 690
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
        obstaculo12
    ];

    return obstaculos;
}

const colidiu = (x, y) => {
    let obstaculos;
    if (fase <= 5) {
        obstaculos = obsMapa01()
    }
    else if (fase >= 6 && fase <= 10) {
        obstaculos = obsMapa02()
    }
    else if (fase >= 11 && fase <= 15) {
        obstaculos = obsMapa03()
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