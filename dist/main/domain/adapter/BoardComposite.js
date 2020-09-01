"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("../board/Board");
var lodash_1 = __importDefault(require("lodash"));
var BoardItemComposite_1 = require("./BoardItemComposite");
var BoardComposite = (function () {
    function BoardComposite(board, replicationFactory) {
        this.board = board;
        this.replicationFactory = replicationFactory;
        if (!(this.board instanceof Board_1.Board)) {
            this.board = this.replicationFactory.createBoardReplicationAdapter().replicate(board);
        }
        this.board.init();
    }
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
    BoardComposite.prototype.clone = function () {
        var replicationAdapter = this.replicationFactory.createBoardReplicationAdapter();
        var board = replicationAdapter.replicate(this.board);
        var composite = new BoardComposite(board, this.replicationFactory);
        composite.getChildren();
        return composite;
    };
    BoardComposite.prototype.getChildren = function () {
        var _this = this;
        var items = this.board.getAllItems();
        return items.map(function (item) { return new BoardItemComposite_1.BoardItemComposite(item, _this.replicationFactory); });
    };
    BoardComposite.prototype.setChildren = function (children) {
    };
    return BoardComposite;
}());
exports.BoardComposite = BoardComposite;
