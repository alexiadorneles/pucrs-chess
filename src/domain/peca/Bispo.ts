import { Peca } from './Peca'
import { TipoPeca } from '../../definitions/TipoPeca'
import { Cor } from '../../definitions/Cor'
import { MovimentoDiagonal } from '../movimento/MovimentoDiagonal'

export class Bispo extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoDiagonal()]
    super(TipoPeca.BISPO, cor, movimentos, true)
  }
}
