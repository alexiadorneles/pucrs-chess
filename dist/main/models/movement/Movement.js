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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Model_1 = require("../Model");
var Movement = (function (_super) {
    __extends(Movement, _super);
    function Movement(kind) {
        var _this = _super.call(this) || this;
        _this.set('kind', kind);
        return _this;
    }
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
}(Model_1.Model));
exports.Movement = Movement;
