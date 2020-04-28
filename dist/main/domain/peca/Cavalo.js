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
var PieceKind_1 = require("../../definitions/PieceKind");
var MovimentoL_1 = require("../movimento/MovimentoL");
var Peca_1 = require("./Peca");
var Cavalo = (function (_super) {
    __extends(Cavalo, _super);
    function Cavalo(cor) {
        var _this = this;
        var movimentos = [new MovimentoL_1.MovimentoL()];
        _this = _super.call(this, PieceKind_1.PieceKind.KNIGHT, cor, movimentos, true) || this;
        return _this;
    }
    return Cavalo;
}(Peca_1.Peca));
exports.Cavalo = Cavalo;
