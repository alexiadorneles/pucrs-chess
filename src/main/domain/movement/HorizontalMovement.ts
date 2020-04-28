import { MovementOffset, MovementKind } from '../../definitions/Movement'
import { ModifierImpl } from '../ModifierImpl'
import { Movement } from './Movement'

export class HorizontalMovement extends Movement {
  constructor() { super(MovementKind.HORIZONTAL) }
  public getMovementOffsets(): MovementOffset[] {
    return [
      {
        columnModifier: new ModifierImpl(1, ModifierImpl.sum),
        lineModifier: new ModifierImpl(0, ModifierImpl.sum),
      },
      {
        columnModifier: new ModifierImpl(1, ModifierImpl.minus),
        lineModifier: new ModifierImpl(0, ModifierImpl.sum),
      },
    ]
  }
}
