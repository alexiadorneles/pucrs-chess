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
var LMovement_1 = require("../movement/LMovement");
var Piece_1 = require("./Piece");
var Knight = (function (_super) {
    __extends(Knight, _super);
    function Knight(cor) {
        var _this = this;
        var movements = [new LMovement_1.LMovement()];
        _this = _super.call(this, PieceKind_1.PieceKind.KNIGHT, cor, movements, true) || this;
        return _this;
    }
    return Knight;
}(Piece_1.Piece));
exports.Knight = Knight;
