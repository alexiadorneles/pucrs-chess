import { Peca } from './Peca'
import { TipoPeca } from '../../definitions/TipoPeca'
import { Cor } from '../../definitions/Cor'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { Tabuleiro } from '../Tabuleiro'
import { Posicao } from '../../definitions/Movimento'

export class Peao extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoVertical()]
    super(TipoPeca.PEAO, cor, movimentos, false)
  }
  public simularMovimento(tabuleiro: Tabuleiro): Posicao[] {
    const posicaoPeca = this.itemTabuleiro.getPosicao()
    return this.movimentos
      .map(movimento => movimento.simularMovimento(posicaoPeca, this))
      .reduce((aggregation, movimento: Posicao[]) => aggregation.concat(movimento), [])

  }
}
