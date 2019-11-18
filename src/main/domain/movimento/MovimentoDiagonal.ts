import { Movimento } from './Movimento'
import { TipoMovimento, OffsetMovimento, Posicao } from '../../definitions/Movimento'
import { Peca } from '../peca/Peca'
import { ModificadorImpl } from '../ModificadorImpl'

export class MovimentoDiagonal extends Movimento {
  constructor() { super(TipoMovimento.DIAGONAL) }
  protected offsetMovimentos: OffsetMovimento[] = [
    {
      modificadorLinha: new ModificadorImpl(1, ModificadorImpl.soma),
      modificadorColuna: new ModificadorImpl(1, ModificadorImpl.soma),
    },
    {
      modificadorLinha: new ModificadorImpl(1, ModificadorImpl.soma),
      modificadorColuna: new ModificadorImpl(1, ModificadorImpl.subtracao),
    },
    {
      modificadorLinha: new ModificadorImpl(1, ModificadorImpl.subtracao),
      modificadorColuna: new ModificadorImpl(1, ModificadorImpl.subtracao),
    },
    {
      modificadorLinha: new ModificadorImpl(1, ModificadorImpl.subtracao),
      modificadorColuna: new ModificadorImpl(1, ModificadorImpl.soma),
    },
  ]

  public simularMovimento({ linha, coluna }: Posicao, peca: Peca): Posicao[] {
    let isPosicaoOcupada = false
    let movimentoLinha = linha + 1
    let movimentoColuna = coluna - 1

    const posicoes = []
    const tabuleiro = peca.getTabuleiro()

    while (!isPosicaoOcupada) {
      const proximaPosicao = { linha: movimentoLinha, coluna: movimentoColuna }
      if (!tabuleiro.isPosicaoValida(proximaPosicao)) break
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao)
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
        posicoes.push(proximaPosicao)
      }
      else {
        movimentoLinha = movimentoLinha + 1
        movimentoColuna = movimentoColuna - 1
      }
    }

    isPosicaoOcupada = false
    movimentoLinha = linha - 1
    movimentoColuna = coluna + 1
    while (!isPosicaoOcupada) {
      const proximaPosicao = { linha: movimentoLinha, coluna: movimentoColuna }
      if (!tabuleiro.isPosicaoValida(proximaPosicao)) break
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao)
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
        posicoes.push(proximaPosicao)
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
      const proximaPosicao = { linha: movimentoLinha, coluna: movimentoColuna }
      if (!tabuleiro.isPosicaoValida(proximaPosicao)) break
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao)
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
        posicoes.push(proximaPosicao)
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
      const proximaPosicao = { linha: movimentoLinha, coluna: movimentoColuna }
      if (!tabuleiro.isPosicaoValida(proximaPosicao)) break
      isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao)
      if (!isPosicaoOcupada && tabuleiro.isPosicaoExistente(proximaPosicao)) {
        posicoes.push(proximaPosicao)
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
