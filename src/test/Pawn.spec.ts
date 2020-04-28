import { expect } from 'chai'
import _ from 'lodash'
import 'mocha'
import sinon from 'sinon'
import { Color } from '../main/definitions/Color'
import { BoardItem } from '../main/domain/board/BoardItem'
import { Pawn } from '../main/domain/piece/Pawn'
import { Board } from '../main/domain/board/Board'
import { Position } from '../main/definitions/Movement'

context('Pawn', () => {
  describe('calling addToItem', () => {
    it('should set item property', () => {
      // arrange
      const pawn = new Pawn(Color.WHITE)
      const item = new BoardItem({ line: 0, column: 0 }, Color.DARK_PINK)
      // act
      pawn.addToItem(item)
      // assert
      expect(pawn.getBoardItem()).to.deep.equals(item)
    })
  })
  describe('calling simulateMovement', () => {
    it('when free path, should return actual position and next forward', () => {
      // arrange
      const board = new Board()
      const pawnPosition = { line: 1, column: 2 }
      sinon.replace(board, 'getItem', posicao => {
        return _.isEqual(pawnPosition, posicao) ? item : new BoardItem(posicao, Color.WHITE)
      })
      const pawn = new Pawn(Color.WHITE)
      const item = new BoardItem(pawnPosition, Color.DARK_PINK)
      item.addPiece(pawn)
      board.addItem(item)
      // act
      const expected: Position[] = [{ line: 2, column: 2 }]
      const result = pawn.simulateMovement()
      // assert
      expect(result).to.deep.equals(expected)
    })
  })
})
