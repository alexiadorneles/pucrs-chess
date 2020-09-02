"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var BoardComposite_1 = require("../../composite/BoardComposite");
var InitialPositions_1 = require("../../constants/InitialPositions");
var PieceKind_1 = require("../../definitions/PieceKind");
var DOMGenerator_1 = require("../../DOMGenerator");
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
var Board = (function () {
    function Board() {
        var _this = this;
        this.matrix = initMatrix();
        this.isValidPosition = function (position) {
            return _this.isPositionInMatrixRange(position) && !_this.getPieceByPosition(position);
        };
        this.addItem = function (item) {
            var _a = item.getPosition(), line = _a.line, column = _a.column;
            _this.matrix[line][column] = item;
            item.addToBoard(_this);
        };
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
    Board.prototype.highlightPositions = function (positions) {
        var _this = this;
        positions.forEach(function (position) { return _this.getItem(position).setHighlight(true); });
    };
    Board.prototype.clearHighlights = function () {
        this.executeForAll(function (item) { return item.removeHighlight(); });
    };
    Board.prototype.isPositionBlockedByOpponent = function (position, initialPosition) {
        var blockingPiece = this.isPositionInMatrixRange(position) && this.getPieceByPosition(position);
        var blockingColor = blockingPiece && this.getPieceByPosition(position).getColor();
        var blockedColor = this.getItem(initialPosition)
            .getPiece()
            .getColor();
        return blockingColor && blockedColor !== blockingColor;
    };
    Board.prototype.setCurrentMovingPiece = function (piece) {
        if (this.currentMovingPieces && !lodash_1.default.isEqual(this.currentMovingPieces, piece)) {
            this.clearHighlights();
        }
        this.currentMovingPieces = piece;
    };
    Board.prototype.isMovingPiece = function () {
        return !!this.currentMovingPieces;
    };
    Board.prototype.movePiece = function (clickedItem) {
        var pieceItem = this.currentMovingPieces.getBoardItem();
        clickedItem.setPiece(this.currentMovingPieces);
        this.currentMovingPieces = null;
        pieceItem.setPiece(null);
        DOMGenerator_1.DOMGenerator.getInstance().refresh(new BoardComposite_1.BoardComposite(this));
    };
    Board.prototype.executeForAll = function (callback) {
        for (var line = 0; line < 8; line++)
            for (var column = 0; column < 8; column++)
                callback(this.getItem({ line: line, column: column }), { line: line, column: column });
    };
    Board.prototype.isPositionInMatrixRange = function (position) {
        return position.column < 8 && position.column >= 0 && position.line >= 0 && position.line < 8;
    };
    Board.prototype.getPieceByPosition = function (position) {
        return this.isPositionInMatrixRange(position) ? this.getItem(position).getPiece() : null;
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
}());
exports.Board = Board;
