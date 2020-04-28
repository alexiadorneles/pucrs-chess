import _ from 'lodash'
import { Color } from '../../definitions/Color'
import { Position } from '../../definitions/Movement'
import { PieceKind } from '../../definitions/PieceKind'
import { VerticalMovement } from '../movement/VerticalMovement'
import { Piece } from './Piece'

export class Pawn extends Piece {
  constructor(color: Color) {
    super(PieceKind.PAWN, color, [new VerticalMovement()], false)
  }

  public simulateMovement(): Position[] {
    const currentPosition = this.boardItem.getPosition()
    const newPosition = this.getNewPositionByColor(currentPosition)
    const possibleAttacks = this.getAttacksByColor(currentPosition)
    return _.compact([newPosition, ...possibleAttacks])
  }

  private getNewPositionByColor({ line, column }: Position): Position | null {
    const newLine = this.color === Color.GREY ? ++line : --line
    const newPosition = { line: newLine, column }
    const isOccupied = this.getBoard().getPieceByPosition(newPosition)
    return (!isOccupied && newPosition) || null
  }

  private getAttacksByColor(currentPosition: Position): Position[] {
    const clone = { ...currentPosition }
    const newLine = this.color === Color.GREY ? ++clone.line : --clone.line
    const newPosition = { line: newLine, column: clone.column }
    const { line, column } = newPosition
    const rightDiagonal = { line, column: column + 1 }
    const leftDiagonal = { line, column: column - 1 }
    const attacks = [rightDiagonal, leftDiagonal]
    return attacks.filter(position =>
      this.getBoard().isPositionBlockedByOpponent(position, currentPosition),
    )
  }
}
