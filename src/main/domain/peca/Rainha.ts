import { Color } from '../../definitions/Color'
import { PieceKind } from '../../definitions/PieceKind'
import { DiagonalMovement } from '../movement/DiagonalMovement'
import { HorizontalMovement } from '../movement/HorizontalMovement'
import { VerticalMovement } from '../movement/VerticalMovement'
import { Peca } from './Peca'

export class Rainha extends Peca {
  constructor(cor: Color) {
    const movimentos = [new VerticalMovement(), new HorizontalMovement(), new DiagonalMovement()]
    super(PieceKind.QUEEN, cor, movimentos, true)
  }
}
