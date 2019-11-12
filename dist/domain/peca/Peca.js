"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Peca = (function () {
    function Peca(tipo, cor, movimentos, vaiPraTras) {
        this.tipo = tipo;
        this.cor = cor;
        this.movimentos = movimentos;
        this.vaiPraTras = vaiPraTras;
    }
    Peca.prototype.mover = function () {
        var _this = this;
        var posicaoPeca = this.itemTabuleiro.getPosicao();
        return this.movimentos
            .map(function (movimento) { return movimento.simularMovimento(posicaoPeca, _this.vaiPraTras); })
            .reduce(function (aggregation, movimento) { return aggregation.concat(movimento); }, []);
    };
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
