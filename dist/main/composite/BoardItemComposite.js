"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BoardItem_1 = require("../domain/board/BoardItem");
var PieceComposite_1 = require("./PieceComposite");
var BoardItemComposite = (function () {
    function BoardItemComposite(boardItem) {
        this.boardItem = boardItem;
        this.cleanCircularReferences = this.cleanCircularReferences.bind(this);
    }
    BoardItemComposite.prototype.createElement = function () {
        var container = document.createElement('div');
        container.setAttribute('class', 'container');
        var square = document.createElement('span');
        square.setAttribute('class', "fas fa-square-full chess-square " + this.boardItem.getColor());
        square.addEventListener('click', this.boardItem.onClick);
        container.append(square);
        this.boardItem.setElement(square);
        return container;
    };
    BoardItemComposite.createFromJSON = function (object) {
        var boardItem = Object.assign(new BoardItem_1.BoardItem(object.position, object.color), object);
        var piece = boardItem.getPiece();
        piece && PieceComposite_1.PieceComposite.createFromJSON(piece);
        return new BoardItemComposite(boardItem);
    };
    BoardItemComposite.prototype.getChildren = function () {
        var piece = this.boardItem.getPiece();
        return piece ? [new PieceComposite_1.PieceComposite(piece)] : [];
    };
    BoardItemComposite.prototype.setChildren = function (children) { };
    BoardItemComposite.prototype.getJSON = function () {
        return this.boardItem;
    };
    BoardItemComposite.prototype.cleanCircularReferences = function () {
        this.boardItem.setBoard(null);
        var children = this.getChildren();
        children.forEach(function (children) { return children.cleanCircularReferences(); });
    };
    return BoardItemComposite;
}());
exports.BoardItemComposite = BoardItemComposite;
