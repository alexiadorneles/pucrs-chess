import { Peca } from './Peca'
import { TipoPeca } from '../../definitions/TipoPeca'
import { Cor } from '../../definitions/Cor'
import { MovimentoVertical } from '../movimento/MovimentoVertical'

export class Peao extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoVertical()]
    super(TipoPeca.PEAO, cor, movimentos, false)
  }
}
