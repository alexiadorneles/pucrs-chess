import { Movimento } from './Movimento'
import { OffsetMovimento, TipoMovimento, Posicao } from '../../definitions/Movimento'
import { Peca } from '../peca/Peca'

export class MovimentoVertical extends Movimento {
  constructor() { super(TipoMovimento.VERTICAL) }
  protected offsetMovimentos: OffsetMovimento[] = [{ coluna: 0, linha: 1 }]

  public simularMovimento({ linha, coluna }: Posicao, peca: Peca): Posicao[] {
    let isPosicaoOcupada = false
    let movimentoLinha = linha + 1

    const posicoes = []
    const tabuleiro = peca.getTabuleiro()

    while (!isPosicaoOcupada) {
      const nextMoviment = { linha: movimentoLinha, coluna }
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada(nextMoviment)
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(nextMoviment)) {
        posicoes.push(nextMoviment)
      }
      if (movimentoLinha >= 7) break
      else movimentoLinha = movimentoLinha + 1
    }

    if (peca.isVaiPraTras()) {
      isPosicaoOcupada = false
      movimentoLinha = linha - 1
      while (!isPosicaoOcupada) {
        const nextMoviment = { linha: movimentoLinha, coluna: coluna }
        isPosicaoOcupada = tabuleiro.isPosicaoOcupada(nextMoviment)
        if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(nextMoviment)) {
          posicoes.push(nextMoviment)
        }
        if (movimentoLinha <= 0) break
        else movimentoLinha = movimentoLinha - 1
      }
    }
    return posicoes
  }
}
