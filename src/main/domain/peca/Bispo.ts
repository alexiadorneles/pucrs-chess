import { Color } from '../../definitions/Color'
import { PieceKind } from '../../definitions/PieceKind'
import { DiagonalMovement } from '../movement/DiagonalMovement'
import { Peca } from './Peca'

export class Bispo extends Peca {
  constructor(cor: Color) {
    const movimentos = [new DiagonalMovement()]
    super(PieceKind.BISHOP, cor, movimentos, true)
  }
}
