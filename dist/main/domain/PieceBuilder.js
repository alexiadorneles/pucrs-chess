"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var InitialPositions_1 = require("./InitialPositions");
var PieceKind_1 = require("../definitions/PieceKind");
var ColorAdapter_1 = require("./ColorAdapter");
var BoardItem_1 = require("./board/BoardItem");
var DiagonalMovement_1 = require("./movement/DiagonalMovement");
var HorizontalMovement_1 = require("./movement/HorizontalMovement");
var LMovement_1 = require("./movement/LMovement");
var VerticalMovement_1 = require("./movement/VerticalMovement");
var Bishop_1 = require("./piece/Bishop");
var Knight_1 = require("./piece/Knight");
var Pawn_1 = require("./piece/Pawn");
var Queen_1 = require("./piece/Queen");
var King_1 = require("./piece/King");
var Rook_1 = require("./piece/Rook");
exports.PieceBuilderMap = new Map([
    [PieceKind_1.PieceKind.PAWN, Pawn_1.Pawn],
    [PieceKind_1.PieceKind.KNIGHT, Knight_1.Knight],
    [PieceKind_1.PieceKind.BISHOP, Bishop_1.Bishop],
    [PieceKind_1.PieceKind.QUEEN, Queen_1.Queen],
    [PieceKind_1.PieceKind.KING, King_1.King],
    [PieceKind_1.PieceKind.ROOK, Rook_1.Rook],
]);
exports.MovementBuilderMap = (_a = {},
    _a[2] = DiagonalMovement_1.DiagonalMovement,
    _a[0] = HorizontalMovement_1.HorizontalMovement,
    _a[1] = VerticalMovement_1.VerticalMovement,
    _a[3] = LMovement_1.LMovement,
    _a);
var PieceBuilder;
(function (PieceBuilder) {
    function build(kind, pieceColor) {
        var map = pieceColor === "white" ? InitialPositions_1.WhitePiecesPositionMap : InitialPositions_1.BlackPiecesPositionMap;
        return map.get(kind).map(function (position) {
            var clazz = exports.PieceBuilderMap.get(kind);
            var item = new BoardItem_1.BoardItem(position, ColorAdapter_1.ColorAdapter.defineItemColor(position));
            var piece = new clazz(pieceColor);
            item.addPiece(piece);
            return item;
        });
    }
    PieceBuilder.build = build;
})(PieceBuilder = exports.PieceBuilder || (exports.PieceBuilder = {}));
