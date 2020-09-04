import { expect } from 'chai'
import _ from 'lodash'
import 'mocha'
import sinon from 'sinon'
import { Color } from '../main/definitions/Color'
import { Position } from '../main/definitions/Movement'
import { Pawn, BoardItem, Board } from '../main/models'

context('Pawn', () => {
  describe('calling addToItem', () => {
    it('should set item property', () => {
      // arrange
      const pawn = new Pawn(Color.WHITE)
      const item = new BoardItem({ line: 0, column: 0 }, Color.DARK_PINK)
      // act
      pawn.set('boardItem', item)
      // assert
      expect(pawn.get('boardItem')).to.deep.equals(item)
    })
  })
  describe('calling simulateMovement', () => {
    it('when free path, should return actual position and next forward', () => {
      // arrange
      const board = new Board()
      const pawnPosition = { line: 1, column: 2 }
      // sinon.replace(board, 'getItem', posicao => {
      //   return _.isEqual(pawnPosition, posicao) ? item : new BoardItem(posicao, Color.WHITE)
      // })
      const pawn = new Pawn(Color.WHITE)
      const item = new BoardItem(pawnPosition, Color.DARK_PINK)
      item.set('piece', pawn)
      board.addItem(item)
      // act
      const expected: Position[] = [{ line: 2, column: 2 }]
      const result = pawn.simulateMovement()
      // assert
      expect(result).to.deep.equals(expected)
    })
  })
})
