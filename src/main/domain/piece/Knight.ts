import { Color } from '../../definitions/Color'
import { PieceKind } from '../../definitions/PieceKind'
import { LMovement } from '../movement/LMovement'
import { Piece } from './Piece'

export class Knight extends Piece {
  constructor(cor: Color) {
    const movements = [new LMovement()]
    super(PieceKind.KNIGHT, cor, movements, true)
  }
}
