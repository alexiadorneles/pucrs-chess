import { MovementOffset, MovementKind } from '../../definitions/Movement'
import { ModificadorImpl } from '../ModificadorImpl'
import { Movement } from './Movement'

export class VerticalMovement extends Movement {
  constructor() { super(MovementKind.VERTICAL) }
  public getMovementOffsets(): MovementOffset[] {
    return [
      {
        columnModifier: new ModificadorImpl(0, ModificadorImpl.soma),
        lineModifier: new ModificadorImpl(1, ModificadorImpl.soma),
      },
      {
        columnModifier: new ModificadorImpl(0, ModificadorImpl.subtracao),
        lineModifier: new ModificadorImpl(1, ModificadorImpl.subtracao),
      }
    ]
  }
}
