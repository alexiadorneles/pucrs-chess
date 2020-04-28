"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var lodash_1 = __importDefault(require("lodash"));
require("mocha");
var sinon_1 = __importDefault(require("sinon"));
var ItemTabuleiro_1 = require("../main/domain/ItemTabuleiro");
var Peao_1 = require("../main/domain/peca/Peao");
var Rainha_1 = require("../main/domain/peca/Rainha");
var Tabuleiro_1 = require("../main/domain/Tabuleiro");
var deepEqualInAnyOrder = require("deep-equal-in-any-order");
var Rei_1 = require("../main/domain/peca/Rei");
var Torre_1 = require("../main/domain/peca/Torre");
chai_1.default.use(deepEqualInAnyOrder);
var expect = chai_1.default.expect;
context('Rainha', function () {
    describe('ao chamar adicionarAoItem', function () {
        it('deve atribuir propriedade item', function () {
            var rainha = new Rainha_1.Rainha("white");
            var item = new ItemTabuleiro_1.ItemTabuleiro({ line: 0, column: 0 }, "black");
            rainha.adicionarAoItem(item);
            expect(rainha.getItemTabuleiro()).to.deep.equals(item);
        });
    });
    describe('ao chamar simularMovimento', function () {
        beforeEach(function () { return sinon_1.default.restore(); });
        it('quando posição inicial e tabuleiro limpo deve retornar muitas opções ', function () {
            var tabuleiro = new Tabuleiro_1.Tabuleiro();
            var rainha = new Rainha_1.Rainha("white");
            var posicaoRainha = { line: 0, column: 3 };
            var item = new ItemTabuleiro_1.ItemTabuleiro(posicaoRainha, "black");
            item.atribuirPeca(rainha);
            sinon_1.default.replace(tabuleiro, 'getItem', function (posicao) {
                return lodash_1.default.isEqual(posicaoRainha, posicao) ? item : new ItemTabuleiro_1.ItemTabuleiro(posicao, "white");
            });
            tabuleiro.adicionarItem(item);
            var esperado = [
                { line: 0, column: 0 },
                { line: 0, column: 1 },
                { line: 0, column: 2 },
                { line: 0, column: 4 },
                { line: 0, column: 5 },
                { line: 0, column: 6 },
                { line: 0, column: 7 },
                { line: 1, column: 3 },
                { line: 2, column: 3 },
                { line: 3, column: 3 },
                { line: 4, column: 3 },
                { line: 5, column: 3 },
                { line: 6, column: 3 },
                { line: 7, column: 3 },
                { line: 1, column: 2 },
                { line: 2, column: 1 },
                { line: 3, column: 0 },
                { line: 1, column: 4 },
                { line: 2, column: 5 },
                { line: 3, column: 6 },
                { line: 4, column: 7 },
            ];
            var resultado = rainha.simularMovimento();
            expect(resultado).to.deep.equalInAnyOrder(esperado);
            sinon_1.default.restore();
        });
        it('quando caminho livre deve retornar todos possíveis', function () {
            var tabuleiro = new Tabuleiro_1.Tabuleiro();
            var posicaoRainha = { line: 3, column: 3 };
            var rainha = new Rainha_1.Rainha("white");
            var item = new ItemTabuleiro_1.ItemTabuleiro(posicaoRainha, "black");
            item.atribuirPeca(rainha);
            sinon_1.default.replace(tabuleiro, 'getItem', function (posicao) {
                return lodash_1.default.isEqual(posicaoRainha, posicao) ? item : new ItemTabuleiro_1.ItemTabuleiro(posicao, "white");
            });
            tabuleiro.adicionarItem(item);
            var esperado = [
                { line: 2, column: 3 },
                { line: 1, column: 3 },
                { line: 0, column: 3 },
                { line: 4, column: 3 },
                { line: 5, column: 3 },
                { line: 6, column: 3 },
                { line: 7, column: 3 },
                { line: 3, column: 2 },
                { line: 3, column: 1 },
                { line: 3, column: 0 },
                { line: 3, column: 4 },
                { line: 3, column: 5 },
                { line: 3, column: 6 },
                { line: 3, column: 7 },
                { line: 2, column: 2 },
                { line: 1, column: 1 },
                { line: 0, column: 0 },
                { line: 2, column: 4 },
                { line: 1, column: 5 },
                { line: 0, column: 6 },
                { line: 4, column: 2 },
                { line: 5, column: 1 },
                { line: 6, column: 0 },
                { line: 4, column: 4 },
                { line: 5, column: 5 },
                { line: 6, column: 6 },
                { line: 7, column: 7 },
            ];
            var resultado = rainha.simularMovimento();
            expect(resultado).to.deep.equalInAnyOrder(esperado);
            sinon_1.default.restore();
        });
        it('quando peças no caminho retorna apenas posições válidas', function () {
            var rainha = new Rainha_1.Rainha("white");
            var itemRainha = new ItemTabuleiro_1.ItemTabuleiro({ line: 2, column: 2 }, "black");
            itemRainha.atribuirPeca(rainha);
            var peao = new Peao_1.Peao("white");
            var itemPeao = new ItemTabuleiro_1.ItemTabuleiro({ line: 2, column: 1 }, "black");
            itemPeao.atribuirPeca(peao);
            var peao2 = new Peao_1.Peao("white");
            var itemPeao2 = new ItemTabuleiro_1.ItemTabuleiro({ line: 3, column: 3 }, "black");
            itemPeao2.atribuirPeca(peao2);
            var peao3 = new Peao_1.Peao("white");
            var itemPeao3 = new ItemTabuleiro_1.ItemTabuleiro({ line: 2, column: 4 }, "black");
            itemPeao3.atribuirPeca(peao3);
            var peao4 = new Peao_1.Peao("white");
            var itemPeao4 = new ItemTabuleiro_1.ItemTabuleiro({ line: 1, column: 2 }, "black");
            itemPeao4.atribuirPeca(peao4);
            var torre = new Torre_1.Torre("white");
            var itemTorre = new ItemTabuleiro_1.ItemTabuleiro({ line: 0, column: 0 }, "black");
            itemTorre.atribuirPeca(torre);
            var rei = new Rei_1.Rei("white");
            var itemRei = new ItemTabuleiro_1.ItemTabuleiro({ line: 0, column: 4 }, "black");
            itemRei.atribuirPeca(rei);
            var peaoOponente = new Peao_1.Peao("white");
            var itemPeaoOponente = new ItemTabuleiro_1.ItemTabuleiro({ line: 6, column: 2 }, "white");
            itemPeaoOponente.atribuirPeca(peaoOponente);
            var itens = [itemRainha, itemPeao, itemPeao2, itemPeao3, itemPeao4, itemPeaoOponente, itemTorre, itemRei];
            sinon_1.default.replace(Tabuleiro_1.Tabuleiro.prototype, 'getItem', function (posicao) {
                var item = itens.find(function (item) { return lodash_1.default.isEqual(item.getPosicao(), posicao); });
                return item || new ItemTabuleiro_1.ItemTabuleiro(posicao, "white");
            });
            var tabuleiro = new Tabuleiro_1.Tabuleiro();
            itens.forEach(function (item) { return tabuleiro.adicionarItem(item); });
            var esperado = [
                { line: 1, column: 1 },
                { line: 1, column: 3 },
                { line: 2, column: 3 },
                { line: 3, column: 1 },
                { line: 3, column: 2 },
                { line: 4, column: 0 },
                { line: 4, column: 2 },
                { line: 5, column: 2 },
            ];
            var resultado = rainha.simularMovimento();
            expect(resultado).to.deep.equalInAnyOrder(esperado);
            sinon_1.default.restore();
        });
    });
});
