"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Board_1 = require("../domain/board/Board");
var BoardItemComposite_1 = require("./BoardItemComposite");
var BoardComposite = (function () {
    function BoardComposite(board) {
        this.board = board;
        this.board.init();
    }
    BoardComposite.createFromJSON = function (object) {
        var board = Object.assign(new Board_1.Board(), object);
        var items = board.getAllItems().map(function (item) { return BoardItemComposite_1.BoardItemComposite.createFromJSON(item); });
        return new BoardComposite(board);
    };
    BoardComposite.prototype.createElement = function () {
        var board = document.createElement('div');
        var itemsMatrix = lodash_1.default.chunk(this.getChildren(), 8);
        var columns = itemsMatrix.map(function (item) { return item.map(function (boardItem) { return boardItem.createElement(); }); });
        var lines = columns.map(function (column) {
            var lineElement = document.createElement('div');
            lineElement.setAttribute('class', 'chess-line');
            column.forEach(function (element) { return lineElement.appendChild(element); });
            return lineElement;
        });
        lines.forEach(function (line) { return board.appendChild(line); });
        return board;
    };
    BoardComposite.prototype.getChildren = function () {
        var items = this.board.getAllItems();
        return items.map(function (item) { return new BoardItemComposite_1.BoardItemComposite(item); });
    };
    BoardComposite.prototype.setChildren = function (children) {
    };
    BoardComposite.prototype.cleanCircularReferences = function () {
        this.getChildren().forEach(function (child) { return child.cleanCircularReferences(); });
    };
    return BoardComposite;
}());
exports.BoardComposite = BoardComposite;
