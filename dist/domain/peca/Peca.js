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
