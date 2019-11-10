(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOMGenerator = (function () {
    function DOMGenerator(tabuleiro) {
        this.tabuleiro = tabuleiro;
    }
    DOMGenerator.prototype.generate = function () {
        var root = document.getElementById('root');
        var linhas = 8;
        var colunas = 8;
        var elementosLinha = [];
        var elementosColuna = [];
        var _loop_1 = function (linha) {
            elementosColuna = [];
            for (var coluna = 0; coluna < colunas; coluna++) {
                var item = this_1.tabuleiro.getItem(linha, coluna);
                var elemento = this_1.criarElemento(item);
                item.atribuirElemento(elemento);
                elementosColuna.push(elemento);
            }
            var elementoLinha = document.createElement('div');
            elementoLinha.setAttribute('class', 'xadrez-linha');
            elementosColuna.forEach((function (elementoColuna) { return elementoLinha.appendChild(elementoColuna); }));
            elementosLinha.push(elementoLinha);
        };
        var this_1 = this;
        for (var linha = 0; linha < linhas; linha++) {
            _loop_1(linha);
        }
        elementosLinha.forEach(function (elemento) { return root.appendChild(elemento); });
    };
    DOMGenerator.prototype.criarElemento = function (item) {
        var div = document.createElement('div');
        div.setAttribute('class', 'container');
        var quadrado = document.createElement('span');
        quadrado.setAttribute('class', "fas fa-square-full xadrez-quadrado " + item.getCor());
        var iconePeca = this.criarIconePeca(item.getPeca());
        div.appendChild(iconePeca);
        div.appendChild(quadrado);
        return div;
    };
    DOMGenerator.prototype.criarIconePeca = function (peca) {
        var tipoPeca = peca && peca.getTipo() || '';
        var corPeca = peca && peca.getCor() || '';
        var iconePeca = document.createElement('i');
        iconePeca.setAttribute('class', "fas fa-" + tipoPeca + " peca " + corPeca);
        return iconePeca;
    };
    return DOMGenerator;
}());
exports.DOMGenerator = DOMGenerator;

},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemTabuleiro = (function () {
    function ItemTabuleiro(linha, coluna, cor) {
        this.linha = linha;
        this.coluna = coluna;
        this.cor = cor;
    }
    ItemTabuleiro.prototype.adicionarPeca = function (peca) {
        this.peca = peca;
        this.peca.adicionarAoItem(this);
    };
    ItemTabuleiro.prototype.atribuirElemento = function (elemento) {
        this.elemento = elemento;
    };
    ItemTabuleiro.prototype.getCor = function () {
        return this.cor;
    };
    ItemTabuleiro.prototype.getPeca = function () {
        return this.peca;
    };
    return ItemTabuleiro;
}());
exports.ItemTabuleiro = ItemTabuleiro;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemTabuleiro_1 = require("./ItemTabuleiro");
var Peoes_1 = require("./peca/Peoes");
var MovimentoVertical_1 = require("./movimento/MovimentoVertical");
var initilizarMatriz = function () {
    var itens = [];
    itens[0] = [];
    itens[1] = [];
    itens[2] = [];
    itens[3] = [];
    itens[4] = [];
    itens[5] = [];
    itens[6] = [];
    itens[7] = [];
    return itens;
};
var Tabuleiro = (function () {
    function Tabuleiro() {
        this.posicoes = initilizarMatriz();
    }
    Tabuleiro.prototype.gerarTabuleiroInicial = function () {
        var peoesBrancos = this.instanciarPeoes("white");
        for (var linha_1 = 0; linha_1 < 8; linha_1++) {
            var cor = linha_1 % 2 === 0 ? "green" : "black";
            var pares = cor;
            var impares = cor == "green" ? "black" : "green";
            this.posicoes[linha_1][0] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, pares);
            this.posicoes[linha_1][1] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, impares);
            this.posicoes[linha_1][2] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, pares);
            this.posicoes[linha_1][3] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, impares);
            this.posicoes[linha_1][4] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, pares);
            this.posicoes[linha_1][5] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, impares);
            this.posicoes[linha_1][6] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, pares);
            this.posicoes[linha_1][7] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, impares);
        }
        var linha = 1;
        for (var coluna = 0; coluna < 8; coluna++) {
            var pares = "black";
            var impares = "green";
            var cor = coluna % 2 === 0 ? pares : impares;
            var item = new ItemTabuleiro_1.ItemTabuleiro(linha, coluna, cor);
            item.adicionarPeca(peoesBrancos[coluna]);
            this.posicoes[linha][coluna] = item;
        }
    };
    Tabuleiro.prototype.getItem = function (linha, coluna) {
        return this.posicoes[linha][coluna];
    };
    Tabuleiro.prototype.instanciarPeoes = function (cor) {
        var peoes = [];
        var movimentos = [new MovimentoVertical_1.MovimentoVertical()];
        for (var i = 0; i < 8; i++) {
            var peao = new Peoes_1.Peao(cor, movimentos);
            peoes.push(peao);
        }
        return peoes;
    };
    return Tabuleiro;
}());
exports.Tabuleiro = Tabuleiro;

},{"./ItemTabuleiro":2,"./movimento/MovimentoVertical":5,"./peca/Peoes":7}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Movimento = (function () {
    function Movimento(tipo) {
        this.tipo = tipo;
    }
    return Movimento;
}());
exports.Movimento = Movimento;

},{}],5:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Movimento_1 = require("./Movimento");
var MovimentoVertical = (function (_super) {
    __extends(MovimentoVertical, _super);
    function MovimentoVertical() {
        return _super.call(this, 1) || this;
    }
    MovimentoVertical.offsetMovimentos = [{ coluna: 1, linha: 0 }];
    return MovimentoVertical;
}(Movimento_1.Movimento));
exports.MovimentoVertical = MovimentoVertical;

},{"./Movimento":4}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Peca = (function () {
    function Peca(tipo, cor, movimentos) {
        this.tipo = tipo;
        this.cor = cor;
        this.movimentos = movimentos;
    }
    Peca.prototype.adicionarAoItem = function (item) {
        this.itemTabuleiro = item;
    };
    Peca.prototype.getCor = function () {
        return this.cor;
    };
    Peca.prototype.getTipo = function () {
        return this.tipo;
    };
    return Peca;
}());
exports.Peca = Peca;

},{}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Peca_1 = require("./Peca");
var Peao = (function (_super) {
    __extends(Peao, _super);
    function Peao(cor, movimentos) {
        return _super.call(this, "chess-pawn", cor, movimentos) || this;
    }
    return Peao;
}(Peca_1.Peca));
exports.Peao = Peao;

},{"./Peca":6}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOMGenerator_1 = require("./DOMGenerator");
var Tabuleiro_1 = require("./domain/Tabuleiro");
var tabuleiro = new Tabuleiro_1.Tabuleiro();
tabuleiro.gerarTabuleiroInicial();
new DOMGenerator_1.DOMGenerator(tabuleiro).generate();

},{"./DOMGenerator":1,"./domain/Tabuleiro":3}]},{},[8]);
