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
var MovimentoDiagonal_1 = require("../movement/MovimentoDiagonal");
var Peca_1 = require("./Peca");
var Bispo = (function (_super) {
    __extends(Bispo, _super);
    function Bispo(cor) {
        var _this = this;
        var movimentos = [new MovimentoDiagonal_1.MovimentoDiagonal()];
        _this = _super.call(this, PieceKind_1.PieceKind.BISHOP, cor, movimentos, true) || this;
        return _this;
    }
    return Bispo;
}(Peca_1.Peca));
exports.Bispo = Bispo;
