"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ItemTabuleiro_1 = require("./ItemTabuleiro");
var Peoes_1 = require("./peca/Peoes");
var MovimentoVertical_1 = require("./movimento/MovimentoVertical");
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
        this.posicoes = initilizarMatriz();
    }
    Tabuleiro.prototype.gerarTabuleiroInicial = function () {
        var peoesBrancos = this.instanciarPeoes("white");
        for (var linha_1 = 0; linha_1 < 8; linha_1++) {
            var cor = linha_1 % 2 === 0 ? "green" : "black";
            var pares = cor;
            var impares = cor == "green" ? "black" : "green";
            this.posicoes[linha_1][0] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, pares);
            this.posicoes[linha_1][1] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, impares);
            this.posicoes[linha_1][2] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, pares);
            this.posicoes[linha_1][3] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, impares);
            this.posicoes[linha_1][4] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, pares);
            this.posicoes[linha_1][5] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, impares);
            this.posicoes[linha_1][6] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, pares);
            this.posicoes[linha_1][7] = new ItemTabuleiro_1.ItemTabuleiro(linha_1, linha_1, impares);
        }
        var linha = 1;
        for (var coluna = 0; coluna < 8; coluna++) {
            var pares = "black";
            var impares = "green";
            var cor = coluna % 2 === 0 ? pares : impares;
            var item = new ItemTabuleiro_1.ItemTabuleiro(linha, coluna, cor);
            item.adicionarPeca(peoesBrancos[coluna]);
            this.posicoes[linha][coluna] = item;
        }
    };
    Tabuleiro.prototype.getItem = function (linha, coluna) {
        return this.posicoes[linha][coluna];
    };
    Tabuleiro.prototype.instanciarPeoes = function (cor) {
        var peoes = [];
        var movimentos = [new MovimentoVertical_1.MovimentoVertical()];
        for (var i = 0; i < 8; i++) {
            var peao = new Peoes_1.Peao(cor, movimentos);
            peoes.push(peao);
        }
        return peoes;
    };
    return Tabuleiro;
}());
exports.Tabuleiro = Tabuleiro;
