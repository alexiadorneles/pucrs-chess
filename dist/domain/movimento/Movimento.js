"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Movimento = (function () {
    function Movimento(tipo) {
        this.tipo = tipo;
    }
    Movimento.prototype.simularMovimento = function (posicaoAtual, podeIrPraTras) {
        var _this = this;
        var novasPosicoesFrente = this.offsetMovimentos.map(function (offset) { return _this.aplicarOffsetParaFrente(offset, posicaoAtual); });
        var novasPosicoesTras = this.offsetMovimentos.map(function (offset) { return _this.aplicarOffsetParaTras(offset, posicaoAtual); });
        return podeIrPraTras ? novasPosicoesFrente.concat(novasPosicoesTras) : novasPosicoesFrente;
    };
    Movimento.prototype.aplicarOffsetParaFrente = function (offset, posicao) {
        var novaPosicao = __assign({}, posicao);
        novaPosicao.coluna = posicao.coluna + offset.coluna;
        novaPosicao.linha = posicao.linha + offset.linha;
        return novaPosicao;
    };
    Movimento.prototype.aplicarOffsetParaTras = function (offset, posicao) {
        var novaPosicao = __assign({}, posicao);
        novaPosicao.coluna = posicao.coluna - offset.coluna;
        novaPosicao.linha = posicao.linha - offset.linha;
        return novaPosicao;
    };
    return Movimento;
}());
exports.Movimento = Movimento;
