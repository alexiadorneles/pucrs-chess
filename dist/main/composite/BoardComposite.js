"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        return document.createElement('div');
    };
    BoardComposite.prototype.getChildren = function () {
        var items = this.board.getAllItems();
        return items.map(function (item) { return new BoardItemComposite_1.BoardItemComposite(item); });
    };
    BoardComposite.prototype.getJSON = function () {
        return this.board;
    };
    BoardComposite.prototype.setChildren = function (children) {
    };
    BoardComposite.prototype.cleanCircularReferences = function () {
        this.getChildren().forEach(function (child) { return child.cleanCircularReferences(); });
    };
    return BoardComposite;
}());
exports.BoardComposite = BoardComposite;
