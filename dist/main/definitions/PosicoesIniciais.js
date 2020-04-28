"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoPeca_1 = require("./TipoPeca");
var posicaoPeoesBrancos = [
    { line: 1, column: 0 },
    { line: 1, column: 1 },
    { line: 1, column: 2 },
    { line: 1, column: 3 },
    { line: 1, column: 4 },
    { line: 1, column: 5 },
    { line: 1, column: 6 },
    { line: 1, column: 7 },
];
var posicaoTorresBrancas = [
    { line: 0, column: 0 },
    { line: 0, column: 7 },
];
var posicaoCavalosBrancos = [
    { line: 0, column: 1 },
    { line: 0, column: 6 },
];
var posicaoBisposBrancos = [
    { line: 0, column: 2 },
    { line: 0, column: 5 },
];
var posicaoRainha = [{ line: 0, column: 3 }];
var posicaoRei = [{ line: 0, column: 4 }];
var vazios = [
    { line: 2, column: 0 },
    { line: 2, column: 1 },
    { line: 2, column: 2 },
    { line: 2, column: 3 },
    { line: 2, column: 4 },
    { line: 2, column: 5 },
    { line: 2, column: 6 },
    { line: 2, column: 7 },
    { line: 3, column: 0 },
    { line: 3, column: 1 },
    { line: 3, column: 2 },
    { line: 3, column: 3 },
    { line: 3, column: 4 },
    { line: 3, column: 5 },
    { line: 3, column: 6 },
    { line: 3, column: 7 },
    { line: 4, column: 0 },
    { line: 4, column: 1 },
    { line: 4, column: 2 },
    { line: 4, column: 3 },
    { line: 4, column: 4 },
    { line: 4, column: 5 },
    { line: 4, column: 6 },
    { line: 4, column: 7 },
    { line: 5, column: 0 },
    { line: 5, column: 1 },
    { line: 5, column: 2 },
    { line: 5, column: 3 },
    { line: 5, column: 4 },
    { line: 5, column: 5 },
    { line: 5, column: 6 },
    { line: 5, column: 7 },
];
exports.MapPosicaoPecasBrancas = new Map([
    [TipoPeca_1.TipoPeca.PEAO, posicaoPeoesBrancos],
    [TipoPeca_1.TipoPeca.TORRE, posicaoTorresBrancas],
    [TipoPeca_1.TipoPeca.CAVALO, posicaoCavalosBrancos],
    [TipoPeca_1.TipoPeca.BISPO, posicaoBisposBrancos],
    [TipoPeca_1.TipoPeca.RAINHA, posicaoRainha],
    [TipoPeca_1.TipoPeca.REI, posicaoRei],
    [TipoPeca_1.TipoPeca.VAZIO, vazios],
]);
var posicaoPeoesPretos = [
    { line: 6, column: 0 },
    { line: 6, column: 1 },
    { line: 6, column: 2 },
    { line: 6, column: 3 },
    { line: 6, column: 4 },
    { line: 6, column: 5 },
    { line: 6, column: 6 },
    { line: 6, column: 7 },
];
var posicaoTorresPretos = [
    { line: 7, column: 0 },
    { line: 7, column: 7 },
];
var posicaoCavalosPretos = [
    { line: 7, column: 1 },
    { line: 7, column: 6 },
];
var posicaoBisposPretos = [
    { line: 7, column: 2 },
    { line: 7, column: 5 },
];
var posicaoRainhaPreto = [{ line: 7, column: 3 }];
var posicaoReiPreto = [{ line: 7, column: 4 }];
exports.MapPosicaoPecasPretas = new Map([
    [TipoPeca_1.TipoPeca.PEAO, posicaoPeoesPretos],
    [TipoPeca_1.TipoPeca.TORRE, posicaoTorresPretos],
    [TipoPeca_1.TipoPeca.CAVALO, posicaoCavalosPretos],
    [TipoPeca_1.TipoPeca.BISPO, posicaoBisposPretos],
    [TipoPeca_1.TipoPeca.RAINHA, posicaoRainhaPreto],
    [TipoPeca_1.TipoPeca.REI, posicaoReiPreto],
]);
