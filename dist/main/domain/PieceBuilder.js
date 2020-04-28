"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var InitialPositions_1 = require("../definitions/InitialPositions");
var TipoPeca_1 = require("../definitions/TipoPeca");
var DefinidorCores_1 = require("./DefinidorCores");
var ItemTabuleiro_1 = require("./ItemTabuleiro");
var MovimentoDiagonal_1 = require("./movimento/MovimentoDiagonal");
var MovimentoHorizontal_1 = require("./movimento/MovimentoHorizontal");
var MovimentoL_1 = require("./movimento/MovimentoL");
var MovimentoVertical_1 = require("./movimento/MovimentoVertical");
var Bispo_1 = require("./peca/Bispo");
var Cavalo_1 = require("./peca/Cavalo");
var Peao_1 = require("./peca/Peao");
var Rainha_1 = require("./peca/Rainha");
var Rei_1 = require("./peca/Rei");
var Torre_1 = require("./peca/Torre");
exports.PieceBuilderMap = new Map([
    [TipoPeca_1.TipoPeca.PEAO, Peao_1.Peao],
    [TipoPeca_1.TipoPeca.CAVALO, Cavalo_1.Cavalo],
    [TipoPeca_1.TipoPeca.BISPO, Bispo_1.Bispo],
    [TipoPeca_1.TipoPeca.RAINHA, Rainha_1.Rainha],
    [TipoPeca_1.TipoPeca.REI, Rei_1.Rei],
    [TipoPeca_1.TipoPeca.TORRE, Torre_1.Torre],
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
        var map = pieceColor === "grey" ? InitialPositions_1.MapPosicaoPecasBrancas : InitialPositions_1.MapPosicaoPecasPretas;
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
