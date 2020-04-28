"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var InitialPositions_1 = require("../definitions/InitialPositions");
var PieceKind_1 = require("../definitions/PieceKind");
var DefinidorCores_1 = require("./DefinidorCores");
var ItemTabuleiro_1 = require("./ItemTabuleiro");
var MovimentoDiagonal_1 = require("./movement/MovimentoDiagonal");
var MovimentoHorizontal_1 = require("./movement/MovimentoHorizontal");
var MovimentoL_1 = require("./movement/MovimentoL");
var MovimentoVertical_1 = require("./movement/MovimentoVertical");
var Bispo_1 = require("./peca/Bispo");
var Cavalo_1 = require("./peca/Cavalo");
var Peao_1 = require("./peca/Peao");
var Rainha_1 = require("./peca/Rainha");
var Rei_1 = require("./peca/Rei");
var Torre_1 = require("./peca/Torre");
exports.PieceBuilderMap = new Map([
    [PieceKind_1.PieceKind.PAWN, Peao_1.Peao],
    [PieceKind_1.PieceKind.KNIGHT, Cavalo_1.Cavalo],
    [PieceKind_1.PieceKind.BISHOP, Bispo_1.Bispo],
    [PieceKind_1.PieceKind.QUEEN, Rainha_1.Rainha],
    [PieceKind_1.PieceKind.KING, Rei_1.Rei],
    [PieceKind_1.PieceKind.TOWER, Torre_1.Torre],
]);
exports.MovementBuilderMap = (_a = {},
    _a[2] = MovimentoDiagonal_1.MovimentoDiagonal,
    _a[0] = MovimentoHorizontal_1.MovimentoHorizontal,
    _a[1] = MovimentoVertical_1.MovimentoVertical,
    _a[3] = MovimentoL_1.MovimentoL,
    _a);
var PieceBuilder;
(function (PieceBuilder) {
    function build(kind, pieceColor) {
        var map = pieceColor === "grey" ? InitialPositions_1.WhitePiecesPositionMap : InitialPositions_1.BlackPiecesPositionMap;
        return map.get(kind).map(function (position) {
            var clazz = exports.PieceBuilderMap.get(kind);
            var item = new ItemTabuleiro_1.ItemTabuleiro(position, DefinidorCores_1.ColorAdapter.defineItemColor(position));
            var peca = new clazz(pieceColor);
            item.atribuirPeca(peca);
            return item;
        });
    }
    PieceBuilder.build = build;
})(PieceBuilder = exports.PieceBuilder || (exports.PieceBuilder = {}));
