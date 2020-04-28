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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var PieceKind_1 = require("../../definitions/PieceKind");
var VerticalMovement_1 = require("../movement/VerticalMovement");
var Piece_1 = require("./Piece");
var Pawn = (function (_super) {
    __extends(Pawn, _super);
    function Pawn(color) {
        return _super.call(this, PieceKind_1.PieceKind.PAWN, color, [new VerticalMovement_1.VerticalMovement()], false) || this;
    }
    Pawn.prototype.simulateMovement = function () {
        var currentPosition = this.boardItem.getPosicao();
        var newPosition = this.getNewPositionByColor(currentPosition);
        var possibleAttacks = this.getAttacksByColor(currentPosition);
        return lodash_1.default.compact(__spreadArrays([newPosition], possibleAttacks));
    };
    Pawn.prototype.getNewPositionByColor = function (_a) {
        var line = _a.line, column = _a.column;
        var newLine = this.color === "grey" ? ++line : --line;
        var newPosition = { line: newLine, column: column };
        var isOccupied = this.getBoard().isPosicaoOcupada(newPosition);
        return (!isOccupied && newPosition) || null;
    };
    Pawn.prototype.getAttacksByColor = function (currentPosition) {
        var _this = this;
        var clone = __assign({}, currentPosition);
        var newLine = this.color === "grey" ? ++clone.line : --clone.line;
        var newPosition = { line: newLine, column: clone.column };
        var line = newPosition.line, column = newPosition.column;
        var rightDiagonal = { line: line, column: column + 1 };
        var leftDiagonal = { line: line, column: column - 1 };
        var attacks = [rightDiagonal, leftDiagonal];
        return attacks.filter(function (position) {
            return _this.getBoard().isBloqueadaPorOponente(position, currentPosition);
        });
    };
    return Pawn;
}(Piece_1.Piece));
exports.Pawn = Pawn;
