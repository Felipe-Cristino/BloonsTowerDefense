const body = document.body;
const botao = document.getElementById("botao");

class Personagem {
    constructor(px, py) {
        this.px = px;
        this.py = py;
    }
}

class Atirador extends Personagem {
    constructor(px, py, range, velAtaque) {
        super(px, py);
        this.range = range;
        this.velAtaque = velAtaque;
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
        if(this.py > 36 && this.py < 56 && this.px > 350 && this.px < 360) {
            this.dirx = 0;
            this.diry = 1;
        }

        if(this.px > 340 && this.px < 360 && this.py > 223 && this.py < 230) {
            this.dirx = 1;
            this.diry = 0;
        }

        if(this.py > 210 && this.py < 230 && this.px > 660 && this.px < 670) {
            this.dirx = 0;
            this.diry = 1;
        }

        if(this.px > 647 && this.px < 667 && this.py > 380 && this.py < 390) {
            this.dirx = -1;
            this.diry = 0;
        }

        if(this.py > 380 && this.py < 390 && this.px > 240 && this.px < 250) {
            this.dirx = 0;
            this.diry = 1;
        }

        if(this.px > 240 && this.px < 250 && this.py > 537 && this.py < 547) {
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
            if(this.px > (window.innerWidth - 250) || this.py > window.innerHeight
            || this.py < 0 || (this.px < 0 && this.py > 500)) {
                this.remover()
            }
        //CODIGO ACIMA DUVIDOSO(this.py > 500)=================
    }

    remover() {
        clearInterval(this.controle);
        this.eu.remove();
    }
}

let balao1 = null;

botao.addEventListener("click", ()=>{
    balao1 = new Baloes(1);
})
