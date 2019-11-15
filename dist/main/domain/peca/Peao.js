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
var TipoPeca_1 = require("../../definitions/TipoPeca");
var MovimentoVertical_1 = require("../movimento/MovimentoVertical");
var Peca_1 = require("./Peca");
var Peao = (function (_super) {
    __extends(Peao, _super);
    function Peao(cor) {
        var _this = this;
        var movimentos = [new MovimentoVertical_1.MovimentoVertical()];
        _this = _super.call(this, TipoPeca_1.TipoPeca.PEAO, cor, movimentos, false) || this;
        return _this;
    }
    Peao.prototype.simularMovimento = function () {
        var posicaoPeca = this.itemTabuleiro.getPosicao();
        var posicao = this.cor === "white"
            ? { linha: ++posicaoPeca.linha, coluna: posicaoPeca.coluna }
            : { linha: --posicaoPeca.linha, coluna: posicaoPeca.coluna };
        return lodash_1.default.castArray(posicao);
    };
    return Peao;
}(Peca_1.Peca));
exports.Peao = Peao;
