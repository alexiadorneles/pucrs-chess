"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var models_1 = require("../models");
var PieceComposite_1 = require("./PieceComposite");
var BoardItemComposite = (function () {
    function BoardItemComposite(model, parent, engine) {
        this.model = model;
        this.parent = parent;
        this.engine = engine;
        this.cleanCircularReferences = this.cleanCircularReferences.bind(this);
        this.onClick = this.onClick.bind(this);
        this.model.set('board', parent.getModel().get('control'));
        this.model.set('control', model);
    }
    BoardItemComposite.prototype.getModel = function () {
        return this.model;
    };
    BoardItemComposite.prototype.getParent = function () {
        return this.parent;
    };
    BoardItemComposite.prototype.onClick = function (event) {
        var piece = this.getChildren()[0];
        if (!this.model.get('isHighlighted')) {
            if (piece) {
                this.engine.setCurrentMovingPiece(piece.getModel());
                this.engine.highlightItem(this);
            }
        }
        else {
            if (!piece) {
                if (this.engine.getCurrentMovingPiece()) {
                    this.engine.movePiece(this.getParent(), this);
                }
            }
            else {
                if (this.engine.getCurrentMovingPiece()) {
                    if (!lodash_1.default.isEqual(piece, this.engine.getCurrentMovingPiece())) {
                        this.engine.movePiece(this.getParent(), this);
                    }
                }
                this.engine.removeItemHighlight(this);
            }
        }
    };
    BoardItemComposite.prototype.createElement = function () {
        var container = document.createElement('div');
        container.setAttribute('class', 'container');
        var square = document.createElement('span');
        square.setAttribute('class', "fas fa-square-full chess-square " + this.model.get('color'));
        square.addEventListener('click', this.onClick);
        container.append(square);
        this.model.set('element', square);
        return container;
    };
    BoardItemComposite.createFromJSON = function (object, parent, engine) {
        var boardItem = Object.assign(new models_1.BoardItem(object.position, object.color), object);
        var piece = boardItem.getPiece();
        var composite = new BoardItemComposite(boardItem, parent, engine);
        piece && PieceComposite_1.PieceComposite.createFromJSON(piece, composite, engine);
        return composite;
    };
    BoardItemComposite.prototype.getChildren = function () {
        var piece = this.model.get('piece');
        return piece ? [new PieceComposite_1.PieceComposite(piece, this, this.engine)] : [];
    };
    BoardItemComposite.prototype.getJSON = function () {
        return this.model;
    };
    BoardItemComposite.prototype.cleanCircularReferences = function () {
        this.model.set('board', null);
        var children = this.getChildren();
        children.forEach(function (children) { return children.cleanCircularReferences(); });
    };
    return BoardItemComposite;
}());
exports.BoardItemComposite = BoardItemComposite;
