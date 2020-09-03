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
var InitialPositions_1 = require("../../constants/InitialPositions");
var Model_1 = require("../../definitions/Model");
var PieceKind_1 = require("../../definitions/PieceKind");
var ColorAdapter_1 = require("../adapter/ColorAdapter");
var PieceBuilder_1 = require("../PieceBuilder");
var BoardItem_1 = require("./BoardItem");
var initMatrix = function () {
    var matrix = [];
    matrix[0] = [];
    matrix[1] = [];
    matrix[2] = [];
    matrix[3] = [];
    matrix[4] = [];
    matrix[5] = [];
    matrix[6] = [];
    matrix[7] = [];
    return matrix;
};
var Board = (function (_super) {
    __extends(Board, _super);
    function Board() {
        var _this = _super.call(this) || this;
        _this.matrix = initMatrix();
        _this.isValidPosition = function (position) {
            return _this.isPositionInMatrixRange(position) && !_this.getPieceByPosition(position);
        };
        _this.addItem = function (item) {
            var _a = item.get('position'), line = _a.line, column = _a.column;
            _this.matrix[line][column] = item;
            item.set('board', _this);
        };
        _this.init();
        return _this;
    }
    Board.prototype.init = function () {
        var whites = this.buildPieces("white");
        var pinks = this.buildPieces("dark-pink");
        var empties = this.buildEmptyPieces();
        whites
            .concat(pinks)
            .concat(empties)
            .forEach(this.addItem);
    };
    Board.prototype.getAllItems = function () {
        return lodash_1.default.flatten(this.matrix);
    };
    Board.prototype.getItem = function (_a) {
        var line = _a.line, column = _a.column;
        var positionExists = this.isPositionInMatrixRange({ line: line, column: column });
        return positionExists ? this.matrix[line][column] : null;
    };
    Board.prototype.isPositionBlockedByOpponent = function (position, initialPosition) {
        var blockingPiece = this.isPositionInMatrixRange(position) && this.getPieceByPosition(position);
        var blockingColor = blockingPiece && this.getPieceByPosition(position).get('color');
        var blockedColor = this.getItem(initialPosition)
            .get('piece')
            .get('color');
        return blockingColor && blockedColor !== blockingColor;
    };
    Board.prototype.isPositionInMatrixRange = function (position) {
        return position.column < 8 && position.column >= 0 && position.line >= 0 && position.line < 8;
    };
    Board.prototype.getPieceByPosition = function (position) {
        return this.isPositionInMatrixRange(position) ? this.getItem(position).get('piece') : null;
    };
    Board.prototype.buildPieces = function (color) {
        return Object.values(PieceKind_1.PieceKind)
            .filter(Boolean)
            .reduce(function (agg, kind) { return agg.concat(PieceBuilder_1.PieceBuilder.build(kind, color)); }, []);
    };
    Board.prototype.buildEmptyPieces = function () {
        return InitialPositions_1.WhitePiecesPositionMap.get(PieceKind_1.PieceKind.EMPTY).map(function (position) { return new BoardItem_1.BoardItem(position, ColorAdapter_1.ColorAdapter.defineItemColor(position)); });
    };
    return Board;
}(Model_1.Model));
exports.Board = Board;
