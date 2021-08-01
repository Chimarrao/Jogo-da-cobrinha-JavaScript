/**
 * Carrega a imagem da maça
 */
const maca = new Image();
maca.src = "./images/maca.jpg";

/**
 * Carrega a imagem da cobra com a cabeça para cima
 */
const cobra_cima = new Image();
cobra_cima.src = "./images/cobra_cima.jpg";

/**
 * Carrega a imagem da cobra com a cabeça para baixo
 */
const cobra_baixo = new Image();
cobra_baixo.src = "./images/cobra_baixo.jpg";

/**
 * Carrega a imagem da cobra com a cabeça para a direita
 */
const cobra_direita = new Image();
cobra_direita.src = "./images/cobra_direita.jpg";

/**
 * Carrega a imagem da cobra com a cabeça para a esquerda
 */
const cobra_esquerda = new Image();
cobra_esquerda.src = "./images/cobra_esquerda.jpg";

const cobra_corpo = new Image();
cobra_corpo.src = "./images/cobra_corpo.jpg";

/**
 * Velocidade do jogo
 * Essa variável indica quantos quadros serão passados a cada ciclo de atualização de tela
 */
const velocidade = 1;

/**
 * Variáveis do jogo
 */
let contexto;
let canvas;
let intervalo;

/**
 * Última tecla pressionada
 * Usado para saber qual a imagem da cabeça da cobra será carregada
 */
let ultima_tecla = 0;

/**
 * Velocidade do movimento da cobra para os eixos x, y
 */
let velocidade_x = 0;
let velocidade_y = 0;

/**
 * Ponto de partida da cobra
 */
let ponto_inicial_x = 10;
let ponto_inicial_y = 15;

/**
 * Tamanho de cada bloco da tela
 */
let tamanho_bloco = 30;

/**
 * Quantidade de peças em tela
 * Para um tamanho de bloco 30 e peça 20, a tela ficará em 600x600
 */
let quantidade_pecas = 20;

/**
 * Rastro ou tamanho da cobra
 */
let rastro = [];

/**
 * Tamanho da cauda inicial
 */
let cauda = 3;

/**
 * Pontos iniciais da maça
 */
let maca_x = getXMaca();
let maca_y = getYMaca();

/**
 * Pontuação do jogador
 */
let pontos = 0;

window.onload = function () {
    canvas = document.getElementById("canvas");

    canvas.width = 600;
    canvas.height = 600;

    contexto = canvas.getContext("2d");
    document.addEventListener("keydown", eventoTecla);

    let velocidade = document.getElementById("velocidade").value;
    intervalo = setInterval(jogo, parseInt(velocidade));
}

/** 
 * Altera a taxa de atualização da tela, modificando a velocidade do jogo
 *
 * @param {int} milisegundos         Milisegundos
 * @return {void}
 */
function setVelocidade(milisegundos) {
    clearInterval(intervalo);
    intervalo = setInterval(jogo, parseInt(milisegundos));
}

/**
 * Altera a pontuação do jogador
 * 
 * @param {int} pontos              Pontos
 * @return {void}
 */
function setPontacao(pontos) {
    pontos = parseInt(pontos);
    document.getElementById("pontuacao").innerHTML = `Pontuação: ${pontos} pontos`;
}

/**
 * Trata os eventos de entrada do usuário
 * 
 * @param {string} event            Tipo do evento
 * @returns {void}
 */
function eventoTecla(event) {
    let codigo_tecla = event.keyCode;
    ultima_tecla = codigo_tecla;

    /**
     * Tecla esquerda
     */
    if (codigo_tecla == 37) {
        velocidade_x = -velocidade;
        velocidade_y = 0;
    }

    /**
     * Tecla para cima
     */
    else if (codigo_tecla == 38) {
        velocidade_x = 0;
        velocidade_y = -velocidade;
    }

    /**
     * Tecla direita
     */
    else if (codigo_tecla == 39) {
        velocidade_x = velocidade;
        velocidade_y = 0;
    }

    /**
     * Tecla pra baixo
     */
    else if (codigo_tecla == 40) {
        velocidade_x = 0;
        velocidade_y = velocidade;
    }
}

/**
 * Imprime o fundo do canvas de acordo com a cor definida
 * 
 * @return {void}
 */
function imprimeFundo() {
    contexto.fillStyle = "#d0f2fb";
    contexto.fillRect(0, 0, canvas.width, canvas.height);
}

/**
 * Imprime a maça de acordo com a posição já sorteada
 * 
 * @return {void}
 */
function imprimeMaca() {
    contexto.fillStyle = "#ff5c5b";
    contexto.drawImage(maca, maca_x * tamanho_bloco, maca_y * tamanho_bloco, 30, 30);
}

