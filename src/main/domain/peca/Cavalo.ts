import { Color } from '../../definitions/Color'
import { PieceKind } from '../../definitions/PieceKind'
import { MovimentoL } from '../movimento/MovimentoL'
import { Peca } from './Peca'

export class Cavalo extends Peca {
  constructor(cor: Color) {
    const movimentos = [new MovimentoL()]
    super(PieceKind.KNIGHT, cor, movimentos, true)
  }
}
