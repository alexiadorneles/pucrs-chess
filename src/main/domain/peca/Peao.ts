import _ from 'lodash'
import { Cor } from '../../definitions/Cor'
import { Posicao } from '../../definitions/Movimento'
import { TipoPeca } from '../../definitions/TipoPeca'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { Peca } from './Peca'

export class Peao extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoVertical()]
    super(TipoPeca.PEAO, cor, movimentos, false)
  }

  public simularMovimento(): Posicao[] {
    const posicaoPeca = this.itemTabuleiro.getPosicao()
    const posicao = this.cor === Cor.BRANCAS
      ? { linha: ++posicaoPeca.linha, coluna: posicaoPeca.coluna }
      : { linha: --posicaoPeca.linha, coluna: posicaoPeca.coluna }
    return _.castArray(posicao)
  }
}
