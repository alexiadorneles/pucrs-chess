import { Cor } from '../../definitions/Cor'
import { TipoPeca } from '../../definitions/TipoPeca'
import { MovimentoDiagonal } from '../movimento/MovimentoDiagonal'
import { Peca } from './Peca'

export class Bispo extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoDiagonal()]
    super(TipoPeca.BISPO, cor, movimentos, true)
  }
}
