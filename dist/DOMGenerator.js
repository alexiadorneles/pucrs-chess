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
        var elementos = [];
        for (var linha = 0; linha < linhas; linha++) {
            for (var coluna = 0; coluna < colunas; coluna++) {
                var item = this.tabuleiro.getItem(linha, coluna);
                var elemento = this.criarElemento(item);
                item.atribuirElemento(elemento);
                elementos.push(elemento);
            }
        }
        elementos.forEach(function (elemento) { return root.appendChild(elemento); });
    };
    DOMGenerator.prototype.criarElemento = function (item) {
        var div = document.createElement('div');
        var quadrado = document.createElement('span');
        quadrado.setAttribute('class', "fas fa-square-full xadrez-quadrado-" + item.getCor());
        var iconePeca = this.criarIconePeca(item.getPeca());
        quadrado.appendChild(iconePeca);
        div.appendChild(quadrado);
        return div;
    };
    DOMGenerator.prototype.criarIconePeca = function (peca) {
        var tipoPeca = peca && peca.getTipo() || '';
        var corPeca = peca && peca.getCor() || '';
        var iconePeca = document.createElement('i');
        iconePeca.setAttribute('class', "fas fa-" + tipoPeca + " peca-" + corPeca);
        return iconePeca;
    };
    return DOMGenerator;
}());
exports.DOMGenerator = DOMGenerator;
