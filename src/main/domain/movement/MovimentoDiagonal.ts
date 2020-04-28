import { MovementOffset, MovementKind } from '../../definitions/Movement'
import { ModificadorImpl } from '../ModificadorImpl'
import { Movement } from './Movement'

export class MovimentoDiagonal extends Movement {
  constructor() { super(MovementKind.DIAGONAL) }
  public getMovementOffsets(): MovementOffset[] {
    return [
      {
        lineModifier: new ModificadorImpl(1, ModificadorImpl.soma),
        columnModifier: new ModificadorImpl(1, ModificadorImpl.soma),
      },
      {
        lineModifier: new ModificadorImpl(1, ModificadorImpl.soma),
        columnModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
      },
      {
        lineModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
        columnModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
      },
      {
        lineModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
        columnModifier: new ModificadorImpl(1, ModificadorImpl.soma),
      },
    ]
  }
}
