import { Movimento } from './Movimento'
import { OffsetMovimento, TipoMovimento, Posicao } from '../../definitions/Movimento'
import { Peca } from '../peca/Peca'
import { ModificadorImpl } from '../ModificadorImpl'

export class MovimentoVertical extends Movimento {
  constructor() { super(TipoMovimento.VERTICAL) }
  protected offsetMovimentos: OffsetMovimento[] = [
    {
      modificadorColuna: new ModificadorImpl(0, ModificadorImpl.soma),
      modificadorLinha: new ModificadorImpl(1, ModificadorImpl.soma),
    },
    {
      modificadorColuna: new ModificadorImpl(0, ModificadorImpl.subtracao),
      modificadorLinha: new ModificadorImpl(1, ModificadorImpl.subtracao),
    }
  ]

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
