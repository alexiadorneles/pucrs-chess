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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Movimento = (function () {
    function Movimento(tipo) {
        this.tipo = tipo;
    }
    Movimento.prototype.getTipo = function () {
        return this.tipo;
    };
    Movimento.prototype.simularMovimento = function (posicao, tabuleiro) {
        var bindedGetter = this.getPosicoesValidasPorOffset.bind(this, posicao, tabuleiro);
        var posicoes = this.getOffsetMovimentos().map(bindedGetter);
        return lodash_1.default.flatten(posicoes);
    };
    Movimento.prototype.getPosicoesValidasPorOffset = function (posicaoInicial, tabuleiro, offset) {
        var isPosicaoValida = true;
        var posicao = __assign({}, posicaoInicial);
        var posicoes = [];
        while (isPosicaoValida) {
            posicao = this.criarNovaPosicaoBaseadaEmOffset(posicao, offset);
            isPosicaoValida = tabuleiro.isPosicaoValida(posicao);
            if (isPosicaoValida) {
                posicoes.push(posicao);
            }
            else if (tabuleiro.isBloqueadaPorOponente(posicao, posicaoInicial)) {
                posicoes.push(posicao);
            }
        }
        return posicoes;
    };
    Movimento.prototype.criarNovaPosicaoBaseadaEmOffset = function (_a, _b) {
        var line = _a.line, column = _a.column;
        var columnModifier = _b.columnModifier, lineModifier = _b.lineModifier;
        return {
            line: lineModifier.apply(line),
            column: columnModifier.apply(column),
        };
    };
    return Movimento;
}());
exports.Movimento = Movimento;
