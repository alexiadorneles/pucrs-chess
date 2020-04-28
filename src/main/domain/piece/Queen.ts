import { Color } from '../../definitions/Color'
import { PieceKind } from '../../definitions/PieceKind'
import { DiagonalMovement } from '../movement/DiagonalMovement'
import { HorizontalMovement } from '../movement/HorizontalMovement'
import { VerticalMovement } from '../movement/VerticalMovement'
import { Piece } from './Piece'

export class Queen extends Piece {
  constructor(cor: Color) {
    const movements = [new VerticalMovement(), new HorizontalMovement(), new DiagonalMovement()]
    super(PieceKind.QUEEN, cor, movements, true)
  }
}
