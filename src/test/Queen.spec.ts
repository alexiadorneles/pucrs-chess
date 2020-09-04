import chai from 'chai'
import _ from 'lodash'
import 'mocha'
import sinon from 'sinon'
import { Color } from '../main/definitions/Color'
import deepEqualInAnyOrder = require('deep-equal-in-any-order')
import { Position } from '../main/definitions/Movement'
import { Queen, BoardItem, Board, Pawn, King, Rook } from '../main/models'

chai.use(deepEqualInAnyOrder)
const expect = chai.expect

context('Queen', () => {
  describe('calling addToItem', () => {
    it('should set item property', () => {
      // arrange
      const queen = new Queen(Color.WHITE)
      const item = new BoardItem({ line: 0, column: 0 }, Color.DARK_PINK)
      // act
      queen.set('boardItem', item)
      // assert
      expect(queen.get('boardItem')).to.deep.equals(item)
    })
  })
  describe('calling simulateMovement', () => {
    beforeEach(() => sinon.restore())
    it('when initial position and clean board should return a lot of options', () => {
      // arrange
      const board = new Board()
      const queen = new Queen(Color.WHITE)
      const queenItem = { line: 0, column: 3 }
      const item = new BoardItem(queenItem, Color.DARK_PINK)
      item.set('piece', queen)
      // sinon.replace(board, 'getItem', position => {
      //   return _.isEqual(queenItem, position) ? item : new BoardItem(position, Color.WHITE)
      // })
      board.addItem(item)
      // act
      const expected: Position[] = [
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
      const result = queen.simulateMovement()
      // assert
      expect(result).to.deep.equalInAnyOrder(expected)
      sinon.restore()
    })
    it('when free path, should return all possible', () => {
      // arrange
      const board = new Board()
      const queenItem = { line: 3, column: 3 }
      const queen = new Queen(Color.WHITE)
      const item = new BoardItem(queenItem, Color.DARK_PINK)
      item.set('piece', queen)
      // sinon.replace(board, 'getItem', position => {
      //   return _.isEqual(queenItem, position) ? item : new BoardItem(position, Color.WHITE)
      // })
      board.addItem(item)
      // act
      const expected = [
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
      const result = queen.simulateMovement()
      // assert
      expect(result).to.deep.equalInAnyOrder(expected)
      sinon.restore()
    })
    it('when pieces in the way, should return only', () => {
      // arrange
      const queen = new Queen(Color.WHITE)
      const queenItem = new BoardItem({ line: 2, column: 2 }, Color.DARK_PINK)
      queenItem.set('piece', queen)

      const pawn = new Pawn(Color.WHITE)
      const pawnItem = new BoardItem({ line: 2, column: 1 }, Color.DARK_PINK)
      pawnItem.set('piece', pawn)

      const pawnTwo = new Pawn(Color.WHITE)
      const pawnTwoItem = new BoardItem({ line: 3, column: 3 }, Color.DARK_PINK)
      pawnTwoItem.set('piece', pawnTwo)

      const pawnThree = new Pawn(Color.WHITE)
      const pawnThreeItem = new BoardItem({ line: 2, column: 4 }, Color.DARK_PINK)
      pawnThreeItem.set('piece', pawnThree)

      const pawnFour = new Pawn(Color.WHITE)
      const pawnFourItem = new BoardItem({ line: 1, column: 2 }, Color.DARK_PINK)
      pawnFourItem.set('piece', pawnFour)

      const rook = new Rook(Color.WHITE)
      const rookItem = new BoardItem({ line: 0, column: 0 }, Color.DARK_PINK)
      rookItem.set('piece', rook)

      const rei = new King(Color.WHITE)
      const itemRei = new BoardItem({ line: 0, column: 4 }, Color.DARK_PINK)
      itemRei.set('piece', rei)

      const opponentPawn = new Pawn(Color.WHITE)
      const opponentPawnItem = new BoardItem({ line: 6, column: 2 }, Color.WHITE)
      opponentPawnItem.set('piece', opponentPawn)

      const items = [
        queenItem,
        pawnItem,
        pawnTwoItem,
        pawnThreeItem,
        pawnFourItem,
        opponentPawnItem,
        rookItem,
        itemRei,
      ]

      const board = new Board()
      items.forEach(item => board.addItem(item))
      // act
      const expected: Position[] = [
        { line: 1, column: 1 },
        { line: 1, column: 3 },
        { line: 2, column: 3 },
        { line: 3, column: 1 },
        { line: 3, column: 2 },
        { line: 4, column: 0 },
        { line: 4, column: 2 },
        { line: 5, column: 2 },
      ]
      const result = queen.simulateMovement()
      // assert
      expect(result).to.deep.equalInAnyOrder(expected)
      sinon.restore()
    })
  })
})
