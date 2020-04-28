import { MovementOffset, Position, MovementKind } from '../../definitions/Movement'
import { ModificadorImpl } from '../ModificadorImpl'
import { Tabuleiro } from '../Tabuleiro'
import { Movement } from './Movement'

export class MovimentoL extends Movement {
  constructor() { super(MovementKind.L) }
  public getMovementOffsets(): MovementOffset[] {
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

  public executeSimulation(posicaoInicial: Position, tabuleiro: Tabuleiro): Position[] {
    return this.getMovementOffsets()
      .map(offset => this.createNewPositionBasedOnOffset(posicaoInicial, offset))
      .filter(posicao => tabuleiro.isPosicaoExistente(posicao))
      .filter(posicao =>
        !tabuleiro.isPosicaoOcupada(posicao) ||
        tabuleiro.isBloqueadaPorOponente(posicao, posicaoInicial)
      )
  }
}
