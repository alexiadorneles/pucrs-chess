import { Peca } from './Peca'
import { Cor } from '../../definitions/Cor'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { MovimentoHorizontal } from '../movimento/MovimentoHorizontal'
import { MovimentoDiagonal } from '../movimento/MovimentoDiagonal'
import { TipoPeca } from '../../definitions/TipoPeca'
import { Tabuleiro } from '../../domain/Tabuleiro'
import { Posicao } from '../../definitions/Movimento'

export class Rei extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoVertical(), new MovimentoHorizontal(), new MovimentoDiagonal()]
    super(TipoPeca.REI, cor, movimentos, true)
  }
  public simularMovimento(tabuleiro: Tabuleiro): Posicao[] {
    const posicaoPeca = this.itemTabuleiro.getPosicao()
    return this.movimentos
      .map(movimento => movimento.simularMovimento(posicaoPeca, this))
      .reduce((aggregation, movimento: Posicao[]) => aggregation.concat(movimento), [])

  }

}
