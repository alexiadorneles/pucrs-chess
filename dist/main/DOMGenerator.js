"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DOMGenerator = (function () {
    function DOMGenerator() {
    }
    DOMGenerator.prototype.injetarTabuleiro = function (tabuleiro) {
        this.tabuleiro = tabuleiro;
    };
    DOMGenerator.prototype.getTabuleiro = function () {
        return this.tabuleiro;
    };
    DOMGenerator.getInstance = function () {
        if (!DOMGenerator.instance) {
            DOMGenerator.instance = new DOMGenerator();
        }
        return DOMGenerator.instance;
    };
    DOMGenerator.prototype.refresh = function () {
        var root = document.getElementById('root');
        root.innerHTML = '';
        var linhas = 8;
        var colunas = 8;
        var elementosLinha = [];
        var elementosColuna = [];
        var _loop_1 = function (linha) {
            elementosColuna = [];
            for (var coluna = 0; coluna < colunas; coluna++) {
                var item = this_1.tabuleiro.getItem({ linha: linha, coluna: coluna });
                var elemento = this_1.criarElemento(item);
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
        quadrado.addEventListener('click', item.onClick);
        item.atribuirElemento(quadrado);
        var iconePeca = this.criarIconePeca(item.getPeca());
        iconePeca.addEventListener('click', item.onClick);
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
