"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DefinidorCores;
(function (DefinidorCores) {
    function definir(_a) {
        var linha = _a.linha, coluna = _a.coluna;
        var cor = linha % 2 === 0 ? "green" : "black";
        var pares = cor;
        var impares = cor == "green" ? "black" : "green";
        return coluna % 2 === 0 ? pares : impares;
    }
    DefinidorCores.definir = definir;
})(DefinidorCores = exports.DefinidorCores || (exports.DefinidorCores = {}));
