"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoPeca_1 = require("../definitions/TipoPeca");
var posicaoPeoesBrancos = [
    { linha: 1, coluna: 0 },
    { linha: 1, coluna: 1 },
    { linha: 1, coluna: 2 },
    { linha: 1, coluna: 3 },
    { linha: 1, coluna: 4 },
    { linha: 1, coluna: 5 },
    { linha: 1, coluna: 6 },
    { linha: 1, coluna: 7 },
];
var posicaoTorresBrancas = [
    { linha: 0, coluna: 0 },
    { linha: 0, coluna: 7 },
];
var posicaoCavalosBrancos = [
    { linha: 0, coluna: 1 },
    { linha: 0, coluna: 6 },
];
var posicaoBisposBrancos = [
    { linha: 0, coluna: 2 },
    { linha: 0, coluna: 5 },
];
var posicaoRainha = [
    { linha: 0, coluna: 3 },
];
var posicaoRei = [
    { linha: 0, coluna: 4 },
];
var vazios = [
    { linha: 2, coluna: 0 },
    { linha: 2, coluna: 1 },
    { linha: 2, coluna: 2 },
    { linha: 2, coluna: 3 },
    { linha: 2, coluna: 4 },
    { linha: 2, coluna: 5 },
    { linha: 2, coluna: 6 },
    { linha: 2, coluna: 7 },
    { linha: 3, coluna: 0 },
    { linha: 3, coluna: 1 },
    { linha: 3, coluna: 2 },
    { linha: 3, coluna: 3 },
    { linha: 3, coluna: 4 },
    { linha: 3, coluna: 5 },
    { linha: 3, coluna: 6 },
    { linha: 3, coluna: 7 },
    { linha: 4, coluna: 0 },
    { linha: 4, coluna: 1 },
    { linha: 4, coluna: 2 },
    { linha: 4, coluna: 3 },
    { linha: 4, coluna: 4 },
    { linha: 4, coluna: 5 },
    { linha: 4, coluna: 6 },
    { linha: 4, coluna: 7 },
    { linha: 5, coluna: 0 },
    { linha: 5, coluna: 1 },
    { linha: 5, coluna: 2 },
    { linha: 5, coluna: 3 },
    { linha: 5, coluna: 4 },
    { linha: 5, coluna: 5 },
    { linha: 5, coluna: 6 },
    { linha: 5, coluna: 7 },
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
    { linha: 6, coluna: 0 },
    { linha: 6, coluna: 1 },
    { linha: 6, coluna: 2 },
    { linha: 6, coluna: 3 },
    { linha: 6, coluna: 4 },
    { linha: 6, coluna: 5 },
    { linha: 6, coluna: 6 },
    { linha: 6, coluna: 7 },
];
var posicaoTorresPretos = [
    { linha: 7, coluna: 0 },
    { linha: 7, coluna: 7 },
];
var posicaoCavalosPretos = [
    { linha: 7, coluna: 1 },
    { linha: 7, coluna: 6 },
];
var posicaoBisposPretos = [
    { linha: 7, coluna: 2 },
    { linha: 7, coluna: 5 },
];
var posicaoRainhaPreto = [
    { linha: 7, coluna: 3 },
];
var posicaoReiPreto = [
    { linha: 7, coluna: 4 },
];
exports.MapPosicaoPecasPretas = new Map([
    [TipoPeca_1.TipoPeca.PEAO, posicaoPeoesPretos],
    [TipoPeca_1.TipoPeca.TORRE, posicaoTorresPretos],
    [TipoPeca_1.TipoPeca.CAVALO, posicaoCavalosPretos],
    [TipoPeca_1.TipoPeca.BISPO, posicaoBisposPretos],
    [TipoPeca_1.TipoPeca.RAINHA, posicaoRainhaPreto],
    [TipoPeca_1.TipoPeca.REI, posicaoReiPreto],
]);
