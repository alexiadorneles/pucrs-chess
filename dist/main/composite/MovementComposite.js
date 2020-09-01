"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MovementComposite = (function () {
    function MovementComposite(movement, replicationFactory) {
        this.movement = movement;
        this.replicationFactory = replicationFactory;
    }
    MovementComposite.prototype.createElement = function () {
        return null;
    };
    MovementComposite.prototype.clone = function () {
        var replicationAdapter = this.replicationFactory.createMovementReplicationAdapter();
        var movement = replicationAdapter.replicate(this.movement);
        return new MovementComposite(movement, this.replicationFactory);
    };
    MovementComposite.prototype.getChildren = function () {
        return [];
    };
    MovementComposite.prototype.setChildren = function (children) { };
    return MovementComposite;
}());
exports.MovementComposite = MovementComposite;
