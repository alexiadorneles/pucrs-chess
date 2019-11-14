"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemTabuleiro_1 = require("./ItemTabuleiro");
var InstanciadorPecas_1 = require("../domain/InstanciadorPecas");
var TipoPeca_1 = require("../definitions/TipoPeca");
var PosicoesIniciais_1 = require("../definitions/PosicoesIniciais");
var DefinidorCores_1 = require("../domain/DefinidorCores");
var DOMGenerator_1 = require("../DOMGenerator");
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
            return _this;
        };
        this.adicionarItem = function (item) {
            var _a = item.getPosicao(), linha = _a.linha, coluna = _a.coluna;
            _this.posicoes[linha][coluna] = item;
            item.adicionarAoTabuleiro(_this);
        };
    }
    Tabuleiro.prototype.getItem = function (_a) {
        var linha = _a.linha, coluna = _a.coluna;
        var posicaoExiste = coluna < 8 && linha >= 0;
        return posicaoExiste ? this.posicoes[linha][coluna] : null;
    };
    Tabuleiro.prototype.destacarPosicoes = function (posicoes, itemEmQuestao) {
        var _this = this;
        posicoes.every(function (posicao) {
            if (_this.isPosicaoExistente(posicao)) {
                if (_this.isPosicaoOcupada(posicao, itemEmQuestao)) {
                    if (!_this.isEquals(posicao, itemEmQuestao.getPosicao())) {
                        return false;
                    }
                }
                else {
                    _this.getItem(posicao).setDestaque(true);
                }
                return true;
            }
        });
    };
    Tabuleiro.prototype.removerDestaques = function () {
        var removerDestaque = function (item) { return item.removerDestaque(); };
        this.percorrerTabuleiro(removerDestaque);
    };
    Tabuleiro.prototype.setPecaEmMovimento = function (peca) {
        this.pecaEmMovimento = peca;
    };
    Tabuleiro.prototype.isPecaEmMovimento = function () {
        return !!this.pecaEmMovimento;
    };
    Tabuleiro.prototype.moverPeca = function (itemClicado) {
        var itemDaPeca = this.pecaEmMovimento.getItemTabuleiro();
        itemClicado.atribuirPeca(this.pecaEmMovimento);
        this.pecaEmMovimento = null;
        itemDaPeca.atribuirPeca(null);
        DOMGenerator_1.DOMGenerator.getInstance().refresh();
    };
    Tabuleiro.prototype.percorrerTabuleiro = function (callback) {
        for (var linha = 0; linha < 8; linha++)
            for (var coluna = 0; coluna < 8; coluna++)
                callback(this.getItem({ linha: linha, coluna: coluna }));
    };
    Tabuleiro.prototype.isPosicaoExistente = function (posicao) {
        return (posicao.coluna < 8 && posicao.coluna >= 0) && (posicao.linha >= 0 && posicao.linha < 8);
    };
    Tabuleiro.prototype.isPosicaoOcupada = function (posicao, item) {
        if (this.isPosicaoExistente(posicao)) {
            return Boolean(this.getItem(posicao).getPeca());
        }
        return false;
    };
    Tabuleiro.prototype.isEquals = function (posicao, posicaoDois) {
        return (posicao.linha === posicaoDois.linha) && (posicao.coluna === posicaoDois.coluna);
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
