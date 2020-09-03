import { Color } from '../../definitions/Color'
import { PieceKind } from '../../definitions/PieceKind'
import { HorizontalMovement } from '../movement/HorizontalMovement'
import { VerticalMovement } from '../movement/VerticalMovement'
import { Piece } from './Piece'

export class Rook extends Piece {
  constructor(cor: Color) {
    const movements = [new VerticalMovement(), new HorizontalMovement()]
    super(PieceKind.ROOK, cor, movements, true)
  }
}
