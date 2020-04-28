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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var PieceKind_1 = require("../../definitions/PieceKind");
var MovimentoVertical_1 = require("../movimento/MovimentoVertical");
var Peca_1 = require("./Peca");
var Peao = (function (_super) {
    __extends(Peao, _super);
    function Peao(cor) {
        var _this = this;
        var movimentos = [new MovimentoVertical_1.MovimentoVertical()];
        _this = _super.call(this, PieceKind_1.PieceKind.PAWN, cor, movimentos, false) || this;
        return _this;
    }
    Peao.prototype.simularMovimento = function () {
        var posicaoAtual = this.itemTabuleiro.getPosicao();
        var novaPosicao = this.getNovaPosicaoByCor(posicaoAtual);
        var possiveisAtaques = this.getAtaqueByCor(posicaoAtual);
        return lodash_1.default.compact(__spreadArrays([novaPosicao], possiveisAtaques));
    };
    Peao.prototype.getNovaPosicaoByCor = function (_a) {
        var line = _a.line, column = _a.column;
        var novaLinha = this.cor === "grey" ? ++line : --line;
        var novaPosicao = { line: novaLinha, column: column };
        var isOcupada = this.getTabuleiro().isPosicaoOcupada(novaPosicao);
        return (!isOcupada && novaPosicao) || null;
    };
    Peao.prototype.getAtaqueByCor = function (posicaoAtual) {
        var _this = this;
        var clone = __assign({}, posicaoAtual);
        var novaLinha = this.cor === "grey" ? ++clone.line : --clone.line;
        var novaPosicao = { line: novaLinha, column: clone.column };
        var line = novaPosicao.line, column = novaPosicao.column;
        var diagonalDireita = { line: line, column: column + 1 };
        var diagonalEsquerda = { line: line, column: column - 1 };
        var ataques = [diagonalDireita, diagonalEsquerda];
        return ataques.filter(function (posicao) {
            return _this.getTabuleiro().isBloqueadaPorOponente(posicao, posicaoAtual);
        });
    };
    return Peao;
}(Peca_1.Peca));
exports.Peao = Peao;
