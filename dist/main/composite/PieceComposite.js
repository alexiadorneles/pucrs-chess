"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PieceBuilder_1 = require("../domain/PieceBuilder");
var MovementComposite_1 = require("./MovementComposite");
var PieceComposite = (function () {
    function PieceComposite(piece, parent, engine) {
        this.piece = piece;
        this.parent = parent;
        this.engine = engine;
        this.cleanCircularReferences = this.cleanCircularReferences.bind(this);
    }
    PieceComposite.prototype.getModel = function () {
        return this.piece;
    };
    PieceComposite.prototype.getParent = function () {
        return this.parent;
    };
    PieceComposite.prototype.createElement = function () {
        var pieceType = (this.piece && this.piece.get('kind')) || '';
        var pieceColor = (this.piece && this.piece.get('color')) || '';
        var pieceIcon = document.createElement('i');
        pieceIcon.setAttribute('class', "fas fa-" + pieceType + " piece " + pieceColor);
        return pieceIcon;
    };
    PieceComposite.createFromJSON = function (object, parent, engine) {
        var _this = this;
        if (!object)
            return;
        var instantiationFn = PieceBuilder_1.PieceBuilderMap.get(object.kind);
        var piece = Object.assign(new instantiationFn(object.color), object);
        var mapMovements = function (mov) {
            return MovementComposite_1.MovementComposite.createFromJSON(mov, _this, engine)
                .getModel()
                .get('control');
        };
        piece.set('movements', piece.get('movements').map(function (mov) {
            return MovementComposite_1.MovementComposite.createFromJSON(mov, _this, engine)
                .getModel()
                .get('control');
        }));
        return new PieceComposite(piece, parent, engine);
    };
    PieceComposite.prototype.getChildren = function () {
        var _this = this;
        return this.piece
            .get('movements')
            .map(function (movement) { return new MovementComposite_1.MovementComposite(movement, _this, _this.engine); });
    };
    PieceComposite.prototype.getJSON = function () {
        return this.piece;
    };
    PieceComposite.prototype.cleanCircularReferences = function () {
        this.piece.addToItem(null);
    };
    return PieceComposite;
}());
exports.PieceComposite = PieceComposite;
