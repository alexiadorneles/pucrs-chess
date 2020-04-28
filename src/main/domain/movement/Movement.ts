import _ from 'lodash'
import { MovementOffset, Position, MovementKind } from '../../definitions/Movement'
import { Board } from '../board/Board'

export abstract class Movement {
  constructor(private kind: MovementKind) {}
  public abstract getMovementOffsets(): MovementOffset[]

  public getKind(): MovementKind {
    return this.kind
  }

  public executeSimulation(position: Position, board: Board): Position[] {
    const boundGetter = this.getValidPositionsForEachOffset.bind(this, position, board)
    const positions = this.getMovementOffsets().map(boundGetter)
    return _.flatten(positions as Position[])
  }

  private getValidPositionsForEachOffset(
    initialPosition: Position,
    board: Board,
    offset: MovementOffset,
  ): Position[] {
    let isValidPosition = true
    let position = { ...initialPosition }
    const positions = []
    while (isValidPosition) {
      position = this.createNewPositionBasedOnOffset(position, offset)
      isValidPosition = board.isValidPosition(position)
      if (isValidPosition) {
        positions.push(position)
      } else if (board.isPositionBlockedByOpponent(position, initialPosition)) {
        positions.push(position)
      }
    }
    return positions
  }

  public createNewPositionBasedOnOffset(
    { line, column }: Position,
    { columnModifier, lineModifier }: MovementOffset,
  ): Position {
    return {
      line: lineModifier.apply(line),
      column: columnModifier.apply(column),
    }
  }
}
