import { MovementAdapter } from '../../adapter'
import { MovementKind, MovementOffset } from '../../definitions/Movement'
import { Movement } from './Movement'

export class VerticalMovement extends Movement {
  constructor() {
    super(MovementKind.VERTICAL)
  }
  public getMovementOffsets(): MovementOffset[] {
    return [
      {
        columnModifier: new MovementAdapter(0, MovementAdapter.sum),
        lineModifier: new MovementAdapter(1, MovementAdapter.sum),
      },
      {
        columnModifier: new MovementAdapter(0, MovementAdapter.minus),
        lineModifier: new MovementAdapter(1, MovementAdapter.minus),
      },
    ]
  }
}
