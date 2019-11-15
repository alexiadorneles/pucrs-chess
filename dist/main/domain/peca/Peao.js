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
        var posicaoAtual = this.itemTabuleiro.getPosicao();
        var novaPosicao = __assign({}, posicaoAtual);
        novaPosicao.linha = this.cor === "white" ? ++posicaoAtual.linha : --posicaoAtual.linha;
        return lodash_1.default.castArray(novaPosicao);
    };
    return Peao;
}(Peca_1.Peca));
exports.Peao = Peao;
