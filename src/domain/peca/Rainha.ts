import { Peca } from './Peca'
import { TipoPeca } from '../../definitions/TipoPeca'
import { Cor } from '../../definitions/Cor'
import { MovimentoVertical } from '../movimento/MovimentoVertical'
import { MovimentoHorizontal } from '../movimento/MovimentoHorizontal'
import { MovimentoDiagonal } from '../movimento/MovimentoDiagonal'
import { ExtensorPosicoes } from '../../ExtensorPosicoes'
import { Posicao } from '../../definitions/Movimento'

export class Rainha extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoVertical(), new MovimentoHorizontal(), new MovimentoDiagonal()]
    super(TipoPeca.RAINHA, cor, movimentos, true)
  }

  public simularMovimento(): Posicao[] {
    const posicao = this.getItemTabuleiro().getPosicao()
    const extensaoVertical = ExtensorPosicoes.extenderVertical([posicao])
    return extensaoVertical.concat(ExtensorPosicoes.extenderHorizontal([posicao])).concat(ExtensorPosicoes.extenderDiagonal([posicao]))
  }
}
