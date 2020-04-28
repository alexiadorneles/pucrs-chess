"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Movement = (function () {
    function Movement(kind) {
        this.kind = kind;
    }
    Movement.prototype.getKind = function () {
        return this.kind;
    };
    Movement.prototype.executeSimulation = function (position, board) {
        var boundGetter = this.getValidPositionsForEachOffset.bind(this, position, board);
        var positions = this.getMovementOffsets().map(boundGetter);
        return lodash_1.default.flatten(positions);
    };
    Movement.prototype.getValidPositionsForEachOffset = function (initialPosition, board, offset) {
        var isValidPosition = true;
        var position = __assign({}, initialPosition);
        var positions = [];
        while (isValidPosition) {
            position = this.createNewPositionBasedOnOffset(position, offset);
            isValidPosition = board.isValidPosition(position);
            if (isValidPosition) {
                positions.push(position);
            }
            else if (board.isPositionBlockedByOpponent(position, initialPosition)) {
                positions.push(position);
            }
        }
        return positions;
    };
    Movement.prototype.createNewPositionBasedOnOffset = function (_a, _b) {
        var line = _a.line, column = _a.column;
        var columnModifier = _b.columnModifier, lineModifier = _b.lineModifier;
        return {
            line: lineModifier.apply(line),
            column: columnModifier.apply(column),
        };
    };
    return Movement;
}());
exports.Movement = Movement;
