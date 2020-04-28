import { expect } from 'chai'
import _ from 'lodash'
import 'mocha'
import sinon from 'sinon'
import { Color } from '../main/definitions/Color'
import { BoardItem } from '../main/domain/BoardItem'
import { Pawn } from '../main/domain/piece/Pawn'
import { Board } from '../main/domain/Board'

context('Peao', () => {
  describe('ao chamar adicionarAoItem', () => {
    it('deve atribuir propriedade item', () => {
      // arrange
      const peao = new Pawn(Color.WHITE)
      const item = new BoardItem({ line: 0, column: 0 }, Color.BLACK)
      // act
      peao.addToItem(item)
      // assert
      expect(peao.getBoardItem()).to.deep.equals(item)
    })
  })
  describe('ao chamar simularMovimento', () => {
    it('quando caminho livre deve retornar posição atual e uma para frente', () => {
      // arrange
      const tabuleiro = new Board()
      const posicaoPeao = { line: 1, column: 2 }
      sinon.replace(tabuleiro, 'getItem', posicao => {
        return _.isEqual(posicaoPeao, posicao) ? item : new BoardItem(posicao, Color.GREY)
      })
      const peao = new Pawn(Color.GREY)
      const item = new BoardItem(posicaoPeao, Color.BLACK)
      item.addPiece(peao)
      tabuleiro.addItem(item)
      // act
      const esperado = [{ line: 2, column: 2 }]
      const resultado = peao.simulateMovement()
      // assert
      expect(resultado).to.deep.equals(esperado)
    })
  })
})
