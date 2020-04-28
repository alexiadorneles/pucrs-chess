import chai from 'chai'
import 'mocha'
import sinon from 'sinon'
import { Color } from '../main/definitions/Color'
import { ItemTabuleiro } from '../main/domain/ItemTabuleiro'
import { Knight } from '../main/domain/piece/Knight'
import { Pawn } from '../main/domain/piece/Pawn'
import { Queen } from '../main/domain/piece/Queen'
import { Tabuleiro } from '../main/domain/Tabuleiro'
import deepEqualInAnyOrder = require('deep-equal-in-any-order')
import _ from 'lodash'

chai.use(deepEqualInAnyOrder)
const expect = chai.expect

context('Cavalo', () => {
  describe('ao chamar adicionarAoItem', () => {
    it('deve atribuir propriedade item', () => {
      // arrange
      const cavalo = new Knight(Color.WHITE)
      const item = new ItemTabuleiro({ line: 0, column: 0 }, Color.BLACK)
      // act
      cavalo.addToItem(item)
      // assert
      expect(cavalo.getBoardItem()).to.deep.equals(item)
    })
  })
  describe('ao chamar simularMovimento', () => {
    it('quando posição atual e tabuleiro limpo deve retornar três opções ', () => {
      // arrange
      const tabuleiro = new Tabuleiro()
      sinon.replace(tabuleiro, 'getItem', (posicao) => new ItemTabuleiro(posicao, Color.WHITE))
      const cavalo = new Knight(Color.WHITE)
      const item = new ItemTabuleiro({ line: 0, column: 1 }, Color.BLACK)
      item.atribuirPeca(cavalo)
      tabuleiro.adicionarItem(item)
      // act
      const esperado = [
        { linha: 1, coluna: 3 },
        { linha: 2, coluna: 2 },
        { linha: 2, coluna: 0 }
      ]
      const resultado = cavalo.simulateMovement()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
    })
    it('quando caminho livre deve retornar todos possíveis', () => {
      // arrange
      const tabuleiro = new Tabuleiro()
      sinon.replace(tabuleiro, 'getItem', (posicao) => new ItemTabuleiro(posicao, Color.WHITE))
      const cavalo = new Knight(Color.WHITE)
      const item = new ItemTabuleiro({ line: 2, column: 2 }, Color.BLACK)
      item.atribuirPeca(cavalo)
      tabuleiro.adicionarItem(item)
      // act
      const esperado = [
        { linha: 0, coluna: 1 },
        { linha: 0, coluna: 3 },
        { linha: 1, coluna: 0 },
        { linha: 1, coluna: 4 },
        { linha: 3, coluna: 0 },
        { linha: 3, coluna: 4 },
        { linha: 4, coluna: 1 },
        { linha: 4, coluna: 3 },
      ]
      const resultado = cavalo.simulateMovement()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
    })
    it('quando peças no caminho retorna apenas posições válidas', () => {
      // arrange
      const cavalo = new Knight(Color.WHITE)
      const itemCavalo = new ItemTabuleiro({ line: 2, column: 2 }, Color.BLACK)
      itemCavalo.atribuirPeca(cavalo)

      const rainha = new Queen(Color.WHITE)
      const itemRainha = new ItemTabuleiro({ line: 0, column: 3 }, Color.BLACK)
      itemRainha.atribuirPeca(rainha)

      const peao = new Pawn(Color.WHITE)
      const itemPeao = new ItemTabuleiro({ line: 1, column: 0 }, Color.BLACK)
      itemPeao.atribuirPeca(peao)

      const peao2 = new Pawn(Color.WHITE)
      const itemPeao2 = new ItemTabuleiro({ line: 1, column: 4 }, Color.BLACK)
      itemPeao2.atribuirPeca(peao2)

      sinon.replace(Tabuleiro.prototype, 'getItem', (posicao) => {
        const itens = [itemCavalo, itemRainha, itemPeao, itemPeao2]
        const item = itens.find(item => _.isEqual(item.getPosicao(), posicao))
        return item || new ItemTabuleiro(posicao, Color.WHITE)
      })
      const tabuleiro = new Tabuleiro()

      tabuleiro.adicionarItem(itemCavalo)
      tabuleiro.adicionarItem(itemPeao)
      tabuleiro.adicionarItem(itemPeao2)
      tabuleiro.adicionarItem(itemRainha)

      // act
      const esperado = [
        { linha: 0, coluna: 1 },
        { linha: 3, coluna: 0 },
        { linha: 3, coluna: 4 },
        { linha: 4, coluna: 1 },
        { linha: 4, coluna: 3 },
      ]
      const resultado = cavalo.simulateMovement()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
    })
  })
})
