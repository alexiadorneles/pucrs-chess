import { Cor } from '../../definitions/Cor'
import { Posicao } from '../../definitions/Movimento'
import { TipoPeca } from '../../definitions/TipoPeca'
import { ExtensorPosicoes } from '../../ExtensorPosicoes'
import { MovimentoL } from '../movimento/MovimentoL'
import { Peca } from './Peca'
import { Tabuleiro } from '../Tabuleiro'

export class Cavalo extends Peca {
  constructor(cor: Cor) {
    const movimentos = [new MovimentoL()]
    super(TipoPeca.CAVALO, cor, movimentos, true)
  }

  public simularMovimento(): Posicao[] {
    const { linha, coluna } = this.getItemTabuleiro().getPosicao()
    const novasPosicoes: Posicao[] = []
    novasPosicoes.push({ linha: linha + 2, coluna: coluna + 1 })
    novasPosicoes.push({ linha: linha - 2, coluna: coluna + 1 })
    novasPosicoes.push({ linha: linha - 2, coluna: coluna - 1 })
    novasPosicoes.push({ linha: linha + 2, coluna: coluna - 1 })
    novasPosicoes.push({ linha: linha + 1, coluna: coluna + 2 })
    novasPosicoes.push({ linha: linha + 1, coluna: coluna - 2 })
    novasPosicoes.push({ linha: linha - 1, coluna: coluna + 2 })
    novasPosicoes.push({ linha: linha - 1, coluna: coluna - 2 })
    return novasPosicoes.filter(this.getItemTabuleiro().getTabuleiro().isPosicaoValida)
  }
}
