import { OffsetMovimento, Posicao, TipoMovimento } from '../../definitions/Movimento'
import { Peca } from '../peca/Peca'

export abstract class Movimento {
  constructor(private tipo: TipoMovimento) { }
  protected offsetMovimentos: OffsetMovimento[]

  public getTipo(): TipoMovimento {
    return this.tipo
  }

  public simularMovimento(posicao: Posicao, peca: Peca): Posicao[] {
    // let isPosicaoOcupada = false
    // const posicoes: Posicao[] = []
    // const tabuleiro = peca.getTabuleiro()
    // let proximaPosicao = { ...posicao }
    // this.offsetMovimentos.forEach(offset => {
    //   while (!isPosicaoOcupada) {
    //     proximaPosicao = this.criarNovaPosicaoBaseadaEmOffset(proximaPosicao, offset)
    //     isPosicaoOcupada = tabuleiro.isPosicaoOcupada(proximaPosicao)
    //     if (!tabuleiro.isPosicaoValida(proximaPosicao)) break
    //     if (!isPosicaoOcupada) posicoes.push(proximaPosicao)
    //   }
    // })
    // return posicoes
    return []
  }

  protected criarNovaPosicaoBaseadaEmOffset(
    { linha, coluna }: Posicao,
    { modificadorColuna, modificadorLinha }: OffsetMovimento
  ): Posicao {
    return {
      linha: modificadorLinha.apply(linha),
      coluna: modificadorColuna.apply(coluna),
    }
  }
}
