import { Movimento } from './Movimento'
import { OffsetMovimento, TipoMovimento, Posicao } from '../../definitions/Movimento'
import { Peca } from '../peca/Peca'

export class MovimentoHorizontal extends Movimento {
  constructor() { super(TipoMovimento.HORIZONTAL) }
  protected offsetMovimentos: OffsetMovimento[] = [{ coluna: 1, linha: 0 }]

  public simularMovimento({ linha, coluna }: Posicao, peca: Peca): Posicao[] {
    let isPosicaoOcupada = false
    let movimentoColuna = coluna + 1

    const posicoes = []
    const tabuleiro = peca.getTabuleiro()

    while (!isPosicaoOcupada) {
      const proximaPosicao = { linha, coluna: movimentoColuna }
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao)
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
        posicoes.push(proximaPosicao)
      }
      if (movimentoColuna >= 7) break
      else movimentoColuna = movimentoColuna + 1
    }

    isPosicaoOcupada = false
    movimentoColuna = coluna - 1
    while (!isPosicaoOcupada) {
      const nextMoviment = { linha, coluna: movimentoColuna }
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada({ linha: linha, coluna: movimentoColuna })
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(nextMoviment)) {
        posicoes.push(nextMoviment)
      }
      if (movimentoColuna <= 0) break
      else movimentoColuna = movimentoColuna - 1
    }
    return posicoes
  }

}
