"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Peca = (function () {
    function Peca(tipo, cor, movimentos, vaiPraTras) {
        this.tipo = tipo;
        this.cor = cor;
        this.movimentos = movimentos;
        this.vaiPraTras = vaiPraTras;
    }
    Peca.prototype.getMovimentos = function () {
        return this.movimentos;
    };
    Peca.prototype.setMovimentos = function (movimentos) {
        this.movimentos = movimentos;
    };
    Peca.prototype.isVaiPraTras = function () {
        return this.vaiPraTras;
    };
    Peca.prototype.getItemTabuleiro = function () {
        return this.itemTabuleiro;
    };
    Peca.prototype.getTabuleiro = function () {
        return this.itemTabuleiro.getTabuleiro();
    };
    Peca.prototype.simularMovimento = function () {
        var _this = this;
        var posicaoAtual = this.getItemTabuleiro().getPosicao();
        var posicoes = this.movimentos.map(function (movimento) { return movimento.executeSimulation(posicaoAtual, _this.getTabuleiro()); });
        return lodash_1.default.flatten(posicoes);
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
