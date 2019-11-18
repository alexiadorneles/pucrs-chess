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
            var item = new ItemTabuleiro_1.ItemTabuleiro({ linha: 0, coluna: 0 }, "black");
            rainha.adicionarAoItem(item);
            expect(rainha.getItemTabuleiro()).to.deep.equals(item);
        });
    });
    describe('ao chamar simularMovimento', function () {
        it('quando posição inicial e tabuleiro limpo deve retornar muitas opções ', function () {
            var tabuleiro = new Tabuleiro_1.Tabuleiro();
            sinon_1.default.replace(tabuleiro, 'getItem', function (posicao) { return new ItemTabuleiro_1.ItemTabuleiro(posicao, "white"); });
            var rainha = new Rainha_1.Rainha("white");
            var item = new ItemTabuleiro_1.ItemTabuleiro({ linha: 0, coluna: 3 }, "black");
            item.atribuirPeca(rainha);
            tabuleiro.adicionarItem(item);
            var esperado = [
                { linha: 0, coluna: 0 },
                { linha: 0, coluna: 1 },
                { linha: 0, coluna: 2 },
                { linha: 0, coluna: 4 },
                { linha: 0, coluna: 5 },
                { linha: 0, coluna: 6 },
                { linha: 0, coluna: 7 },
                { linha: 1, coluna: 3 },
                { linha: 2, coluna: 3 },
                { linha: 3, coluna: 3 },
                { linha: 4, coluna: 3 },
                { linha: 5, coluna: 3 },
                { linha: 6, coluna: 3 },
                { linha: 7, coluna: 3 },
                { linha: 1, coluna: 2 },
                { linha: 2, coluna: 1 },
                { linha: 3, coluna: 0 },
                { linha: 1, coluna: 4 },
                { linha: 2, coluna: 5 },
                { linha: 3, coluna: 6 },
                { linha: 4, coluna: 7 },
            ];
            var resultado = rainha.simularMovimento();
            expect(resultado).to.deep.equalInAnyOrder(esperado);
            sinon_1.default.restore();
        });
        it('quando caminho livre deve retornar todos possíveis', function () {
            var tabuleiro = new Tabuleiro_1.Tabuleiro();
            sinon_1.default.replace(tabuleiro, 'getItem', function (posicao) { return new ItemTabuleiro_1.ItemTabuleiro(posicao, "white"); });
            var rainha = new Rainha_1.Rainha("white");
            var item = new ItemTabuleiro_1.ItemTabuleiro({ linha: 3, coluna: 3 }, "black");
            item.atribuirPeca(rainha);
            tabuleiro.adicionarItem(item);
            var esperado = [
                { linha: 2, coluna: 3 },
                { linha: 1, coluna: 3 },
                { linha: 0, coluna: 3 },
                { linha: 4, coluna: 3 },
                { linha: 5, coluna: 3 },
                { linha: 6, coluna: 3 },
                { linha: 7, coluna: 3 },
                { linha: 3, coluna: 2 },
                { linha: 3, coluna: 1 },
                { linha: 3, coluna: 0 },
                { linha: 3, coluna: 4 },
                { linha: 3, coluna: 5 },
                { linha: 3, coluna: 6 },
                { linha: 3, coluna: 7 },
                { linha: 2, coluna: 2 },
                { linha: 1, coluna: 1 },
                { linha: 0, coluna: 0 },
                { linha: 2, coluna: 4 },
                { linha: 1, coluna: 5 },
                { linha: 0, coluna: 6 },
                { linha: 4, coluna: 2 },
                { linha: 5, coluna: 1 },
                { linha: 6, coluna: 0 },
                { linha: 4, coluna: 4 },
                { linha: 5, coluna: 5 },
                { linha: 6, coluna: 6 },
                { linha: 7, coluna: 7 },
            ];
            var resultado = rainha.simularMovimento();
            expect(resultado).to.deep.equalInAnyOrder(esperado);
            sinon_1.default.restore();
        });
        it('quando peças no caminho retorna apenas posições válidas', function () {
            var rainha = new Rainha_1.Rainha("white");
            var itemRainha = new ItemTabuleiro_1.ItemTabuleiro({ linha: 2, coluna: 2 }, "black");
            itemRainha.atribuirPeca(rainha);
            var peao = new Peao_1.Peao("white");
            var itemPeao = new ItemTabuleiro_1.ItemTabuleiro({ linha: 2, coluna: 1 }, "black");
            itemPeao.atribuirPeca(peao);
            var peao2 = new Peao_1.Peao("white");
            var itemPeao2 = new ItemTabuleiro_1.ItemTabuleiro({ linha: 3, coluna: 3 }, "black");
            itemPeao2.atribuirPeca(peao2);
            var peao3 = new Peao_1.Peao("white");
            var itemPeao3 = new ItemTabuleiro_1.ItemTabuleiro({ linha: 2, coluna: 4 }, "black");
            itemPeao3.atribuirPeca(peao3);
            var peao4 = new Peao_1.Peao("white");
            var itemPeao4 = new ItemTabuleiro_1.ItemTabuleiro({ linha: 1, coluna: 2 }, "black");
            itemPeao4.atribuirPeca(peao4);
            var torre = new Torre_1.Torre("white");
            var itemTorre = new ItemTabuleiro_1.ItemTabuleiro({ linha: 0, coluna: 0 }, "black");
            itemTorre.atribuirPeca(torre);
            var rei = new Rei_1.Rei("white");
            var itemRei = new ItemTabuleiro_1.ItemTabuleiro({ linha: 0, coluna: 4 }, "black");
            itemRei.atribuirPeca(rei);
            var peaoOponente = new Peao_1.Peao("white");
            var itemPeaoOponente = new ItemTabuleiro_1.ItemTabuleiro({ linha: 6, coluna: 2 }, "white");
            itemPeaoOponente.atribuirPeca(peaoOponente);
            var itens = [itemRainha, itemPeao, itemPeao2, itemPeao3, itemPeao4, itemPeaoOponente, itemTorre, itemRei];
            sinon_1.default.replace(Tabuleiro_1.Tabuleiro.prototype, 'getItem', function (posicao) {
                var item = itens.find(function (item) { return lodash_1.default.isEqual(item.getPosicao(), posicao); });
                return item || new ItemTabuleiro_1.ItemTabuleiro(posicao, "white");
            });
            var tabuleiro = new Tabuleiro_1.Tabuleiro();
            itens.forEach(function (item) { return tabuleiro.adicionarItem(item); });
            var esperado = [
                { linha: 1, coluna: 1 },
                { linha: 1, coluna: 3 },
                { linha: 2, coluna: 3 },
                { linha: 3, coluna: 1 },
                { linha: 3, coluna: 2 },
                { linha: 4, coluna: 0 },
                { linha: 4, coluna: 2 },
                { linha: 5, coluna: 2 },
            ];
            var resultado = rainha.simularMovimento();
            expect(resultado).to.deep.equalInAnyOrder(esperado);
            sinon_1.default.restore();
        });
    });
});
