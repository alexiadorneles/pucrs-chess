"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Movimento = (function () {
    function Movimento(tipo) {
        this.tipo = tipo;
    }
    Movimento.prototype.getTipo = function () {
        return this.tipo;
    };
    Movimento.prototype.simularMovimento = function (posicao, peca) {
        return [];
    };
    Movimento.prototype.criarNovaPosicaoBaseadaEmOffset = function (_a, _b) {
        var linha = _a.linha, coluna = _a.coluna;
        var modificadorColuna = _b.modificadorColuna, modificadorLinha = _b.modificadorLinha;
        return {
            linha: modificadorLinha.apply(linha),
            coluna: modificadorColuna.apply(coluna),
        };
    };
    return Movimento;
}());
exports.Movimento = Movimento;
