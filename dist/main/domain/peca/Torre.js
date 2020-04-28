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
var HorizontalMovement_1 = require("../movement/HorizontalMovement");
var VerticalMovement_1 = require("../movement/VerticalMovement");
var Peca_1 = require("./Peca");
var Torre = (function (_super) {
    __extends(Torre, _super);
    function Torre(cor) {
        var _this = this;
        var movimentos = [new VerticalMovement_1.VerticalMovement(), new HorizontalMovement_1.HorizontalMovement()];
        _this = _super.call(this, PieceKind_1.PieceKind.TOWER, cor, movimentos, true) || this;
        return _this;
    }
    return Torre;
}(Peca_1.Peca));
exports.Torre = Torre;
