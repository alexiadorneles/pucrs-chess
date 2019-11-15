"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ModificadorImpl = (function () {
    function ModificadorImpl(quantidade, apply) {
        this.quantidade = quantidade;
        this.apply = apply;
        this.quantidade = quantidade;
        this.apply = apply.bind(this, quantidade);
    }
    ModificadorImpl.soma = function (quantidade, propriedade) { return propriedade + quantidade; };
    ModificadorImpl.subtracao = function (quantidade, propriedade) { return propriedade - quantidade; };
    return ModificadorImpl;
}());
exports.ModificadorImpl = ModificadorImpl;