/**
 * Executa o jogo
 * 
 * @return {void}
 */
function jogo() {
    /**
     * Soma os pontos x, y. Ou seja continua o movimento
     */
    ponto_inicial_x += velocidade_x;
    ponto_inicial_y += velocidade_y;

    /**
     * Determina o ponto x ao qual a cobra será impressa
     */
    if (ponto_inicial_x < 0) {
        ponto_inicial_x = quantidade_pecas - 1;
    }
    if (ponto_inicial_x > quantidade_pecas - 1) {
        ponto_inicial_x = 0;
    }

    /**
     * Determina o ponto y ao qual a cobra será impressa
     */
    if (ponto_inicial_y < 0) {
        ponto_inicial_y = quantidade_pecas - 1;
    }
    if (ponto_inicial_y > quantidade_pecas - 1) {
        ponto_inicial_y = 0;
    }

    imprimeFundo();
    imprimeMaca();

    /**
     * Seta a cor da cobra
     */
    contexto.fillStyle = "#36b729";

    for (let i = 0; i < rastro.length; i++) {
        /**
         * Imprime a cabeça de cobra de acordo com o movimento indicado
         */
        if (i == rastro.length - 1) {
            /**
             * Tecla esquerda
             */
            if (ultima_tecla == 37) {
                imagem = cobra_esquerda;
            }

            /**
             * Tecla para cima
             */
            else if (ultima_tecla == 38) {
                imagem = cobra_cima;
            }

            /**
             * Tecla direita
             */
            else if (ultima_tecla == 39) {
                imagem = cobra_direita;
            }

            /**
             * Tecla pra baixo
             */
            else if (ultima_tecla == 40) {
                imagem = cobra_baixo;
            }

            /**
             * Cima
             */
            else {
                imagem = cobra_cima;
            }

            contexto.drawImage(imagem, rastro[i].x * tamanho_bloco, rastro[i].y * tamanho_bloco, 30, 30);

            /**
             * Imprime o corpo da cobra
             */
        } else {
            /**
             * Imprime a resto do corpo da cobra
             */
            contexto.drawImage(cobra_corpo, rastro[i].x * tamanho_bloco, rastro[i].y * tamanho_bloco, 30, 30);
        }

        /**
         * Se a cobra bater em sí mesmo
         */
        if (rastro[i].x == ponto_inicial_x && rastro[i].y == ponto_inicial_y) {
            reiniciaJogo();
        }
    }

    rastro.push({
        x: ponto_inicial_x,
        y: ponto_inicial_y
    })
    while (rastro.length > cauda) {
        rastro.shift();
    }

    /**
     * Quando a cobra come a maça
     */
    if (maca_x == ponto_inicial_x && maca_y == ponto_inicial_y) {
        comeMaca();
    }
}

/**
 * Aumenta a cauda da cobra quando ela come a maça
 * 
 * @return {void}
 */
function comeMaca() {
    cauda++;
    pontos++;
    setPontacao(pontos);
    maca_x = getXMaca();
    maca_y = getYMaca();
}

/** 
 * Reinicia o jogo
 * 
 * @return {void}
 */
function reiniciaJogo() {
    cauda = 3;
    setPontacao(0);
    velocidade_y = 0;
    velocidade_x = 0;
}

/** 
 * Retorna uma posição no eixo X para a maça ser impressa
 * Essa nova posição não faz colisão com o corpo da cobra atual
 *
 * @return {int}                     Posição X
 */
function getXMaca() {
    let x;

    while (true) {
        colisao = false;
        x = Math.floor(Math.random() * quantidade_pecas)

        if (x == ponto_inicial_x) {
            colisao = true;
        }

        for (let i = 0; i < rastro.length; i++) {
            posicao_cobra = rastro[i].x * tamanho_bloco

            if (x == posicao_cobra) {
                colisao = true;
            }
        }

        if (!colisao) {
            break;
        }
    }

    return x;
}

/** 
 * Retorna uma posição no eixo Y para a maça ser impressa
 * Essa nova posição não faz colisão com o corpo da cobra atual
 *
 * @return {int}                     Posição Y
 */
function getYMaca() {
    let y;

    while (true) {
        colisao = false;
        y = Math.floor(Math.random() * quantidade_pecas)

        if (y == ponto_inicial_y) {
            colisao = true;
        }

        for (let i = 0; i < rastro.length; i++) {
            posicao_cobra = rastro[i].y * tamanho_bloco

            if (y == posicao_cobra) {
                colisao = true;
            }
        }

        if (!colisao) {
            break;
        }
    }

    return y;
}