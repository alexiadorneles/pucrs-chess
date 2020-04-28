"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoPeca_1 = require("./TipoPeca");
var whitePawnPosition = [
    { line: 1, column: 0 },
    { line: 1, column: 1 },
    { line: 1, column: 2 },
    { line: 1, column: 3 },
    { line: 1, column: 4 },
    { line: 1, column: 5 },
    { line: 1, column: 6 },
    { line: 1, column: 7 },
];
var whiteTowerPosition = [
    { line: 0, column: 0 },
    { line: 0, column: 7 },
];
var whiteKnightPosition = [
    { line: 0, column: 1 },
    { line: 0, column: 6 },
];
var whiteBishopPosition = [
    { line: 0, column: 2 },
    { line: 0, column: 5 },
];
var whiteQueenPosition = [{ line: 0, column: 3 }];
var whiteKingPosition = [{ line: 0, column: 4 }];
var emptySpace = [
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
exports.WhitePiecesPositionMap = new Map([
    [TipoPeca_1.TipoPeca.PEAO, whitePawnPosition],
    [TipoPeca_1.TipoPeca.TORRE, whiteTowerPosition],
    [TipoPeca_1.TipoPeca.CAVALO, whiteKnightPosition],
    [TipoPeca_1.TipoPeca.BISPO, whiteBishopPosition],
    [TipoPeca_1.TipoPeca.RAINHA, whiteQueenPosition],
    [TipoPeca_1.TipoPeca.REI, whiteKingPosition],
    [TipoPeca_1.TipoPeca.VAZIO, emptySpace],
]);
var blackPawnPosition = [
    { line: 6, column: 0 },
    { line: 6, column: 1 },
    { line: 6, column: 2 },
    { line: 6, column: 3 },
    { line: 6, column: 4 },
    { line: 6, column: 5 },
    { line: 6, column: 6 },
    { line: 6, column: 7 },
];
var blackTowerPosition = [
    { line: 7, column: 0 },
    { line: 7, column: 7 },
];
var blackKnightPosition = [
    { line: 7, column: 1 },
    { line: 7, column: 6 },
];
var blackBishopsPosition = [
    { line: 7, column: 2 },
    { line: 7, column: 5 },
];
var blackQueenPosition = [{ line: 7, column: 3 }];
var blackKingPosition = [{ line: 7, column: 4 }];
exports.BlackPiecesPositionMap = new Map([
    [TipoPeca_1.TipoPeca.PEAO, blackPawnPosition],
    [TipoPeca_1.TipoPeca.TORRE, blackTowerPosition],
    [TipoPeca_1.TipoPeca.CAVALO, blackKnightPosition],
    [TipoPeca_1.TipoPeca.BISPO, blackBishopsPosition],
    [TipoPeca_1.TipoPeca.RAINHA, blackQueenPosition],
    [TipoPeca_1.TipoPeca.REI, blackKingPosition],
]);
