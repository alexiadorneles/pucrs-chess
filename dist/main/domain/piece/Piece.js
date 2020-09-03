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
var Model_1 = require("../../definitions/Model");
var Piece = (function (_super) {
    __extends(Piece, _super);
    function Piece(kind, color, movements, isAllowedToGoBackwards) {
        var _this = _super.call(this) || this;
        _this.kind = kind;
        _this.color = color;
        _this.movements = movements;
        _this.isAllowedToGoBackwards = isAllowedToGoBackwards;
        return _this;
    }
    Piece.prototype.getBoardItem = function () {
        return this.boardItem;
    };
    Piece.prototype.getBoard = function () {
        return this.boardItem.get('board');
    };
    Piece.prototype.simulateMovement = function () {
        var _this = this;
        var currentPosition = this.getBoardItem().get('position');
        var positions = this.movements.map(function (movement) {
            return movement.executeSimulation(currentPosition, _this.getBoard());
        });
        return lodash_1.default.flatten(positions);
    };
    Piece.prototype.addToItem = function (item) {
        this.boardItem = item;
    };
    return Piece;
}(Model_1.Model));
exports.Piece = Piece;
