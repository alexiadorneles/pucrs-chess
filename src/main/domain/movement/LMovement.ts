import { MovementOffset, Position, MovementKind } from '../../definitions/Movement'
import { ModifierImpl } from '../ModifierImpl'
import { Board } from '../Board'
import { Movement } from './Movement'

export class LMovement extends Movement {
  constructor() {
    super(MovementKind.L)
  }
  public getMovementOffsets(): MovementOffset[] {
    return [
      {
        lineModifier: new ModifierImpl(2, ModifierImpl.sum),
        columnModifier: new ModifierImpl(1, ModifierImpl.sum),
      },
      {
        lineModifier: new ModifierImpl(2, ModifierImpl.sum),
        columnModifier: new ModifierImpl(1, ModifierImpl.minus),
      },
      {
        lineModifier: new ModifierImpl(2, ModifierImpl.minus),
        columnModifier: new ModifierImpl(1, ModifierImpl.minus),
      },
      {
        lineModifier: new ModifierImpl(2, ModifierImpl.minus),
        columnModifier: new ModifierImpl(1, ModifierImpl.sum),
      },
      {
        lineModifier: new ModifierImpl(1, ModifierImpl.sum),
        columnModifier: new ModifierImpl(2, ModifierImpl.sum),
      },
      {
        lineModifier: new ModifierImpl(1, ModifierImpl.minus),
        columnModifier: new ModifierImpl(2, ModifierImpl.sum),
      },
      {
        lineModifier: new ModifierImpl(1, ModifierImpl.minus),
        columnModifier: new ModifierImpl(2, ModifierImpl.minus),
      },
      {
        lineModifier: new ModifierImpl(1, ModifierImpl.sum),
        columnModifier: new ModifierImpl(2, ModifierImpl.minus),
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
