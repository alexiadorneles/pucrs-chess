import { Movimento } from './Movimento'
import { TipoMovimento, OffsetMovimento, Posicao } from '../../definitions/Movimento'
import { Peca } from '../peca/Peca'

export class MovimentoDiagonal extends Movimento {
  constructor() { super(TipoMovimento.DIAGONAL) }
  protected offsetMovimentos: OffsetMovimento[] = [{ coluna: 1, linha: 1 }]

  public simularMovimento({ linha, coluna }: Posicao, peca: Peca): Posicao[] {
    let isPosicaoOcupada = false
    let movimentoLinha = linha + 1
    let movimentoColuna = coluna - 1

    const posicoes = []
    const tabuleiro = peca.getTabuleiro()

    while (!isPosicaoOcupada) {
      const nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna }
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada(nextMoviment)
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(nextMoviment)) {
        posicoes.push(nextMoviment)
      }
      if (movimentoLinha >= 7 || movimentoColuna <= 0) break
      else {
        movimentoLinha = movimentoLinha + 1
        movimentoColuna = movimentoColuna - 1
      }
    }

    isPosicaoOcupada = false
    movimentoLinha = linha - 1
    movimentoColuna = coluna + 1
    while (!isPosicaoOcupada) {
      const nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna }
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada(nextMoviment)
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(nextMoviment)) {
        posicoes.push(nextMoviment)
      }
      if (movimentoLinha <= 0 || movimentoColuna >= 7) break
      else {
        movimentoLinha = movimentoLinha - 1
        movimentoColuna = movimentoColuna + 1
      }
    }

    isPosicaoOcupada = false
    movimentoLinha = linha + 1
    movimentoColuna = coluna + 1
    while (!isPosicaoOcupada) {
      const nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna }
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada(nextMoviment)
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(nextMoviment)) {
        posicoes.push(nextMoviment)
      }
      if (movimentoLinha >= 7 || movimentoColuna >= 7) break
      else {
        movimentoLinha = movimentoLinha + 1
        movimentoColuna = movimentoColuna + 1
      }
    }

    isPosicaoOcupada = false
    movimentoLinha = linha - 1
    movimentoColuna = coluna - 1
    while (!isPosicaoOcupada) {
      const nextMoviment = { linha: movimentoLinha, coluna: movimentoColuna }
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada(nextMoviment)
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(nextMoviment)) {
        posicoes.push(nextMoviment)
      }
      if (movimentoLinha <= 0 || movimentoColuna <= 0) break
      else {
        movimentoLinha = movimentoLinha - 1
        movimentoColuna = movimentoColuna - 1
      }
    }
    return posicoes
  }
}
