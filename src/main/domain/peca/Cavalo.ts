import { Cor } from '../../definitions/Cor'
import { Posicao } from '../../definitions/Movimento'
import { TipoPeca } from '../../definitions/TipoPeca'
import { ExtensorPosicoes } from '../../ExtensorPosicoes'
import { MovimentoL } from '../movimento/MovimentoL'
import { Peca } from './Peca'

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
