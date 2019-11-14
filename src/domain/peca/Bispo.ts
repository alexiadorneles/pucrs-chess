import { Peca } from './Peca'
import { TipoPeca } from '../../definitions/TipoPeca'
import { Cor } from '../../definitions/Cor'
import { MovimentoDiagonal } from '../movimento/MovimentoDiagonal'
import { ExtensorPosicoes } from '../../ExtensorPosicoes'
import { Posicao } from '../../definitions/Movimento'

export class Bispo extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoDiagonal()]
    super(TipoPeca.BISPO, cor, movimentos, true)
  }

  public simularMovimento(): Posicao[] {
    return ExtensorPosicoes.extenderDiagonal(this.getItemTabuleiro().getPosicao())
  }
}
