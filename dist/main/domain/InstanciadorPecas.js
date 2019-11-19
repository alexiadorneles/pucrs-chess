"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var PosicoesIniciais_1 = require("../definitions/PosicoesIniciais");
var TipoPeca_1 = require("../definitions/TipoPeca");
var DefinidorCores_1 = require("./DefinidorCores");
var ItemTabuleiro_1 = require("./ItemTabuleiro");
var Bispo_1 = require("./peca/Bispo");
var Cavalo_1 = require("./peca/Cavalo");
var Peao_1 = require("./peca/Peao");
var Rainha_1 = require("./peca/Rainha");
var Rei_1 = require("./peca/Rei");
var Torre_1 = require("./peca/Torre");
var MovimentoDiagonal_1 = require("./movimento/MovimentoDiagonal");
var MovimentoHorizontal_1 = require("./movimento/MovimentoHorizontal");
var MovimentoVertical_1 = require("./movimento/MovimentoVertical");
var MovimentoL_1 = require("./movimento/MovimentoL");
exports.InstanciadorTipoMap = new Map([
    [TipoPeca_1.TipoPeca.PEAO, Peao_1.Peao],
    [TipoPeca_1.TipoPeca.CAVALO, Cavalo_1.Cavalo],
    [TipoPeca_1.TipoPeca.BISPO, Bispo_1.Bispo],
    [TipoPeca_1.TipoPeca.RAINHA, Rainha_1.Rainha],
    [TipoPeca_1.TipoPeca.REI, Rei_1.Rei],
    [TipoPeca_1.TipoPeca.TORRE, Torre_1.Torre],
]);
exports.InstanciadorMovimentoMap = (_a = {},
    _a[2] = MovimentoDiagonal_1.MovimentoDiagonal,
    _a[0] = MovimentoHorizontal_1.MovimentoHorizontal,
    _a[1] = MovimentoVertical_1.MovimentoVertical,
    _a[3] = MovimentoL_1.MovimentoL,
    _a);
var InstanciadorPecas;
(function (InstanciadorPecas) {
    function instanciar(tipo, corPeca) {
        var map = corPeca === "white" ? PosicoesIniciais_1.MapPosicaoPecasBrancas : PosicoesIniciais_1.MapPosicaoPecasPretas;
        return map.get(tipo).map(function (posicao) {
            var clazz = exports.InstanciadorTipoMap.get(tipo);
            var item = new ItemTabuleiro_1.ItemTabuleiro(posicao, DefinidorCores_1.DefinidorCores.definir(posicao));
            var peca = new clazz(corPeca);
            item.atribuirPeca(peca);
            return item;
        });
    }
    InstanciadorPecas.instanciar = instanciar;
})(InstanciadorPecas = exports.InstanciadorPecas || (exports.InstanciadorPecas = {}));
