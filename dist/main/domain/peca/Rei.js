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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var PieceKind_1 = require("../../definitions/PieceKind");
var MovimentoDiagonal_1 = require("../movimento/MovimentoDiagonal");
var MovimentoHorizontal_1 = require("../movimento/MovimentoHorizontal");
var MovimentoVertical_1 = require("../movimento/MovimentoVertical");
var Peca_1 = require("./Peca");
var Rei = (function (_super) {
    __extends(Rei, _super);
    function Rei(cor) {
        var _this = this;
        var movimentos = [new MovimentoVertical_1.MovimentoVertical(), new MovimentoHorizontal_1.MovimentoHorizontal(), new MovimentoDiagonal_1.MovimentoDiagonal()];
        _this = _super.call(this, PieceKind_1.PieceKind.KING, cor, movimentos, true) || this;
        return _this;
    }
    Rei.prototype.simularMovimento = function () {
        var posicaoInicial = this.getItemTabuleiro().getPosicao();
        var tabuleiro = this.getTabuleiro();
        var posicoes = this.movimentos.map(function (movimento) {
            return movimento.getOffsetMovimentos()
                .map(function (offset) { return movimento.criarNovaPosicaoBaseadaEmOffset(posicaoInicial, offset); })
                .filter(function (posicao) { return tabuleiro.isPosicaoExistente(posicao); })
                .filter(function (posicao) {
                return !tabuleiro.isPosicaoOcupada(posicao) ||
                    tabuleiro.isBloqueadaPorOponente(posicao, posicaoInicial);
            });
        });
        return lodash_1.default.flatten(posicoes);
    };
    return Rei;
}(Peca_1.Peca));
exports.Rei = Rei;
