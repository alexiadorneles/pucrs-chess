import { Cor } from '../../definitions/Cor'
import { Posicao } from '../../definitions/Movimento'
import { TipoPeca } from '../../definitions/TipoPeca'
import { MovimentoDiagonal } from '../movimento/MovimentoDiagonal'
import { MovimentoHorizontal } from '../movimento/MovimentoHorizontal'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { Tabuleiro } from '../Tabuleiro'
import { Peca } from './Peca'

export class Rei extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoVertical(), new MovimentoHorizontal(), new MovimentoDiagonal()]
    super(TipoPeca.REI, cor, movimentos, true)
  }

  public simularMovimento(): Posicao[] {
    const posicaoPeca = this.itemTabuleiro.getPosicao()
    return this.movimentos
      .map(movimento => movimento.simularMovimento(posicaoPeca, this))
      .reduce((aggregation, movimento: Posicao[]) => aggregation.concat(movimento), [])
  }
}
