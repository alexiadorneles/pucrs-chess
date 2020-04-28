"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
require("mocha");
var sinon_1 = __importDefault(require("sinon"));
var BoardItem_1 = require("../main/domain/BoardItem");
var Knight_1 = require("../main/domain/piece/Knight");
var Pawn_1 = require("../main/domain/piece/Pawn");
var Queen_1 = require("../main/domain/piece/Queen");
var Board_1 = require("../main/domain/Board");
var deepEqualInAnyOrder = require("deep-equal-in-any-order");
var lodash_1 = __importDefault(require("lodash"));
chai_1.default.use(deepEqualInAnyOrder);
var expect = chai_1.default.expect;
context('Cavalo', function () {
    describe('ao chamar adicionarAoItem', function () {
        it('deve atribuir propriedade item', function () {
            var cavalo = new Knight_1.Knight("white");
            var item = new BoardItem_1.BoardItem({ line: 0, column: 0 }, "black");
            cavalo.addToItem(item);
            expect(cavalo.getBoardItem()).to.deep.equals(item);
        });
    });
    describe('ao chamar simularMovimento', function () {
        it('quando posição atual e tabuleiro limpo deve retornar três opções ', function () {
            var tabuleiro = new Board_1.Board();
            sinon_1.default.replace(tabuleiro, 'getItem', function (posicao) { return new BoardItem_1.BoardItem(posicao, "white"); });
            var cavalo = new Knight_1.Knight("white");
            var item = new BoardItem_1.BoardItem({ line: 0, column: 1 }, "black");
            item.addPiece(cavalo);
            tabuleiro.addItem(item);
            var esperado = [
                { linha: 1, coluna: 3 },
                { linha: 2, coluna: 2 },
                { linha: 2, coluna: 0 }
            ];
            var resultado = cavalo.simulateMovement();
            expect(resultado).to.deep.equalInAnyOrder(esperado);
        });
        it('quando caminho livre deve retornar todos possíveis', function () {
            var tabuleiro = new Board_1.Board();
            sinon_1.default.replace(tabuleiro, 'getItem', function (posicao) { return new BoardItem_1.BoardItem(posicao, "white"); });
            var cavalo = new Knight_1.Knight("white");
            var item = new BoardItem_1.BoardItem({ line: 2, column: 2 }, "black");
            item.addPiece(cavalo);
            tabuleiro.addItem(item);
            var esperado = [
                { linha: 0, coluna: 1 },
                { linha: 0, coluna: 3 },
                { linha: 1, coluna: 0 },
                { linha: 1, coluna: 4 },
                { linha: 3, coluna: 0 },
                { linha: 3, coluna: 4 },
                { linha: 4, coluna: 1 },
                { linha: 4, coluna: 3 },
            ];
            var resultado = cavalo.simulateMovement();
            expect(resultado).to.deep.equalInAnyOrder(esperado);
        });
        it('quando peças no caminho retorna apenas posições válidas', function () {
            var cavalo = new Knight_1.Knight("white");
            var itemCavalo = new BoardItem_1.BoardItem({ line: 2, column: 2 }, "black");
            itemCavalo.addPiece(cavalo);
            var rainha = new Queen_1.Queen("white");
            var itemRainha = new BoardItem_1.BoardItem({ line: 0, column: 3 }, "black");
            itemRainha.addPiece(rainha);
            var peao = new Pawn_1.Pawn("white");
            var itemPeao = new BoardItem_1.BoardItem({ line: 1, column: 0 }, "black");
            itemPeao.addPiece(peao);
            var peao2 = new Pawn_1.Pawn("white");
            var itemPeao2 = new BoardItem_1.BoardItem({ line: 1, column: 4 }, "black");
            itemPeao2.addPiece(peao2);
            sinon_1.default.replace(Board_1.Board.prototype, 'getItem', function (posicao) {
                var itens = [itemCavalo, itemRainha, itemPeao, itemPeao2];
                var item = itens.find(function (item) { return lodash_1.default.isEqual(item.getPosition(), posicao); });
                return item || new BoardItem_1.BoardItem(posicao, "white");
            });
            var tabuleiro = new Board_1.Board();
            tabuleiro.addItem(itemCavalo);
            tabuleiro.addItem(itemPeao);
            tabuleiro.addItem(itemPeao2);
            tabuleiro.addItem(itemRainha);
            var esperado = [
                { linha: 0, coluna: 1 },
                { linha: 3, coluna: 0 },
                { linha: 3, coluna: 4 },
                { linha: 4, coluna: 1 },
                { linha: 4, coluna: 3 },
            ];
            var resultado = cavalo.simulateMovement();
            expect(resultado).to.deep.equalInAnyOrder(esperado);
        });
    });
});
