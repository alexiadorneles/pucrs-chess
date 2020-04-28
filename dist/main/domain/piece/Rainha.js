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
var DiagonalMovement_1 = require("../movement/DiagonalMovement");
var HorizontalMovement_1 = require("../movement/HorizontalMovement");
var VerticalMovement_1 = require("../movement/VerticalMovement");
var Piece_1 = require("./Piece");
var Rainha = (function (_super) {
    __extends(Rainha, _super);
    function Rainha(cor) {
        var _this = this;
        var movimentos = [new VerticalMovement_1.VerticalMovement(), new HorizontalMovement_1.HorizontalMovement(), new DiagonalMovement_1.DiagonalMovement()];
        _this = _super.call(this, PieceKind_1.PieceKind.QUEEN, cor, movimentos, true) || this;
        return _this;
    }
    return Rainha;
}(Piece_1.Peca));
exports.Rainha = Rainha;
