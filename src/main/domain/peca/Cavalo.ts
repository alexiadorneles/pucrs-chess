import { Color } from '../../definitions/Color'
import { PieceKind } from '../../definitions/PieceKind'
import { LMovement } from '../movement/LMovement'
import { Peca } from './Peca'

export class Cavalo extends Peca {
  constructor(cor: Color) {
    const movimentos = [new LMovement()]
    super(PieceKind.KNIGHT, cor, movimentos, true)
  }
}
