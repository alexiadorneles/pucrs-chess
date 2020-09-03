"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PieceBuilder_1 = require("../domain/PieceBuilder");
var MovementComposite = (function () {
    function MovementComposite(movement, parent, engine) {
        this.movement = movement;
        this.parent = parent;
        this.engine = engine;
        this.movement.set('control', this.movement);
    }
    MovementComposite.prototype.getModel = function () {
        return this.movement;
    };
    MovementComposite.prototype.getParent = function () {
        return this.parent;
    };
    MovementComposite.prototype.createElement = function () {
        return null;
    };
    MovementComposite.createFromJSON = function (object, parent, engine) {
        var model = new PieceBuilder_1.MovementBuilderMap[object.kind]();
        var movement = Object.assign(model, object);
        return new MovementComposite(movement, parent, engine);
    };
    MovementComposite.prototype.cleanCircularReferences = function () {
        throw new Error('Method not implemented.');
    };
    MovementComposite.prototype.getJSON = function () {
        return this.movement;
    };
    MovementComposite.prototype.getChildren = function () {
        return [];
    };
    return MovementComposite;
}());
exports.MovementComposite = MovementComposite;
