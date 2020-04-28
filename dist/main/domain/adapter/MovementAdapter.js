"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MovementAdapter = (function () {
    function MovementAdapter(quantity, apply) {
        this.quantity = quantity;
        this.apply = apply;
        this.quantity = quantity;
        this.apply = apply.bind(this, quantity);
    }
    MovementAdapter.sum = function (quantity, property) { return property + quantity; };
    MovementAdapter.minus = function (quantity, property) { return property - quantity; };
    return MovementAdapter;
}());
exports.MovementAdapter = MovementAdapter;
