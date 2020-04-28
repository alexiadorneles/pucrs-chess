"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PieceKind_1 = require("./PieceKind");
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
var whiteRookPosition = [
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
    [PieceKind_1.PieceKind.PAWN, whitePawnPosition],
    [PieceKind_1.PieceKind.ROOK, whiteRookPosition],
    [PieceKind_1.PieceKind.KNIGHT, whiteKnightPosition],
    [PieceKind_1.PieceKind.BISHOP, whiteBishopPosition],
    [PieceKind_1.PieceKind.QUEEN, whiteQueenPosition],
    [PieceKind_1.PieceKind.KING, whiteKingPosition],
    [PieceKind_1.PieceKind.EMPTY, emptySpace],
]);
var pinkPawnPosition = [
    { line: 6, column: 0 },
    { line: 6, column: 1 },
    { line: 6, column: 2 },
    { line: 6, column: 3 },
    { line: 6, column: 4 },
    { line: 6, column: 5 },
    { line: 6, column: 6 },
    { line: 6, column: 7 },
];
var pinkRookPosition = [
    { line: 7, column: 0 },
    { line: 7, column: 7 },
];
var pinkKnightPosition = [
    { line: 7, column: 1 },
    { line: 7, column: 6 },
];
var pinkBishopsPosition = [
    { line: 7, column: 2 },
    { line: 7, column: 5 },
];
var pinkQueenPosition = [{ line: 7, column: 3 }];
var pinkKingPosition = [{ line: 7, column: 4 }];
exports.BlackPiecesPositionMap = new Map([
    [PieceKind_1.PieceKind.PAWN, pinkPawnPosition],
    [PieceKind_1.PieceKind.ROOK, pinkRookPosition],
    [PieceKind_1.PieceKind.KNIGHT, pinkKnightPosition],
    [PieceKind_1.PieceKind.BISHOP, pinkBishopsPosition],
    [PieceKind_1.PieceKind.QUEEN, pinkQueenPosition],
    [PieceKind_1.PieceKind.KING, pinkKingPosition],
]);
