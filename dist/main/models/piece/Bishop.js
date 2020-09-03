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
var Piece_1 = require("./Piece");
var Bishop = (function (_super) {
    __extends(Bishop, _super);
    function Bishop(color) {
        var _this = this;
        var movements = [new DiagonalMovement_1.DiagonalMovement()];
        _this = _super.call(this, PieceKind_1.PieceKind.BISHOP, color, movements, true) || this;
        return _this;
    }
    return Bishop;
}(Piece_1.Piece));
exports.Bishop = Bishop;
