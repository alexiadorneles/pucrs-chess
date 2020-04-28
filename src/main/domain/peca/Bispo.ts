import { Color } from '../../definitions/Color'
import { PieceKind } from '../../definitions/PieceKind'
import { MovimentoDiagonal } from '../movement/MovimentoDiagonal'
import { Peca } from './Peca'

export class Bispo extends Peca {
  constructor(cor: Color) {
    const movimentos = [new MovimentoDiagonal()]
    super(PieceKind.BISHOP, cor, movimentos, true)
  }
}
