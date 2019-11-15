"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var ItemTabuleiro_1 = require("./ItemTabuleiro");
var InstanciadorPecas_1 = require("../domain/InstanciadorPecas");
var TipoPeca_1 = require("../definitions/TipoPeca");
var PosicoesIniciais_1 = require("../definitions/PosicoesIniciais");
var DefinidorCores_1 = require("../domain/DefinidorCores");
var Rainha_1 = require("../domain/peca/Rainha");
var DOMGenerator_1 = require("../DOMGenerator");
var lodash_1 = __importDefault(require("lodash"));
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
        if (itemEmQuestao.getPeca() instanceof Rainha_1.Rainha) {
            itemEmQuestao.getPeca().calculateMoviment(this);
            itemEmQuestao.getPeca().possibleMoves.forEach(function (_a) {
                var x = _a[0], y = _a[1];
                var posicao = { linha: x, coluna: y };
                if (_this.isPosicaoExistente(posicao) && !_this.isPosicaoOcupada(posicao)) {
                    _this.getItem(posicao).setDestaque(true);
                }
            });
        }
        else {
            posicoes.every(function (posicao) {
                if (_this.isPosicaoExistente(posicao)) {
                    if (_this.isPosicaoOcupada(posicao)) {
                        if (!_this.pecaEmMovimento.podeMover(posicao, true)) {
                            return false;
                        }
                    }
                    else {
                        _this.getItem(posicao).setDestaque(true);
                    }
                }
                return true;
            });
        }
    };
    Tabuleiro.prototype.removerDestaques = function () {
        var removerDestaque = function (item) { return item.removerDestaque(); };
        this.percorrerTabuleiro(removerDestaque);
    };
    Tabuleiro.prototype.setPecaEmMovimento = function (peca) {
        if (this.pecaEmMovimento && !lodash_1.default.isEqual(this.pecaEmMovimento, peca)) {
            this.removerDestaques();
        }
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
    Tabuleiro.prototype.isPosicaoOcupada = function (posicao) {
        if (this.isPosicaoExistente(posicao)) {
            return Boolean(this.getItem(posicao).getPeca());
        }
        return false;
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
