import { Movimento } from './Movimento'
import { OffsetMovimento, TipoMovimento, Posicao } from '../../definitions/Movimento'
import { Peca } from '../peca/Peca'

export class MovimentoVertical extends Movimento {
  constructor() { super(TipoMovimento.VERTICAL) }
  protected offsetMovimentos: OffsetMovimento[] = [{ coluna: 0, linha: 1 }]

  public simularMovimento({ linha, coluna }: Posicao, peca: Peca): Posicao[] {
    let isPosicaoOcupada = false
    let offset = linha + 1

    const posicoes = []
    const tabuleiro = peca.getTabuleiro()

    while (!isPosicaoOcupada) {
      const proximaPosicao = { linha: offset, coluna }
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao)
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
        posicoes.push(proximaPosicao)
      }
      if (offset >= 7) break
      else offset = offset + 1
    }

    isPosicaoOcupada = false
    offset = linha - 1
    while (!isPosicaoOcupada) {
      const proximaPosicao = { linha: offset, coluna: coluna }
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
