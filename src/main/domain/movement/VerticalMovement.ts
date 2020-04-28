import { MovementOffset, MovementKind } from '../../definitions/Movement'
import { ModifierImpl } from '../ModifierImpl'
import { Movement } from './Movement'

export class VerticalMovement extends Movement {
  constructor() { super(MovementKind.VERTICAL) }
  public getMovementOffsets(): MovementOffset[] {
    return [
      {
        columnModifier: new ModifierImpl(0, ModifierImpl.sum),
        lineModifier: new ModifierImpl(1, ModifierImpl.sum),
      },
      {
        columnModifier: new ModifierImpl(0, ModifierImpl.minus),
        lineModifier: new ModifierImpl(1, ModifierImpl.minus),
      }
    ]
  }
}
