import { MovementAdapter } from '../../adapter'
import { MovementKind, MovementOffset } from '../../definitions/Movement'
import { Movement } from './Movement'

export class DiagonalMovement extends Movement {
  constructor() {
    super(MovementKind.DIAGONAL)
  }
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
