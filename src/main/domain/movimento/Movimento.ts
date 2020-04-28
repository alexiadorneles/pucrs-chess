import _ from 'lodash'
import { MovementOffset, Position, MovementKind } from '../../definitions/Movement'
import { Tabuleiro } from '../Tabuleiro'

export abstract class Movimento {
  constructor(private tipo: MovementKind) {}
  public abstract getOffsetMovimentos(): MovementOffset[]

  public getTipo(): MovementKind {
    return this.tipo
  }

  public simularMovimento(posicao: Position, tabuleiro: Tabuleiro): Position[] {
    const bindedGetter: () => Position[] = this.getPosicoesValidasPorOffset.bind(
      this,
      posicao,
      tabuleiro,
    )
    const posicoes = this.getOffsetMovimentos().map(bindedGetter)
    return _.flatten(posicoes)
  }

  private getPosicoesValidasPorOffset(
    posicaoInicial: Position,
    tabuleiro: Tabuleiro,
    offset: MovementOffset,
  ): Position[] {
    let isPosicaoValida = true
    let posicao = { ...posicaoInicial }
    const posicoes = []
    while (isPosicaoValida) {
      posicao = this.criarNovaPosicaoBaseadaEmOffset(posicao, offset)
      isPosicaoValida = tabuleiro.isPosicaoValida(posicao)
      if (isPosicaoValida) {
        posicoes.push(posicao)
      } else if (tabuleiro.isBloqueadaPorOponente(posicao, posicaoInicial)) {
        posicoes.push(posicao)
      }
    }
    return posicoes
  }

  public criarNovaPosicaoBaseadaEmOffset(
    { line, column }: Position,
    { columnModifier, lineModifier }: MovementOffset,
  ): Position {
    return {
      line: lineModifier.apply(line),
      column: columnModifier.apply(column),
    }
  }
}
