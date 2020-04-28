import { MovementOffset, MovementKind } from '../../definitions/Movement'
import { MovementAdapter } from '../adapter/MovementAdapter'
import { Movement } from './Movement'

export class VerticalMovement extends Movement {
  constructor() { super(MovementKind.VERTICAL) }
  public getMovementOffsets(): MovementOffset[] {
    return [
      {
        columnModifier: new MovementAdapter(0, MovementAdapter.sum),
        lineModifier: new MovementAdapter(1, MovementAdapter.sum),
      },
      {
        columnModifier: new MovementAdapter(0, MovementAdapter.minus),
        lineModifier: new MovementAdapter(1, MovementAdapter.minus),
      }
    ]
  }
}
