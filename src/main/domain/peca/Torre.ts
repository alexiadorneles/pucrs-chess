import { Color } from '../../definitions/Color'
import { PieceKind } from '../../definitions/PieceKind'
import { HorizontalMovement } from '../movement/HorizontalMovement'
import { VerticalMovement } from '../movement/VerticalMovement'
import { Peca } from './Peca'

export class Torre extends Peca {
  constructor(cor: Color) {
    const movimentos = [new VerticalMovement(), new HorizontalMovement()]
    super(PieceKind.TOWER, cor, movimentos, true)
  }
}
