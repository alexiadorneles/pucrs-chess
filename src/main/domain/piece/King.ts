import _ from 'lodash'
import { Color } from '../../definitions/Color'
import { Position } from '../../definitions/Movement'
import { PieceKind } from '../../definitions/PieceKind'
import { DiagonalMovement } from '../movement/DiagonalMovement'
import { HorizontalMovement } from '../movement/HorizontalMovement'
import { VerticalMovement } from '../movement/VerticalMovement'
import { Piece } from './Piece'

export class King extends Piece {
  constructor(colors: Color) {
    const movements = [new VerticalMovement(), new HorizontalMovement(), new DiagonalMovement()]
    super(PieceKind.KING, colors, movements, true)
  }

  public simulateMovement(): Position[] {
    const initialPosition = this.getBoardItem().get('position')
    const board = this.getBoard()
    const positions = this.movements.map(movements =>
      movements
        .getMovementOffsets()
        .map(offset => movements.createNewPositionBasedOnOffset(initialPosition, offset))
        .filter(position => board.isPositionInMatrixRange(position))
        .filter(
          position =>
            !board.getPieceByPosition(position) ||
            board.isPositionBlockedByOpponent(position, initialPosition),
        ),
    )

    return _.flatten(positions)
  }
}
