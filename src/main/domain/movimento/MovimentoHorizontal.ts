import { Movimento } from './Movimento'
import { OffsetMovimento, TipoMovimento, Posicao } from '../../definitions/Movimento'
import { Peca } from '../peca/Peca'
import { ModificadorImpl } from '../ModificadorImpl'

export class MovimentoHorizontal extends Movimento {
  constructor() { super(TipoMovimento.HORIZONTAL) }
  protected offsetMovimentos: OffsetMovimento[] = [
    {
      modificadorColuna: new ModificadorImpl(1, ModificadorImpl.soma),
      modificadorLinha: new ModificadorImpl(0, ModificadorImpl.soma),
    },
    {
      modificadorColuna: new ModificadorImpl(1, ModificadorImpl.subtracao),
      modificadorLinha: new ModificadorImpl(0, ModificadorImpl.soma),
    },
  ]

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
