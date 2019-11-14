import { Peca } from './Peca'
import { TipoPeca } from '../../definitions/TipoPeca'
import { Cor } from '../../definitions/Cor'
import { MovimentoL } from '../movimento/MovimentoL'
import { Posicao } from '../../definitions/Movimento'
import { ExtensorPosicoes } from '../../ExtensorPosicoes'

export class Cavalo extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoL()]
    super(TipoPeca.CAVALO, cor, movimentos, true)
  }

  public podeMover(posicao: Posicao, ocupada: boolean): boolean {
    return true
  }

  public simularMovimento(): Posicao[] {
    const posicao = this.getItemTabuleiro().getPosicao()
    return ExtensorPosicoes.extenderL([posicao])
  }
}
