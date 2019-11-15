import { Movimento } from './Movimento'
import { OffsetMovimento, TipoMovimento, Posicao } from '../../definitions/Movimento'
import { Peca } from '../peca/Peca'

export class MovimentoHorizontal extends Movimento {
  constructor() { super(TipoMovimento.HORIZONTAL) }
  protected offsetMovimentos: OffsetMovimento[] = [{ coluna: 1, linha: 0 }]

  public simularMovimento({ linha, coluna }: Posicao, peca: Peca): Posicao[] {
    let isPosicaoOcupada = false
    let offset = coluna + 1

    const posicoes = []
    const tabuleiro = peca.getTabuleiro()

    while (!isPosicaoOcupada) {
      const proximaPosicao = { linha, coluna: offset }
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao)
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
        posicoes.push(proximaPosicao)
      }
      if (offset >= 7) break
      else offset = offset + 1
    }

    isPosicaoOcupada = false
    offset = coluna - 1
    while (!isPosicaoOcupada) {
      const proximaPosicao = { linha, coluna: offset }
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao)
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
        posicoes.push(proximaPosicao)
      }
      if (offset <= 0) break
      else offset = offset - 1
    }
    return posicoes
  }

}
