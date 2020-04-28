import { Color } from '../../definitions/Color'
import { TipoPeca } from '../../definitions/TipoPeca'
import { MovimentoDiagonal } from '../movimento/MovimentoDiagonal'
import { Peca } from './Peca'

export class Bispo extends Peca {
  constructor(cor: Color) {
    const movimentos = [new MovimentoDiagonal()]
    super(TipoPeca.BISPO, cor, movimentos, true)
  }
}
