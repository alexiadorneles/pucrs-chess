"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var adapter_1 = require("../adapter");
var InitialPositions_1 = require("../constants/InitialPositions");
var PieceKind_1 = require("../definitions/PieceKind");
var BoardItem_1 = require("../models/board/BoardItem");
var DiagonalMovement_1 = require("../models/movement/DiagonalMovement");
var HorizontalMovement_1 = require("../models/movement/HorizontalMovement");
var LMovement_1 = require("../models/movement/LMovement");
var VerticalMovement_1 = require("../models/movement/VerticalMovement");
var Bishop_1 = require("../models/piece/Bishop");
var King_1 = require("../models/piece/King");
var Knight_1 = require("../models/piece/Knight");
var Pawn_1 = require("../models/piece/Pawn");
var Queen_1 = require("../models/piece/Queen");
var Rook_1 = require("../models/piece/Rook");
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
var PieceFactory;
(function (PieceFactory) {
    function createPiece(kind, pieceColor) {
        var map = pieceColor === "white" ? InitialPositions_1.WhitePiecesPositionMap : InitialPositions_1.PinkPiecesPositionMap;
        return map.get(kind).map(function (position) {
            var clazz = exports.PieceBuilderMap.get(kind);
            var item = new BoardItem_1.BoardItem(position, adapter_1.ColorAdapter.defineItemColor(position));
            var piece = new clazz(pieceColor);
            item.set('piece', piece);
            return item;
        });
    }
    PieceFactory.createPiece = createPiece;
})(PieceFactory = exports.PieceFactory || (exports.PieceFactory = {}));
