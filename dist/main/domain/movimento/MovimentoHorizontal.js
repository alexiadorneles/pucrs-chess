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
var MovimentoHorizontal = (function (_super) {
    __extends(MovimentoHorizontal, _super);
    function MovimentoHorizontal() {
        var _this = _super.call(this, 0) || this;
        _this.offsetMovimentos = [{ coluna: 1, linha: 0 }];
        return _this;
    }
    MovimentoHorizontal.prototype.simularMovimento = function (_a, peca) {
        var linha = _a.linha, coluna = _a.coluna;
        var isPosicaoOcupada = false;
        var offset = coluna + 1;
        var posicoes = [];
        var tabuleiro = peca.getTabuleiro();
        while (!isPosicaoOcupada) {
            var proximaPosicao = { linha: linha, coluna: offset };
            isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao);
            if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
                posicoes.push(proximaPosicao);
            }
            if (offset >= 7)
                break;
            else
                offset = offset + 1;
        }
        isPosicaoOcupada = false;
        offset = coluna - 1;
        while (!isPosicaoOcupada) {
            var proximaPosicao = { linha: linha, coluna: offset };
            isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao);
            if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
                posicoes.push(proximaPosicao);
            }
            if (offset <= 0)
                break;
            else
                offset = offset - 1;
        }
        return posicoes;
    };
    return MovimentoHorizontal;
}(Movimento_1.Movimento));
exports.MovimentoHorizontal = MovimentoHorizontal;
