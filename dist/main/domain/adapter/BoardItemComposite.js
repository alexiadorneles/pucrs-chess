"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PieceComposite_1 = require("./PieceComposite");
var BoardItemComposite = (function () {
    function BoardItemComposite(boardItem, replicationFactory) {
        this.boardItem = boardItem;
        this.replicationFactory = replicationFactory;
    }
    BoardItemComposite.prototype.createElement = function () {
        var div = document.createElement('div');
        div.setAttribute('class', 'container');
        var square = document.createElement('span');
        square.setAttribute('class', "fas fa-square-full chess-square " + this.boardItem.getColor());
        square.addEventListener('click', this.boardItem.onClick);
        this.boardItem.setElement(square);
        var piece = this.getChildren()[0].createElement();
        piece.addEventListener('click', this.boardItem.onClick);
        div.appendChild(square);
        div.appendChild(piece);
        return div;
    };
    BoardItemComposite.prototype.clone = function () {
        var replicationAdapter = this.replicationFactory.createItemReplicationAdapter();
        var item = replicationAdapter.replicate(this.boardItem);
        return new BoardItemComposite(item, this.replicationFactory);
    };
    BoardItemComposite.prototype.getChildren = function () {
        var piece = this.boardItem.getPiece();
        return [new PieceComposite_1.PieceComposite(piece, this.replicationFactory)];
    };
    BoardItemComposite.prototype.setChildren = function (children) { };
    return BoardItemComposite;
}());
exports.BoardItemComposite = BoardItemComposite;
