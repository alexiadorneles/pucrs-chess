"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var BoardItem = (function () {
    function BoardItem(position, color) {
        var _this = this;
        this.position = position;
        this.color = color;
        this.onClick = function () {
            if (!_this.isHighlighted) {
                if (_this.piece) {
                    _this.board.setCurrentMovingPiece(_this.piece);
                    _this.setHighlight(true);
                }
            }
            else {
                if (!_this.piece) {
                    if (_this.board.isMovingPiece()) {
                        _this.board.movePiece(_this);
                    }
                }
                else {
                    if (_this.board.isMovingPiece()) {
                        if (!lodash_1.default.isEqual(_this.piece, _this.board.currentMovingPieces)) {
                            _this.board.movePiece(_this);
                        }
                    }
                    _this.setHighlight(false);
                }
            }
        };
    }
    BoardItem.prototype.setPiece = function (piece) {
        this.piece = piece;
        if (piece) {
            this.piece.addToItem(this);
        }
    };
    BoardItem.prototype.setElement = function (element) {
        this.element = element;
    };
    BoardItem.prototype.addToBoard = function (board) {
        this.board = board;
    };
    BoardItem.prototype.setBoard = function (board) {
        this.board = board;
    };
    BoardItem.prototype.getColor = function () {
        return this.color;
    };
    BoardItem.prototype.getPiece = function () {
        return this.piece;
    };
    BoardItem.prototype.getPosition = function () {
        return this.position;
    };
    BoardItem.prototype.getBoard = function () {
        return this.board;
    };
    BoardItem.prototype.setHighlight = function (isDestacado) {
        this.isHighlighted = isDestacado;
        this.updateStyles();
        if (this.isHighlighted) {
            if (lodash_1.default.isEqual(this.piece, this.board.currentMovingPieces)) {
                this.simulateMovement();
            }
        }
        else {
            this.removeHighlightFromBoard();
        }
    };
    BoardItem.prototype.removeHighlight = function () {
        this.isHighlighted = false;
        this.updateStyles();
    };
    BoardItem.prototype.removeHighlightFromBoard = function () {
        this.board.clearHighlights();
    };
    BoardItem.prototype.simulateMovement = function () {
        if (this.piece) {
            var positions = this.piece.simulateMovement();
            this.board.highlightPositions(positions);
        }
    };
    BoardItem.prototype.updateStyles = function () {
        var styleClass = this.element.getAttribute('class');
        var alreadyHighlighted = styleClass.includes('highlight');
        if (alreadyHighlighted && !this.isHighlighted)
            styleClass = styleClass.replace('highlight', '');
        var highlightClass = this.isHighlighted && !alreadyHighlighted ? 'highlight' : '';
        this.element.setAttribute('class', styleClass + " " + highlightClass);
    };
    return BoardItem;
}());
exports.BoardItem = BoardItem;
