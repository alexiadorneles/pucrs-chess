import { Color } from '../../definitions/Color'
import { PieceKind } from '../../definitions/PieceKind'
import { DiagonalMovement } from '../movement/DiagonalMovement'
import { Piece } from './Piece'

export class Bishop extends Piece {
  constructor(color: Color) {
    const movements = [new DiagonalMovement()]
    super(PieceKind.BISHOP, color, movements, true)
  }
}
