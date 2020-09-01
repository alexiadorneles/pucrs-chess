"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MovementComposite_1 = require("./MovementComposite");
var PieceComposite = (function () {
    function PieceComposite(piece, replicationFactory) {
        this.piece = piece;
        this.replicationFactory = replicationFactory;
    }
    PieceComposite.prototype.createElement = function () {
        var pieceType = (this.piece && this.piece.getKind()) || '';
        var pieceColor = (this.piece && this.piece.getColor()) || '';
        var pieceIcon = document.createElement('i');
        pieceIcon.setAttribute('class', "fas fa-" + pieceType + " piece " + pieceColor);
        return pieceIcon;
    };
    PieceComposite.prototype.clone = function () {
        var replicationAdapter = this.replicationFactory.createPieceReplicationAdapter();
        var piece = replicationAdapter.replicate(this.piece);
        return new PieceComposite(piece, this.replicationFactory);
    };
    PieceComposite.prototype.getChildren = function () {
        var _this = this;
        var movements = this.piece.getMovements();
        return movements.map(function (movement) { return new MovementComposite_1.MovementComposite(movement, _this.replicationFactory); });
    };
    PieceComposite.prototype.setChildren = function (children) { };
    return PieceComposite;
}());
exports.PieceComposite = PieceComposite;
