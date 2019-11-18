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
var ModificadorImpl_1 = require("../ModificadorImpl");
var MovimentoDiagonal = (function (_super) {
    __extends(MovimentoDiagonal, _super);
    function MovimentoDiagonal() {
        var _this = _super.call(this, 2) || this;
        _this.offsetMovimentos = [
            {
                modificadorLinha: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.soma),
                modificadorColuna: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.soma),
            },
            {
                modificadorLinha: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.soma),
                modificadorColuna: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.subtracao),
            },
            {
                modificadorLinha: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.subtracao),
                modificadorColuna: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.subtracao),
            },
            {
                modificadorLinha: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.subtracao),
                modificadorColuna: new ModificadorImpl_1.ModificadorImpl(1, ModificadorImpl_1.ModificadorImpl.soma),
            },
        ];
        return _this;
    }
    MovimentoDiagonal.prototype.simularMovimento = function (_a, peca) {
        var linha = _a.linha, coluna = _a.coluna;
        var isPosicaoOcupada = false;
        var movimentoLinha = linha + 1;
        var movimentoColuna = coluna - 1;
        var posicoes = [];
        var tabuleiro = peca.getTabuleiro();
        while (!isPosicaoOcupada) {
            var proximaPosicao = { linha: movimentoLinha, coluna: movimentoColuna };
            if (!tabuleiro.isPosicaoValida(proximaPosicao))
                break;
            isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao);
            if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
                posicoes.push(proximaPosicao);
            }
            else {
                movimentoLinha = movimentoLinha + 1;
                movimentoColuna = movimentoColuna - 1;
            }
        }
        isPosicaoOcupada = false;
        movimentoLinha = linha - 1;
        movimentoColuna = coluna + 1;
        while (!isPosicaoOcupada) {
            var proximaPosicao = { linha: movimentoLinha, coluna: movimentoColuna };
            if (!tabuleiro.isPosicaoValida(proximaPosicao))
                break;
            isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao);
            if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
                posicoes.push(proximaPosicao);
            }
            if (movimentoLinha <= 0 || movimentoColuna >= 7)
                break;
            else {
                movimentoLinha = movimentoLinha - 1;
                movimentoColuna = movimentoColuna + 1;
            }
        }
        isPosicaoOcupada = false;
        movimentoLinha = linha + 1;
        movimentoColuna = coluna + 1;
        while (!isPosicaoOcupada) {
            var proximaPosicao = { linha: movimentoLinha, coluna: movimentoColuna };
            if (!tabuleiro.isPosicaoValida(proximaPosicao))
                break;
            isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao);
            if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
                posicoes.push(proximaPosicao);
            }
            if (movimentoLinha >= 7 || movimentoColuna >= 7)
                break;
            else {
                movimentoLinha = movimentoLinha + 1;
                movimentoColuna = movimentoColuna + 1;
            }
        }
        isPosicaoOcupada = false;
        movimentoLinha = linha - 1;
        movimentoColuna = coluna - 1;
        while (!isPosicaoOcupada) {
            var proximaPosicao = { linha: movimentoLinha, coluna: movimentoColuna };
            if (!tabuleiro.isPosicaoValida(proximaPosicao))
                break;
            isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao);
            if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
                posicoes.push(proximaPosicao);
            }
            if (movimentoLinha <= 0 || movimentoColuna <= 0)
                break;
            else {
                movimentoLinha = movimentoLinha - 1;
                movimentoColuna = movimentoColuna - 1;
            }
        }
        return posicoes;
    };
    return MovimentoDiagonal;
}(Movimento_1.Movimento));
exports.MovimentoDiagonal = MovimentoDiagonal;
