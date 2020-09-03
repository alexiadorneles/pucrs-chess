"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var factory_1 = require("../factory");
var MovementComposite_1 = require("./MovementComposite");
var PieceComposite = (function () {
    function PieceComposite(piece, parent, engine) {
        this.piece = piece;
        this.parent = parent;
        this.engine = engine;
        this.cleanCircularReferences = this.cleanCircularReferences.bind(this);
        this.piece.set('boardItem', parent.getModel());
        this.piece.set('control', piece);
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
        var instantiationFn = factory_1.PieceBuilderMap.get(object.kind);
        var piece = Object.assign(new instantiationFn(object.color), object);
        var mapMovements = function (mov) {
            return MovementComposite_1.MovementComposite.createFromJSON(mov, _this)
                .getModel()
                .get('control');
        };
        piece.set('movements', piece.get('movements').map(function (mov) {
            return MovementComposite_1.MovementComposite.createFromJSON(mov, _this)
                .getModel()
                .get('control');
        }));
        return new PieceComposite(piece, parent, engine);
    };
    PieceComposite.prototype.getChildren = function () {
        var _this = this;
        return this.piece.get('movements').map(function (movement) { return new MovementComposite_1.MovementComposite(movement, _this); });
    };
    PieceComposite.prototype.getJSON = function () {
        return this.piece;
    };
    PieceComposite.prototype.cleanCircularReferences = function () {
        this.piece.set('boardItem', null);
    };
    return PieceComposite;
}());
exports.PieceComposite = PieceComposite;
