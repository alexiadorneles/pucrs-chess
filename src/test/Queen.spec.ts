import chai from 'chai'
import _ from 'lodash'
import 'mocha'
import sinon from 'sinon'
import { Color } from '../main/definitions/Color'
import { BoardItem } from '../main/domain/board/BoardItem'
import { Pawn } from '../main/domain/piece/Pawn'
import { Queen } from '../main/domain/piece/Queen'
import { Board } from '../main/domain/board/Board'
import deepEqualInAnyOrder = require('deep-equal-in-any-order')
import { King } from '../main/domain/piece/King'
import { Rook } from '../main/domain/piece/Rook'
import { Position } from '../main/definitions/Movement'

chai.use(deepEqualInAnyOrder)
const expect = chai.expect

context('Queen', () => {
  describe('calling addToItem', () => {
    it('should set item property', () => {
      // arrange
      const queen = new Queen(Color.WHITE)
      const item = new BoardItem({ line: 0, column: 0 }, Color.BLACK)
      // act
      queen.addToItem(item)
      // assert
      expect(queen.getBoardItem()).to.deep.equals(item)
    })
  })
  describe('calling simulateMovement', () => {
    beforeEach(() => sinon.restore())
    it('when initial position and clean board should return a lot of options', () => {
      // arrange
      const board = new Board()
      const queen = new Queen(Color.WHITE)
      const queenItem = { line: 0, column: 3 }
      const item = new BoardItem(queenItem, Color.BLACK)
      item.addPiece(queen)
      sinon.replace(board, 'getItem', position => {
        return _.isEqual(queenItem, position) ? item : new BoardItem(position, Color.WHITE)
      })
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
      const item = new BoardItem(queenItem, Color.BLACK)
      item.addPiece(queen)
      sinon.replace(board, 'getItem', position => {
        return _.isEqual(queenItem, position) ? item : new BoardItem(position, Color.WHITE)
      })
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
      const queenItem = new BoardItem({ line: 2, column: 2 }, Color.BLACK)
      queenItem.addPiece(queen)

      const pawn = new Pawn(Color.WHITE)
      const pawnItem = new BoardItem({ line: 2, column: 1 }, Color.BLACK)
      pawnItem.addPiece(pawn)

      const pawnTwo = new Pawn(Color.WHITE)
      const pawnTwoItem = new BoardItem({ line: 3, column: 3 }, Color.BLACK)
      pawnTwoItem.addPiece(pawnTwo)

      const pawnThree = new Pawn(Color.WHITE)
      const pawnThreeItem = new BoardItem({ line: 2, column: 4 }, Color.BLACK)
      pawnThreeItem.addPiece(pawnThree)

      const pawnFour = new Pawn(Color.WHITE)
      const pawnFourItem = new BoardItem({ line: 1, column: 2 }, Color.BLACK)
      pawnFourItem.addPiece(pawnFour)

      const rook = new Rook(Color.WHITE)
      const rookItem = new BoardItem({ line: 0, column: 0 }, Color.BLACK)
      rookItem.addPiece(rook)

      const rei = new King(Color.WHITE)
      const itemRei = new BoardItem({ line: 0, column: 4 }, Color.BLACK)
      itemRei.addPiece(rei)

      const opponentPawn = new Pawn(Color.WHITE)
      const opponentPawnItem = new BoardItem({ line: 6, column: 2 }, Color.WHITE)
      opponentPawnItem.addPiece(opponentPawn)

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

      sinon.replace(Board.prototype, 'getItem', position => {
        const item = items.find(item => _.isEqual(item.getPosition(), position))
        return item || new BoardItem(position, Color.WHITE)
      })
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
