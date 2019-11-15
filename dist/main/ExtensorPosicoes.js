"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExtensorPosicoes = (function () {
    function ExtensorPosicoes() {
    }
    ExtensorPosicoes.extenderVertical = function (posicoes) {
        return posicoes.reduce(function (agg, _a) {
            var linha = _a.linha, coluna = _a.coluna;
            var novasPosicoes = [];
            for (var i = linha; i < 8; i++) {
                novasPosicoes.push({ linha: i, coluna: coluna });
            }
            return agg.concat(novasPosicoes);
        }, []);
    };
    ExtensorPosicoes.extenderHorizontal = function (posicoes) {
        return posicoes.reduce(function (agg, _a) {
            var linha = _a.linha, coluna = _a.coluna;
            var novasPosicoes = [];
            for (var i = coluna; i < 8; i++) {
                novasPosicoes.push({ linha: linha, coluna: i });
            }
            return agg.concat(novasPosicoes);
        }, []);
    };
    ExtensorPosicoes.extenderDiagonal = function (posicao) {
        var offsetColuna = 8 - posicao.coluna;
        var novaPosicao = { linha: posicao.linha, coluna: posicao.coluna };
        var novasPosicoes = [];
        while (novaPosicao.coluna < 8) {
            var linha = novaPosicao.linha, coluna = novaPosicao.coluna;
            novaPosicao = { linha: ++linha, coluna: ++coluna };
            novasPosicoes.push(novaPosicao);
        }
        novaPosicao = { linha: posicao.linha, coluna: posicao.coluna };
        while (novaPosicao.coluna >= 0) {
            var linha = novaPosicao.linha, coluna = novaPosicao.coluna;
            novaPosicao = { linha: ++linha, coluna: --coluna };
            novasPosicoes.push(novaPosicao);
        }
        novaPosicao = { linha: posicao.linha, coluna: posicao.coluna };
        while (novaPosicao.coluna < 8) {
            var linha = novaPosicao.linha, coluna = novaPosicao.coluna;
            novaPosicao = { linha: --linha, coluna: ++coluna };
            novasPosicoes.push(novaPosicao);
        }
        novaPosicao = { linha: posicao.linha, coluna: posicao.coluna };
        while (novaPosicao.coluna >= 0) {
            var linha = novaPosicao.linha, coluna = novaPosicao.coluna;
            novaPosicao = { linha: --linha, coluna: --coluna };
            novasPosicoes.push(novaPosicao);
        }
        return novasPosicoes;
    };
    ExtensorPosicoes.extenderL = function (posicoes) {
        return posicoes.reduce(function (agg, _a) {
            var linha = _a.linha, coluna = _a.coluna;
            var novasPosicoes = [];
            novasPosicoes.push({ linha: linha + 2, coluna: coluna + 1 });
            novasPosicoes.push({ linha: linha - 2, coluna: coluna + 1 });
            novasPosicoes.push({ linha: linha - 2, coluna: coluna - 1 });
            novasPosicoes.push({ linha: linha + 2, coluna: coluna - 1 });
            novasPosicoes.push({ linha: linha + 1, coluna: coluna + 2 });
            novasPosicoes.push({ linha: linha + 1, coluna: coluna - 2 });
            novasPosicoes.push({ linha: linha - 1, coluna: coluna + 2 });
            novasPosicoes.push({ linha: linha - 1, coluna: coluna - 2 });
            return agg.concat(novasPosicoes);
        }, []);
    };
    return ExtensorPosicoes;
}());
exports.ExtensorPosicoes = ExtensorPosicoes;
