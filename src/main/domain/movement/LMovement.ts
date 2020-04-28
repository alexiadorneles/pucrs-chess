import { MovementOffset, Position, MovementKind } from '../../definitions/Movement'
import { ModificadorImpl } from '../ModificadorImpl'
import { Tabuleiro } from '../Tabuleiro'
import { Movement } from './Movement'

export class LMovement extends Movement {
  constructor() {
    super(MovementKind.L)
  }
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

  public executeSimulation(initialPosition: Position, board: Tabuleiro): Position[] {
    return this.getMovementOffsets()
      .map(offset => this.createNewPositionBasedOnOffset(initialPosition, offset))
      .filter(position => board.isPosicaoExistente(position))
      .filter(
        position =>
          !board.isPosicaoOcupada(position) ||
          board.isBloqueadaPorOponente(position, initialPosition),
      )
  }
}
