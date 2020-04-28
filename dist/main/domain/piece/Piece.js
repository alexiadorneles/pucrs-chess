"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Movement_1 = require("../movement/Movement");
var PieceBuilder_1 = require("../PieceBuilder");
var Piece = (function () {
    function Piece(kind, color, movements, isAllowedToGoBackwards) {
        this.kind = kind;
        this.color = color;
        this.movements = movements;
        this.isAllowedToGoBackwards = isAllowedToGoBackwards;
    }
    Piece.copy = function (piece) {
        var instantiationFn = PieceBuilder_1.PieceBuilderMap.get(piece.kind);
        var model = Object.assign(new instantiationFn(piece.color), piece);
        var movements = model.getMovements().map(function (mov) { return Movement_1.Movement.copy(mov); });
        model.movements = movements;
        return model;
    };
    Piece.prototype.getMovements = function () {
        return this.movements;
    };
    Piece.prototype.setMovements = function (movements) {
        this.movements = movements;
    };
    Piece.prototype.canGoBackwards = function () {
        return this.isAllowedToGoBackwards;
    };
    Piece.prototype.getBoardItem = function () {
        return this.boardItem;
    };
    Piece.prototype.getBoard = function () {
        return this.boardItem.getBoard();
    };
    Piece.prototype.simulateMovement = function () {
        var _this = this;
        var currentPosition = this.getBoardItem().getPosition();
        var positions = this.movements.map(function (movement) {
            return movement.executeSimulation(currentPosition, _this.getBoard());
        });
        return lodash_1.default.flatten(positions);
    };
    Piece.prototype.addToItem = function (item) {
        this.boardItem = item;
    };
    Piece.prototype.getCor = function () {
        return this.color;
    };
    Piece.prototype.getKind = function () {
        return this.kind;
    };
    return Piece;
}());
exports.Piece = Piece;
