import { ColorAdapter } from '../adapter'
import { PinkPiecesPositionMap, WhitePiecesPositionMap } from '../constants/InitialPositions'
import { Color } from '../definitions/Color'
import { MovementKind } from '../definitions/Movement'
import { PieceKind } from '../definitions/PieceKind'
import { BoardItem } from '../models/board/BoardItem'
import { DiagonalMovement } from '../models/movement/DiagonalMovement'
import { HorizontalMovement } from '../models/movement/HorizontalMovement'
import { LMovement } from '../models/movement/LMovement'
import { VerticalMovement } from '../models/movement/VerticalMovement'
import { Bishop } from '../models/piece/Bishop'
import { King } from '../models/piece/King'
import { Knight } from '../models/piece/Knight'
import { Pawn } from '../models/piece/Pawn'
import { Piece } from '../models/piece/Piece'
import { Queen } from '../models/piece/Queen'
import { Rook } from '../models/piece/Rook'

export const PieceBuilderMap: Map<PieceKind, new (color: Color) => Piece> = new Map([
  [PieceKind.PAWN, Pawn],
  [PieceKind.KNIGHT, Knight],
  [PieceKind.BISHOP, Bishop],
  [PieceKind.QUEEN, Queen],
  [PieceKind.KING, King],
  [PieceKind.ROOK, Rook],
])

export const MovementBuilderMap = {
  [MovementKind.DIAGONAL]: DiagonalMovement,
  [MovementKind.HORIZONTAL]: HorizontalMovement,
  [MovementKind.VERTICAL]: VerticalMovement,
  [MovementKind.L]: LMovement,
}

export namespace PieceFactory {
  export function createPiece(kind: PieceKind, pieceColor: Color): BoardItem[] {
    const map = pieceColor === Color.WHITE ? WhitePiecesPositionMap : PinkPiecesPositionMap
    return map.get(kind).map(position => {
      const clazz = PieceBuilderMap.get(kind)
      const item = new BoardItem(position, ColorAdapter.defineItemColor(position))
      const piece = new clazz(pieceColor)
      item.set('piece', piece)
      return item
    })
  }
}
