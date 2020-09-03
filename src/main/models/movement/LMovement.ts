import { MovementAdapter } from '../../adapter'
import { MovementKind, MovementOffset, Position } from '../../definitions/Movement'
import { Board } from '../board/Board'
import { Movement } from './Movement'

export class LMovement extends Movement {
  constructor() {
    super(MovementKind.L)
  }
  public getMovementOffsets(): MovementOffset[] {
    return [
      {
        lineModifier: new MovementAdapter(2, MovementAdapter.sum),
        columnModifier: new MovementAdapter(1, MovementAdapter.sum),
      },
      {
        lineModifier: new MovementAdapter(2, MovementAdapter.sum),
        columnModifier: new MovementAdapter(1, MovementAdapter.minus),
      },
      {
        lineModifier: new MovementAdapter(2, MovementAdapter.minus),
        columnModifier: new MovementAdapter(1, MovementAdapter.minus),
      },
      {
        lineModifier: new MovementAdapter(2, MovementAdapter.minus),
        columnModifier: new MovementAdapter(1, MovementAdapter.sum),
      },
      {
        lineModifier: new MovementAdapter(1, MovementAdapter.sum),
        columnModifier: new MovementAdapter(2, MovementAdapter.sum),
      },
      {
        lineModifier: new MovementAdapter(1, MovementAdapter.minus),
        columnModifier: new MovementAdapter(2, MovementAdapter.sum),
      },
      {
        lineModifier: new MovementAdapter(1, MovementAdapter.minus),
        columnModifier: new MovementAdapter(2, MovementAdapter.minus),
      },
      {
        lineModifier: new MovementAdapter(1, MovementAdapter.sum),
        columnModifier: new MovementAdapter(2, MovementAdapter.minus),
      },
    ]
  }

  public executeSimulation(initialPosition: Position, board: Board): Position[] {
    return this.getMovementOffsets()
      .map(offset => this.createNewPositionBasedOnOffset(initialPosition, offset))
      .filter(position => board.isPositionInMatrixRange(position))
      .filter(
        position =>
          !board.getPieceByPosition(position) ||
          board.isPositionBlockedByOpponent(position, initialPosition),
      )
  }
}
