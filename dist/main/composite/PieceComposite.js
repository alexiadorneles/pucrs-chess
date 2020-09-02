"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PieceBuilder_1 = require("../domain/PieceBuilder");
var MovementComposite_1 = require("./MovementComposite");
var PieceComposite = (function () {
    function PieceComposite(piece) {
        this.piece = piece;
        this.cleanCircularReferences = this.cleanCircularReferences.bind(this);
    }
    PieceComposite.prototype.createElement = function () {
        var pieceType = (this.piece && this.piece.getKind()) || '';
        var pieceColor = (this.piece && this.piece.getColor()) || '';
        var pieceIcon = document.createElement('i');
        pieceIcon.setAttribute('class', "fas fa-" + pieceType + " piece " + pieceColor);
        return pieceIcon;
    };
    PieceComposite.createFromJSON = function (object) {
        if (!object)
            return;
        var instantiationFn = PieceBuilder_1.PieceBuilderMap.get(object.kind);
        var piece = Object.assign(new instantiationFn(object.color), object);
        piece.setMovements(piece.getMovements().map(function (mov) { return MovementComposite_1.MovementComposite.createFromJSON(mov).movement; }));
        return new PieceComposite(piece);
    };
    PieceComposite.prototype.getChildren = function () {
        var movements = this.piece.getMovements();
        return movements.map(function (movement) { return new MovementComposite_1.MovementComposite(movement); });
    };
    PieceComposite.prototype.getJSON = function () {
        return this.piece;
    };
    PieceComposite.prototype.setChildren = function (children) { };
    PieceComposite.prototype.cleanCircularReferences = function () {
        this.piece.addToItem(null);
    };
    return PieceComposite;
}());
exports.PieceComposite = PieceComposite;
