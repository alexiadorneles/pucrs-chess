import { MovementOffset, MovementKind } from '../../definitions/Movement'
import { MovementAdapter } from '../adapter/MovementAdapter'
import { Movement } from './Movement'

export class DiagonalMovement extends Movement {
  constructor() { super(MovementKind.DIAGONAL) }
  public getMovementOffsets(): MovementOffset[] {
    return [
      {
        lineModifier: new MovementAdapter(1, MovementAdapter.sum),
        columnModifier: new MovementAdapter(1, MovementAdapter.sum),
      },
      {
        lineModifier: new MovementAdapter(1, MovementAdapter.sum),
        columnModifier: new MovementAdapter(1, MovementAdapter.minus),
      },
      {
        lineModifier: new MovementAdapter(1, MovementAdapter.minus),
        columnModifier: new MovementAdapter(1, MovementAdapter.minus),
      },
      {
        lineModifier: new MovementAdapter(1, MovementAdapter.minus),
        columnModifier: new MovementAdapter(1, MovementAdapter.sum),
      },
    ]
  }
}
