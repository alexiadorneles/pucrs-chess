import { Cor } from '../../definitions/Cor'
import { Posicao } from '../../definitions/Movimento'
import { TipoPeca } from '../../definitions/TipoPeca'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { Tabuleiro } from '../Tabuleiro'
import { Peca } from './Peca'

export class Peao extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoVertical()]
    super(TipoPeca.PEAO, cor, movimentos, false)
  }

  public simularMovimento(): Posicao[] {
    const posicaoPeca = this.itemTabuleiro.getPosicao()
    return this.movimentos
      .map(movimento => movimento.simularMovimento(posicaoPeca, this))
      .reduce((aggregation, movimento: Posicao[]) => aggregation.concat(movimento), [])

  }
}
