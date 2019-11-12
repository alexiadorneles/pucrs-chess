"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemTabuleiro_1 = require("./ItemTabuleiro");
var InstanciadorPecas_1 = require("../domain/InstanciadorPecas");
var TipoPeca_1 = require("../definitions/TipoPeca");
var PosicoesIniciais_1 = require("../definitions/PosicoesIniciais");
var DefinidorCores_1 = require("../domain/DefinidorCores");
var initilizarMatriz = function () {
    var itens = [];
    itens[0] = [];
    itens[1] = [];
    itens[2] = [];
    itens[3] = [];
    itens[4] = [];
    itens[5] = [];
    itens[6] = [];
    itens[7] = [];
    return itens;
};
var Tabuleiro = (function () {
    function Tabuleiro() {
        var _this = this;
        this.posicoes = initilizarMatriz();
        this.gerarTabuleiroInicial = function () {
            var brancas = _this.gerarPecas("white");
            var pretas = _this.gerarPecas("rosa");
            var vazias = _this.gerarPecasVazias();
            brancas.concat(pretas).concat(vazias).forEach(_this.adicionarItem);
        };
        this.adicionarItem = function (item) {
            var _a = item.getPosicao(), linha = _a.linha, coluna = _a.coluna;
            _this.posicoes[linha][coluna] = item;
            item.adicionarAoTabuleiro(_this);
        };
    }
    Tabuleiro.prototype.getItem = function (_a) {
        var linha = _a.linha, coluna = _a.coluna;
        return this.posicoes[linha][coluna];
    };
    Tabuleiro.prototype.destacarPosicoes = function (posicoes) {
        var _this = this;
        posicoes.forEach(function (posicao) {
            if (_this.isPosicaoValida(posicao)) {
                _this.getItem(posicao).setDestaque(true);
            }
        });
    };
    Tabuleiro.prototype.removerDestaques = function () {
        var removerDestaque = function (item) { return item.removerDestaque(); };
        this.percorrerTabuleiro(removerDestaque);
    };
    Tabuleiro.prototype.percorrerTabuleiro = function (callback) {
        for (var linha = 0; linha < 8; linha++)
            for (var coluna = 0; coluna < 8; coluna++)
                callback(this.getItem({ linha: linha, coluna: coluna }));
    };
    Tabuleiro.prototype.isPosicaoValida = function (posicao) {
        var posicaoExiste = posicao.coluna < 8 && posicao.linha >= 0;
        var posicaoLivre = !Boolean(this.getItem(posicao).getPeca());
        return posicaoExiste && posicaoLivre;
    };
    Tabuleiro.prototype.gerarPecas = function (cor) {
        return Object.values(TipoPeca_1.TipoPeca)
            .filter(function (value) { return !!value; })
            .reduce(function (agg, tipo) { return agg.concat(InstanciadorPecas_1.InstanciadorPecas.instanciar(tipo, cor)); }, []);
    };
    Tabuleiro.prototype.gerarPecasVazias = function () {
        return PosicoesIniciais_1.MapPosicaoPecasBrancas.get(TipoPeca_1.TipoPeca.VAZIO).map(function (posicao) { return new ItemTabuleiro_1.ItemTabuleiro(posicao, DefinidorCores_1.DefinidorCores.definir(posicao)); });
    };
    return Tabuleiro;
}());
exports.Tabuleiro = Tabuleiro;
