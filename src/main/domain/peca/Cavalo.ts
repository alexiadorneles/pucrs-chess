import { Cor } from '../../definitions/Cor'
import { TipoPeca } from '../../definitions/TipoPeca'
import { MovimentoL } from '../movimento/MovimentoL'
import { Peca } from './Peca'

export class Cavalo extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoL()]
    super(TipoPeca.CAVALO, cor, movimentos, true)
  }
}
