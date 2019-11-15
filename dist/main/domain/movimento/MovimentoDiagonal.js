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
var MovimentoDiagonal = (function (_super) {
    __extends(MovimentoDiagonal, _super);
    function MovimentoDiagonal() {
        var _this = _super.call(this, 2) || this;
        _this.offsetMovimentos = [{ coluna: 1, linha: 1 }];
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
            var nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna };
            isPosicaoOcupada = tabuleiro.isPosicaoOcupada(nextMoviment);
            if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(nextMoviment)) {
                posicoes.push(nextMoviment);
            }
            if (movimentoLinha >= 7 || movimentoColuna <= 0)
                break;
            else {
                movimentoLinha = movimentoLinha + 1;
                movimentoColuna = movimentoColuna - 1;
            }
        }
        isPosicaoOcupada = false;
        movimentoLinha = linha - 1;
        movimentoColuna = coluna + 1;
        while (!isPosicaoOcupada) {
            var nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna };
            isPosicaoOcupada = tabuleiro.isPosicaoOcupada(nextMoviment);
            if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(nextMoviment)) {
                posicoes.push(nextMoviment);
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
            var nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna };
            isPosicaoOcupada = tabuleiro.isPosicaoOcupada(nextMoviment);
            if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(nextMoviment)) {
                posicoes.push(nextMoviment);
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
            var nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna };
            isPosicaoOcupada = tabuleiro.isPosicaoOcupada(nextMoviment);
            if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(nextMoviment)) {
                posicoes.push(nextMoviment);
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
