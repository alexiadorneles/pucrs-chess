import _ from 'lodash'
import { MovementKind, MovementOffset, Position } from '../../definitions/Movement'
import { Board } from '../board/Board'
import { Model, ControlAttribute } from '../../definitions/Model'

export interface MovementAttributes extends ControlAttribute<Movement> {
  kind: MovementKind
}

export abstract class Movement extends Model<MovementAttributes> {
  constructor(kind: MovementKind) {
    super()
    this.set('kind', kind)
  }

  public abstract getMovementOffsets(): MovementOffset[]

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
