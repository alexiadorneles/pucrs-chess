"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
require("mocha");
var ItemTabuleiro_1 = require("../main/domain/ItemTabuleiro");
var Peao_1 = require("../main/domain/peca/Peao");
var Tabuleiro_1 = require("../main/domain/Tabuleiro");
context('Peao', function () {
    describe('ao chamar adicionarAoItem', function () {
        it('deve atribuir propriedade item', function () {
            var peao = new Peao_1.Peao("white");
            var item = new ItemTabuleiro_1.ItemTabuleiro({ linha: 0, coluna: 0 }, "black");
            peao.adicionarAoItem(item);
            chai_1.expect(peao.getItemTabuleiro()).to.deep.equals(item);
        });
    });
    describe('ao chamar simularMovimento', function () {
        it('quando caminho livre deve retornar posição atual e uma para frente', function () {
            var tabuleiro = new Tabuleiro_1.Tabuleiro();
            var peao = new Peao_1.Peao("white");
            var item = new ItemTabuleiro_1.ItemTabuleiro({ linha: 1, coluna: 2 }, "black");
            item.atribuirPeca(peao);
            tabuleiro.adicionarItem(item);
            var esperado = [{ linha: 2, coluna: 2 }];
            var resultado = peao.simularMovimento();
            chai_1.expect(resultado).to.deep.equals(esperado);
        });
    });
});
