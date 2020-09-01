"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PieceComposite_1 = require("./PieceComposite");
var BoardItemComposite = (function () {
    function BoardItemComposite(boardItem, replicationFactory) {
        this.boardItem = boardItem;
        this.replicationFactory = replicationFactory;
        this.cleanCircularReferences = this.cleanCircularReferences.bind(this);
    }
    BoardItemComposite.prototype.createElement = function () {
        var div = document.createElement('div');
        div.setAttribute('class', 'container');
        var square = document.createElement('span');
        square.setAttribute('class', "fas fa-square-full chess-square " + this.boardItem.getColor());
        square.addEventListener('click', this.boardItem.onClick);
        this.boardItem.setElement(square);
        var piece = this.getChildren()[0];
        if (piece) {
            var pieceElement = piece.createElement();
            pieceElement.addEventListener('click', this.boardItem.onClick);
            div.appendChild(square);
            div.appendChild(pieceElement);
        }
        else {
            div.appendChild(square);
        }
        return div;
    };
    BoardItemComposite.prototype.clone = function () {
        var replicationAdapter = this.replicationFactory.createItemReplicationAdapter();
        var item = replicationAdapter.replicate(this.boardItem);
        return new BoardItemComposite(item, this.replicationFactory);
    };
    BoardItemComposite.prototype.getChildren = function () {
        var piece = this.boardItem.getPiece();
        return piece ? [new PieceComposite_1.PieceComposite(piece, this.replicationFactory)] : [];
    };
    BoardItemComposite.prototype.setChildren = function (children) { };
    BoardItemComposite.prototype.cleanCircularReferences = function () {
        this.boardItem.setBoard(null);
        var children = this.getChildren();
        children.forEach(function (children) { return children.cleanCircularReferences(); });
    };
    return BoardItemComposite;
}());
exports.BoardItemComposite = BoardItemComposite;
