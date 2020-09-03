"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("../domain/board/Board");
var BoardItemComposite_1 = require("./BoardItemComposite");
var BoardComposite = (function () {
    function BoardComposite(board, engine) {
        this.board = board;
        this.engine = engine;
        this.getModel().set('control', board);
    }
    BoardComposite.prototype.getModel = function () {
        return this.board;
    };
    BoardComposite.prototype.getParent = function () {
        throw new Error('Board is the root of the tree.');
    };
    BoardComposite.createFromJSON = function (object, engine) {
        var board = Object.assign(new Board_1.Board(), object);
        var composite = new BoardComposite(board, engine);
        var items = board
            .getAllItems()
            .map(function (item) { return BoardItemComposite_1.BoardItemComposite.createFromJSON(item, composite, engine); });
        return composite;
    };
    BoardComposite.prototype.createElement = function () {
        return document.createElement('div');
    };
    BoardComposite.prototype.getChildren = function () {
        var _this = this;
        var items = this.board.getAllItems();
        return items.map(function (item) { return new BoardItemComposite_1.BoardItemComposite(item, _this, _this.engine); });
    };
    BoardComposite.prototype.getJSON = function () {
        return this.board;
    };
    BoardComposite.prototype.cleanCircularReferences = function () {
        this.getChildren().forEach(function (child) { return child.cleanCircularReferences(); });
    };
    return BoardComposite;
}());
exports.BoardComposite = BoardComposite;
