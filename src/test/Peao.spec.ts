import { expect } from 'chai'
import _ from 'lodash'
import 'mocha'
import sinon from 'sinon'
import { Color } from '../main/definitions/Color'
import { ItemTabuleiro } from '../main/domain/ItemTabuleiro'
import { Pawn } from '../main/domain/piece/Pawn'
import { Tabuleiro } from '../main/domain/Tabuleiro'

context('Peao', () => {
  describe('ao chamar adicionarAoItem', () => {
    it('deve atribuir propriedade item', () => {
      // arrange
      const peao = new Pawn(Color.WHITE)
      const item = new ItemTabuleiro({ line: 0, column: 0 }, Color.BLACK)
      // act
      peao.addToItem(item)
      // assert
      expect(peao.getBoardItem()).to.deep.equals(item)
    })
  })
  describe('ao chamar simularMovimento', () => {
    it('quando caminho livre deve retornar posição atual e uma para frente', () => {
      // arrange
      const tabuleiro = new Tabuleiro()
      const posicaoPeao = { line: 1, column: 2 }
      sinon.replace(tabuleiro, 'getItem', posicao => {
        return _.isEqual(posicaoPeao, posicao) ? item : new ItemTabuleiro(posicao, Color.GREY)
      })
      const peao = new Pawn(Color.GREY)
      const item = new ItemTabuleiro(posicaoPeao, Color.BLACK)
      item.atribuirPeca(peao)
      tabuleiro.adicionarItem(item)
      // act
      const esperado = [{ line: 2, column: 2 }]
      const resultado = peao.simulateMovement()
      // assert
      expect(resultado).to.deep.equals(esperado)
    })
  })
})
