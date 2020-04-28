import { MovementOffset, MovementKind } from '../../definitions/Movement'
import { ModificadorImpl } from '../ModificadorImpl'
import { Movement } from './Movement'

export class HorizontalMovement extends Movement {
  constructor() { super(MovementKind.HORIZONTAL) }
  public getMovementOffsets(): MovementOffset[] {
    return [
      {
        columnModifier: new ModificadorImpl(1, ModificadorImpl.soma),
        lineModifier: new ModificadorImpl(0, ModificadorImpl.soma),
      },
      {
        columnModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
        lineModifier: new ModificadorImpl(0, ModificadorImpl.soma),
      },
    ]
  }
}
