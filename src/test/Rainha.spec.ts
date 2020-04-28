import chai from 'chai'
import _ from 'lodash'
import 'mocha'
import sinon from 'sinon'
import { Color } from '../main/definitions/Color'
import { BoardItem } from '../main/domain/BoardItem'
import { Pawn } from '../main/domain/piece/Pawn'
import { Queen } from '../main/domain/piece/Queen'
import { Board } from '../main/domain/Board'
import deepEqualInAnyOrder = require('deep-equal-in-any-order')
import { King } from '../main/domain/piece/King'
import { Rook } from '../main/domain/piece/Rook'

chai.use(deepEqualInAnyOrder)
const expect = chai.expect

context('Rainha', () => {
  describe('ao chamar adicionarAoItem', () => {
    it('deve atribuir propriedade item', () => {
      // arrange
      const rainha = new Queen(Color.WHITE)
      const item = new BoardItem({ line: 0, column: 0 }, Color.BLACK)
      // act
      rainha.addToItem(item)
      // assert
      expect(rainha.getBoardItem()).to.deep.equals(item)
    })
  })
  describe('ao chamar simularMovimento', () => {
    beforeEach(() => sinon.restore())
    it('quando posição inicial e tabuleiro limpo deve retornar muitas opções ', () => {
      // arrange
      const tabuleiro = new Board()
      const rainha = new Queen(Color.WHITE)
      const posicaoRainha = { line: 0, column: 3 }
      const item = new BoardItem(posicaoRainha, Color.BLACK)
      item.addPiece(rainha)
      sinon.replace(tabuleiro, 'getItem', (posicao) => {
        return _.isEqual(posicaoRainha, posicao) ? item : new BoardItem(posicao, Color.WHITE)
      })
      tabuleiro.addItem(item)
      // act
      const esperado = [
        // horizontal
        { line: 0, column: 0 },
        { line: 0, column: 1 },
        { line: 0, column: 2 },
        { line: 0, column: 4 },
        { line: 0, column: 5 },
        { line: 0, column: 6 },
        { line: 0, column: 7 },
        // vertical
        { line: 1, column: 3 },
        { line: 2, column: 3 },
        { line: 3, column: 3 },
        { line: 4, column: 3 },
        { line: 5, column: 3 },
        { line: 6, column: 3 },
        { line: 7, column: 3 },
        // diagonal esquerda
        { line: 1, column: 2 },
        { line: 2, column: 1 },
        { line: 3, column: 0 },
        // diagonal direita
        { line: 1, column: 4 },
        { line: 2, column: 5 },
        { line: 3, column: 6 },
        { line: 4, column: 7 },
      ]
      const resultado = rainha.simulateMovement()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
      sinon.restore()
    })
    it('quando caminho livre deve retornar todos possíveis', () => {
      // arrange
      const tabuleiro = new Board()
      const posicaoRainha = { line: 3, column: 3 }
      const rainha = new Queen(Color.WHITE)
      const item = new BoardItem(posicaoRainha, Color.BLACK)
      item.addPiece(rainha)
      sinon.replace(tabuleiro, 'getItem', (posicao) => {
        return _.isEqual(posicaoRainha, posicao) ? item : new BoardItem(posicao, Color.WHITE)
      })
      tabuleiro.addItem(item)
      // act
      const esperado = [
        // vertical - atrás
        { line: 2, column: 3 },
        { line: 1, column: 3 },
        { line: 0, column: 3 },
        // vertical - frente
        { line: 4, column: 3 },
        { line: 5, column: 3 },
        { line: 6, column: 3 },
        { line: 7, column: 3 },
        // horizontal - esquerda
        { line: 3, column: 2 },
        { line: 3, column: 1 },
        { line: 3, column: 0 },
        // horizontal - direita
        { line: 3, column: 4 },
        { line: 3, column: 5 },
        { line: 3, column: 6 },
        { line: 3, column: 7 },
        // diagonal - atrás - esuqerda
        { line: 2, column: 2 },
        { line: 1, column: 1 },
        { line: 0, column: 0 },
        // diagonal - atrás - direita
        { line: 2, column: 4 },
        { line: 1, column: 5 },
        { line: 0, column: 6 },
        // diagonal - frente - esuqerda
        { line: 4, column: 2 },
        { line: 5, column: 1 },
        { line: 6, column: 0 },
        // diagonal - frente - direita
        { line: 4, column: 4 },
        { line: 5, column: 5 },
        { line: 6, column: 6 },
        { line: 7, column: 7 },
      ]
      const resultado = rainha.simulateMovement()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
      sinon.restore()
    })
    it('quando peças no caminho retorna apenas posições válidas', () => {
      // arrange
      const rainha = new Queen(Color.WHITE)
      const itemRainha = new BoardItem({ line: 2, column: 2 }, Color.BLACK)
      itemRainha.addPiece(rainha)

      const peao = new Pawn(Color.WHITE)
      const itemPeao = new BoardItem({ line: 2, column: 1 }, Color.BLACK)
      itemPeao.addPiece(peao)

      const peao2 = new Pawn(Color.WHITE)
      const itemPeao2 = new BoardItem({ line: 3, column: 3 }, Color.BLACK)
      itemPeao2.addPiece(peao2)

      const peao3 = new Pawn(Color.WHITE)
      const itemPeao3 = new BoardItem({ line: 2, column: 4 }, Color.BLACK)
      itemPeao3.addPiece(peao3)

      const peao4 = new Pawn(Color.WHITE)
      const itemPeao4 = new BoardItem({ line: 1, column: 2 }, Color.BLACK)
      itemPeao4.addPiece(peao4)

      const torre = new Rook(Color.WHITE)
      const itemTorre = new BoardItem({ line: 0, column: 0 }, Color.BLACK)
      itemTorre.addPiece(torre)

      const rei = new King(Color.WHITE)
      const itemRei = new BoardItem({ line: 0, column: 4 }, Color.BLACK)
      itemRei.addPiece(rei)

      const peaoOponente = new Pawn(Color.WHITE)
      const itemPeaoOponente = new BoardItem({ line: 6, column: 2 }, Color.WHITE)
      itemPeaoOponente.addPiece(peaoOponente)

      const itens = [itemRainha, itemPeao, itemPeao2, itemPeao3, itemPeao4, itemPeaoOponente, itemTorre, itemRei]

      sinon.replace(Board.prototype, 'getItem', (posicao) => {
        const item = itens.find(item => _.isEqual(item.getPosition(), posicao))
        return item || new BoardItem(posicao, Color.WHITE)
      })
      const tabuleiro = new Board()
      itens.forEach(item => tabuleiro.addItem(item))
      // act
      const esperado = [
        { line: 1, column: 1 },
        { line: 1, column: 3 },
        { line: 2, column: 3 },
        { line: 3, column: 1 },
        { line: 3, column: 2 },
        { line: 4, column: 0 },
        { line: 4, column: 2 },
        { line: 5, column: 2 },
      ]
      const resultado = rainha.simulateMovement()
      // assert
      expect(resultado).to.deep.equalInAnyOrder(esperado)
      sinon.restore()
    })
  })
})
