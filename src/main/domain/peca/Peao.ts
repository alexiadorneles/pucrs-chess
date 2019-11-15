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
    const posicaoAtual = this.itemTabuleiro.getPosicao()
    const novaPosicao = { ...posicaoAtual }
    novaPosicao.linha = this.cor === Cor.BRANCAS ? ++posicaoAtual.linha : --posicaoAtual.linha
    return _.castArray(novaPosicao)
  }
}
