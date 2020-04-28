import { JSONObject } from '../definitions/JSONObject'
import { Board } from './board/Board'
import { BoardItem } from './board/BoardItem'
import { Position } from '../definitions/Movement'
import { Piece } from './piece/Piece'

export interface ChessFactory {
  createBoardFromJSON(board: JSONObject): Board
}

export class ChessFactoryImpl implements ChessFactory {
  createBoardFromJSON(loaded: JSONObject): Board {
    const board = Board.copy(loaded as Board)
    board.executeForAll((item: BoardItem, { line, column }: Position) => {
      const itemModel = BoardItem.copy(item)
      if (itemModel.getPiece()) {
        itemModel.addPiece(Piece.copy(itemModel.getPiece()))
      }
      board.matrix[line][column] = itemModel
      itemModel.addToBoard(board)
    })
    return board
  }
}
