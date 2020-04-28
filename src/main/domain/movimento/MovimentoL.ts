import { MovementOffset, Position, MovementKind } from '../../definitions/Movimento'
import { ModificadorImpl } from '../ModificadorImpl'
import { Tabuleiro } from '../Tabuleiro'
import { Movimento } from './Movimento'

export class MovimentoL extends Movimento {
  constructor() { super(MovementKind.L) }
  public getOffsetMovimentos(): MovementOffset[] {
    return [
      {
        lineModifier: new ModificadorImpl(2, ModificadorImpl.soma),
        columnModifier: new ModificadorImpl(1, ModificadorImpl.soma),
      },
      {
        lineModifier: new ModificadorImpl(2, ModificadorImpl.soma),
        columnModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
      },
      {
        lineModifier: new ModificadorImpl(2, ModificadorImpl.subtracao),
        columnModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
      },
      {
        lineModifier: new ModificadorImpl(2, ModificadorImpl.subtracao),
        columnModifier: new ModificadorImpl(1, ModificadorImpl.soma),
      },
      {
        lineModifier: new ModificadorImpl(1, ModificadorImpl.soma),
        columnModifier: new ModificadorImpl(2, ModificadorImpl.soma),
      },
      {
        lineModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
        columnModifier: new ModificadorImpl(2, ModificadorImpl.soma),
      },
      {
        lineModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
        columnModifier: new ModificadorImpl(2, ModificadorImpl.subtracao),
      },
      {
        lineModifier: new ModificadorImpl(1, ModificadorImpl.soma),
        columnModifier: new ModificadorImpl(2, ModificadorImpl.subtracao),
      },
    ]
  }

  public simularMovimento(posicaoInicial: Position, tabuleiro: Tabuleiro): Position[] {
    return this.getOffsetMovimentos()
      .map(offset => this.criarNovaPosicaoBaseadaEmOffset(posicaoInicial, offset))
      .filter(posicao => tabuleiro.isPosicaoExistente(posicao))
      .filter(posicao =>
        !tabuleiro.isPosicaoOcupada(posicao) ||
        tabuleiro.isBloqueadaPorOponente(posicao, posicaoInicial)
      )
  }
}
