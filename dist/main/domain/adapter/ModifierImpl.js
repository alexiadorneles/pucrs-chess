"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModifierImpl = (function () {
    function ModifierImpl(quantity, apply) {
        this.quantity = quantity;
        this.apply = apply;
        this.quantity = quantity;
        this.apply = apply.bind(this, quantity);
    }
    ModifierImpl.sum = function (quantity, property) { return property + quantity; };
    ModifierImpl.minus = function (quantity, property) { return property - quantity; };
    return ModifierImpl;
}());
exports.ModifierImpl = ModifierImpl;
