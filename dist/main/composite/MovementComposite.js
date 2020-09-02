"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PieceBuilder_1 = require("../domain/PieceBuilder");
var MovementComposite = (function () {
    function MovementComposite(movement) {
        this.movement = movement;
    }
    MovementComposite.prototype.createElement = function () {
        return null;
    };
    MovementComposite.createFromJSON = function (object) {
        var model = new PieceBuilder_1.MovementBuilderMap[object.kind]();
        var movement = Object.assign(model, object);
        return new MovementComposite(movement);
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
    MovementComposite.prototype.setChildren = function (children) { };
    return MovementComposite;
}());
exports.MovementComposite = MovementComposite;
