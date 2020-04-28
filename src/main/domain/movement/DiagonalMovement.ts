import { MovementOffset, MovementKind } from '../../definitions/Movement'
import { ModifierImpl } from '../ModifierImpl'
import { Movement } from './Movement'

export class DiagonalMovement extends Movement {
  constructor() { super(MovementKind.DIAGONAL) }
  public getMovementOffsets(): MovementOffset[] {
    return [
      {
        lineModifier: new ModifierImpl(1, ModifierImpl.sum),
        columnModifier: new ModifierImpl(1, ModifierImpl.sum),
      },
      {
        lineModifier: new ModifierImpl(1, ModifierImpl.sum),
        columnModifier: new ModifierImpl(1, ModifierImpl.minus),
      },
      {
        lineModifier: new ModifierImpl(1, ModifierImpl.minus),
        columnModifier: new ModifierImpl(1, ModifierImpl.minus),
      },
      {
        lineModifier: new ModifierImpl(1, ModifierImpl.minus),
        columnModifier: new ModifierImpl(1, ModifierImpl.sum),
      },
    ]
  }
}
