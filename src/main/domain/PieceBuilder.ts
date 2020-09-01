import { Color } from '../definitions/Color'
import { WhitePiecesPositionMap, PinkPiecesPositionMap } from '../constants/InitialPositions'
import { MovementKind } from '../definitions/Movement'
import { PieceKind } from '../definitions/PieceKind'
import { ColorAdapter } from './adapter/ColorAdapter'
import { BoardItem } from './board/BoardItem'
import { DiagonalMovement } from './movement/DiagonalMovement'
import { HorizontalMovement } from './movement/HorizontalMovement'
import { LMovement } from './movement/LMovement'
import { VerticalMovement } from './movement/VerticalMovement'
import { Bishop } from './piece/Bishop'
import { Knight } from './piece/Knight'
import { Pawn } from './piece/Pawn'
import { Piece } from './piece/Piece'
import { Queen } from './piece/Queen'
import { King } from './piece/King'
import { Rook } from './piece/Rook'

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

export namespace PieceBuilder {
  export function build(kind: PieceKind, pieceColor: Color): BoardItem[] {
    const map = pieceColor === Color.WHITE ? WhitePiecesPositionMap : PinkPiecesPositionMap
    return map.get(kind).map(position => {
      const clazz = PieceBuilderMap.get(kind)
      const item = new BoardItem(position, ColorAdapter.defineItemColor(position))
      const piece = new clazz(pieceColor)
      item.setPiece(piece)
      return item
    })
  }
}
