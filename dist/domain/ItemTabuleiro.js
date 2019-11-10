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
