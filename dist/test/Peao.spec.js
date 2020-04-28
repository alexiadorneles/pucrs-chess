"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var lodash_1 = __importDefault(require("lodash"));
require("mocha");
var sinon_1 = __importDefault(require("sinon"));
var ItemTabuleiro_1 = require("../main/domain/ItemTabuleiro");
var Pawn_1 = require("../main/domain/piece/Pawn");
var Tabuleiro_1 = require("../main/domain/Tabuleiro");
context('Peao', function () {
    describe('ao chamar adicionarAoItem', function () {
        it('deve atribuir propriedade item', function () {
            var peao = new Pawn_1.Pawn("white");
            var item = new ItemTabuleiro_1.ItemTabuleiro({ line: 0, column: 0 }, "black");
            peao.addToItem(item);
            chai_1.expect(peao.getBoardItem()).to.deep.equals(item);
        });
    });
    describe('ao chamar simularMovimento', function () {
        it('quando caminho livre deve retornar posição atual e uma para frente', function () {
            var tabuleiro = new Tabuleiro_1.Tabuleiro();
            var posicaoPeao = { line: 1, column: 2 };
            sinon_1.default.replace(tabuleiro, 'getItem', function (posicao) {
                return lodash_1.default.isEqual(posicaoPeao, posicao) ? item : new ItemTabuleiro_1.ItemTabuleiro(posicao, "grey");
            });
            var peao = new Pawn_1.Pawn("grey");
            var item = new ItemTabuleiro_1.ItemTabuleiro(posicaoPeao, "black");
            item.atribuirPeca(peao);
            tabuleiro.adicionarItem(item);
            var esperado = [{ line: 2, column: 2 }];
            var resultado = peao.simulateMovement();
            chai_1.expect(resultado).to.deep.equals(esperado);
        });
    });
});
