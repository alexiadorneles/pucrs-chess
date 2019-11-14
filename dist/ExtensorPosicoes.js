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
    ExtensorPosicoes.extenderDiagonal = function (posicoes) {
        return posicoes.reduce(function (agg, _a) {
            var linha = _a.linha, coluna = _a.coluna;
            var novasPosicoes = [];
            for (var i = coluna; i < 8; i++) {
                novasPosicoes.push({ linha: i, coluna: i });
            }
            for (var i = linha; i < 8; i++) {
                novasPosicoes.push({ linha: i, coluna: i });
            }
            return agg.concat(novasPosicoes);
        }, []);
    };
    return ExtensorPosicoes;
}());
exports.ExtensorPosicoes = ExtensorPosicoes;
