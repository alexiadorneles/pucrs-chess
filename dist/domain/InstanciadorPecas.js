"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TipoPeca_1 = require("../definitions/TipoPeca");
var PosicoesIniciais_1 = require("../definitions/PosicoesIniciais");
var ItemTabuleiro_1 = require("../domain/ItemTabuleiro");
var DefinidorCores_1 = require("./DefinidorCores");
var Cavalo_1 = require("../domain/peca/Cavalo");
var Peoes_1 = require("../domain/peca/Peoes");
var Bispo_1 = require("../domain/peca/Bispo");
var Rainha_1 = require("../domain/peca/Rainha");
var Rei_1 = require("../domain/peca/Rei");
var Torre_1 = require("../domain/peca/Torre");
var InstanciadorTipoMap = new Map([
    [TipoPeca_1.TipoPeca.PEAO, Peoes_1.Peao],
    [TipoPeca_1.TipoPeca.CAVALO, Cavalo_1.Cavalo],
    [TipoPeca_1.TipoPeca.BISPO, Bispo_1.Bispo],
    [TipoPeca_1.TipoPeca.RAINHA, Rainha_1.Rainha],
    [TipoPeca_1.TipoPeca.REI, Rei_1.Rei],
    [TipoPeca_1.TipoPeca.TORRE, Torre_1.Torre],
]);
var InstanciadorPecas;
(function (InstanciadorPecas) {
    function instanciar(tipo, corPeca) {
        var map = corPeca === "white" ? PosicoesIniciais_1.MapPosicaoPecasBrancas : PosicoesIniciais_1.MapPosicaoPecasPretas;
        return map.get(tipo).map(function (posicao) {
            var clazz = InstanciadorTipoMap.get(tipo);
            var item = new ItemTabuleiro_1.ItemTabuleiro(posicao, DefinidorCores_1.DefinidorCores.definir(posicao));
            var peca = new clazz(corPeca);
            item.adicionarPeca(peca);
            return item;
        });
    }
    InstanciadorPecas.instanciar = instanciar;
})(InstanciadorPecas = exports.InstanciadorPecas || (exports.InstanciadorPecas = {}));
