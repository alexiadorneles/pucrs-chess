import { Peca } from './Peca'
import { Cor } from '../../definitions/Cor'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { MovimentoHorizontal } from '../movimento/MovimentoHorizontal'
import { TipoPeca } from '../../definitions/TipoPeca'
import { Posicao } from '../../definitions/Movimento'
import { ExtensorPosicoes } from '../../ExtensorPosicoes'

export class Torre extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoVertical(), new MovimentoHorizontal()]
    super(TipoPeca.TORRE, cor, movimentos, true)
  }

  // public simularMovimento(): Posicao[] {
  //   return ExtensorPosicoes.extenderVertical([this.getItemTabuleiro().getPosicao()]).concat(
  //     ExtensorPosicoes.extenderHorizontal([this.getItemTabuleiro().getPosicao()])
  //   )
  // }
}
