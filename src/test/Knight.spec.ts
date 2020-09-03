// import chai from 'chai'
// import _ from 'lodash'
// import 'mocha'
// import sinon from 'sinon'
// import { Color } from '../main/definitions/Color'
// import { Position } from '../main/definitions/Movement'
// import { Board } from '../main/domain/board/Board'
// import { BoardItem } from '../main/domain/board/BoardItem'
// import { Knight } from '../main/domain/piece/Knight'
// import { Pawn } from '../main/domain/piece/Pawn'
// import { Queen } from '../main/domain/piece/Queen'
// import deepEqualInAnyOrder = require('deep-equal-in-any-order')

// chai.use(deepEqualInAnyOrder)
// const expect = chai.expect

// context('Knight', () => {
//   describe('calling addToItem', () => {
//     it('should set item property', () => {
//       // arrange
//       const knight = new Knight(Color.WHITE)
//       const item = new BoardItem({ line: 0, column: 0 }, Color.DARK_PINK)
//       // act
//       knight.addToItem(item)
//       // assert
//       expect(knight.getBoardItem()).to.deep.equals(item)
//     })
//   })
//   describe('calling simulateMovement', () => {
//     it('when initial position and empty board should return 3 options', () => {
//       // arrange
//       const board = new Board()
//       sinon.replace(board, 'getItem', position => new BoardItem(position, Color.WHITE))
//       const knight = new Knight(Color.WHITE)
//       const item = new BoardItem({ line: 0, column: 1 }, Color.DARK_PINK)
//       item.setPiece(knight)
//       board.addItem(item)
//       // act
//       const expected: Position[] = [
//         { line: 1, column: 3 },
//         { line: 2, column: 2 },
//         { line: 2, column: 0 },
//       ]
//       const result = knight.simulateMovement()
//       // assert
//       expect(result).to.deep.equalInAnyOrder(expected)
//     })
//     it('when free path should return all possibilities', () => {
//       // arrange
//       const board = new Board()
//       sinon.replace(board, 'getItem', position => new BoardItem(position, Color.WHITE))
//       const knight = new Knight(Color.WHITE)
//       const item = new BoardItem({ line: 2, column: 2 }, Color.DARK_PINK)
//       item.setPiece(knight)
//       board.addItem(item)
//       // act
//       const expected = [
//         { line: 0, column: 1 },
//         { line: 0, column: 3 },
//         { line: 1, column: 0 },
//         { line: 1, column: 4 },
//         { line: 3, column: 0 },
//         { line: 3, column: 4 },
//         { line: 4, column: 1 },
//         { line: 4, column: 3 },
//       ]
//       const result = knight.simulateMovement()
//       // assert
//       expect(result).to.deep.equalInAnyOrder(expected)
//     })
//     it('quando pieces are in the way, return only valid', () => {
//       // arrange
//       const knight = new Knight(Color.WHITE)
//       const knightItem = new BoardItem({ line: 2, column: 2 }, Color.DARK_PINK)
//       knightItem.setPiece(knight)

//       const queen = new Queen(Color.WHITE)
//       const queenItem = new BoardItem({ line: 0, column: 3 }, Color.DARK_PINK)
//       queenItem.setPiece(queen)

//       const pawn = new Pawn(Color.WHITE)
//       const pawnItem = new BoardItem({ line: 1, column: 0 }, Color.DARK_PINK)
//       pawnItem.setPiece(pawn)

//       const otherPawn = new Pawn(Color.WHITE)
//       const otherPawnItem = new BoardItem({ line: 1, column: 4 }, Color.DARK_PINK)
//       otherPawnItem.setPiece(otherPawn)

//       sinon.replace(Board.prototype, 'getItem', position => {
//         const items = [knightItem, queenItem, pawnItem, otherPawnItem]
//         const item = items.find(item => _.isEqual(item.getPosition(), position))
//         return item || new BoardItem(position, Color.WHITE)
//       })
//       const board = new Board()

//       board.addItem(knightItem)
//       board.addItem(pawnItem)
//       board.addItem(otherPawnItem)
//       board.addItem(queenItem)

//       // act
//       const expected: Position[] = [
//         { line: 0, column: 1 },
//         { line: 3, column: 0 },
//         { line: 3, column: 4 },
//         { line: 4, column: 1 },
//         { line: 4, column: 3 },
//       ]
//       const result = knight.simulateMovement()
//       // assert
//       expect(result).to.deep.equalInAnyOrder(expected)
//     })
//   })
// })