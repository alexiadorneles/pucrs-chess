"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var composite_1 = require("./composite");
var DOMGenerator_1 = require("./DOMGenerator");
var ChessEngine = (function () {
    function ChessEngine() {
    }
    ChessEngine.prototype.setCurrentMovingPiece = function (piece) {
        if (this.currentMovingPiece && !lodash_1.default.isEqual(this.currentMovingPiece, piece)) {
            if (!piece)
                return this.removeHighLightFromPieceBoard(this.currentMovingPiece);
            this.removeHighLightFromPieceBoard(piece);
        }
        this.currentMovingPiece = piece;
    };
    ChessEngine.prototype.getCurrentMovingPiece = function () {
        return this.currentMovingPiece;
    };
    ChessEngine.prototype.movePiece = function (board, item) {
        var clickedItem = item.getModel().get('control');
        var pieceItem = this.currentMovingPiece.get('boardItem');
        clickedItem.set('piece', this.currentMovingPiece.get('control'));
        this.setCurrentMovingPiece(null);
        pieceItem.set('piece', null);
        DOMGenerator_1.DOMGenerator.getInstance().refreshBoard(board);
    };
    ChessEngine.prototype.highlightItem = function (item) {
        var _this = this;
        var model = item.getModel();
        var board = item.getParent();
        model.set('isHighlighted', true);
        DOMGenerator_1.DOMGenerator.getInstance().refreshItem(item);
        var clickedItemIsBeingMoved = function () { return lodash_1.default.isEqual(model.get('piece'), _this.currentMovingPiece); };
        return clickedItemIsBeingMoved()
            ? this.simulateMovementForItem(item)
            : this.removeHighlightFromBoard(board);
    };
    ChessEngine.prototype.removeItemHighlight = function (item) {
        item.getModel().set('isHighlighted', false);
        DOMGenerator_1.DOMGenerator.getInstance().refreshItem(item);
        this.removeHighlightFromBoard(item.getParent());
    };
    ChessEngine.prototype.simulateMovementForItem = function (itemComposite) {
        var _this = this;
        var board = itemComposite.getParent();
        var boardControl = board.getModel().get('control');
        var piece = itemComposite.getModel().get('piece');
        if (piece) {
            var positions = piece.simulateMovement();
            positions.forEach(function (position) {
                var item = boardControl.getItem(position);
                item.set('isHighlighted', true);
                DOMGenerator_1.DOMGenerator.getInstance().refreshItem(new composite_1.BoardItemComposite(item, board, _this));
            });
        }
    };
    ChessEngine.prototype.removeHighlightFromBoard = function (board) {
        var allItems = board.getChildren();
        allItems.forEach(function (item) {
            item.getModel().set('isHighlighted', false);
            DOMGenerator_1.DOMGenerator.getInstance().refreshItem(item);
        });
    };
    ChessEngine.prototype.removeHighLightFromPieceBoard = function (piece) {
        var board = piece.get('boardItem').get('board');
        this.removeHighlightFromBoard(new composite_1.BoardComposite(board, this));
    };
    return ChessEngine;
}());
exports.ChessEngine = ChessEngine;
