"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModificadorImpl = (function () {
    function ModificadorImpl(quantity, apply) {
        this.quantity = quantity;
        this.apply = apply;
        this.quantity = quantity;
        this.apply = apply.bind(this, quantity);
    }
    ModificadorImpl.soma = function (quantidade, propriedade) { return propriedade + quantidade; };
    ModificadorImpl.subtracao = function (quantidade, propriedade) { return propriedade - quantidade; };
    return ModificadorImpl;
}());
exports.ModificadorImpl = ModificadorImpl;
