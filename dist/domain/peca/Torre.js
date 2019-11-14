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
var Peca_1 = require("./Peca");
var MovimentoVertical_1 = require("../movimento/MovimentoVertical");
var MovimentoHorizontal_1 = require("../movimento/MovimentoHorizontal");
var TipoPeca_1 = require("../../definitions/TipoPeca");
var ExtensorPosicoes_1 = require("../../ExtensorPosicoes");
var Torre = (function (_super) {
    __extends(Torre, _super);
    function Torre(cor) {
        var _this = this;
        var movimentos = [new MovimentoVertical_1.MovimentoVertical(), new MovimentoHorizontal_1.MovimentoHorizontal()];
        _this = _super.call(this, TipoPeca_1.TipoPeca.TORRE, cor, movimentos, true) || this;
        return _this;
    }
    Torre.prototype.simularMovimento = function () {
        return ExtensorPosicoes_1.ExtensorPosicoes.extenderVertical([this.getItemTabuleiro().getPosicao()]).concat(ExtensorPosicoes_1.ExtensorPosicoes.extenderHorizontal([this.getItemTabuleiro().getPosicao()]));
    };
    return Torre;
}(Peca_1.Peca));
exports.Torre = Torre;
