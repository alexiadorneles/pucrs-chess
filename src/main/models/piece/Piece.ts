import _ from 'lodash'
import { Color } from '../../definitions/Color'
import { Position } from '../../definitions/Movement'
import { PieceKind } from '../../definitions/PieceKind'
import { BoardItemAttributes } from '../board/BoardItem'
import { ControlAttribute, Model } from '../Model'
import { Movement } from '../movement/Movement'
import { Board } from '../board/Board'

export interface PieceAttributes extends ControlAttribute<Piece> {
  boardItem: Model<BoardItemAttributes>
  kind: PieceKind
  movements: Movement[]
  color: Color
  isAllowedToGoBackwards: boolean
}

export abstract class Piece extends Model<PieceAttributes> {
  constructor(
    kind: PieceKind,
    color: Color,
    movements: Movement[],
    isAllowedToGoBackwards: boolean,
  ) {
    super()
    this.set('kind', kind)
    this.set('color', color)
    this.set('movements', movements)
    this.set('isAllowedToGoBackwards', isAllowedToGoBackwards)
  }

  public getBoard(): Board {
    return this.get('boardItem').get('board')
  }

  public simulateMovement(): Position[] {
    const currentPosition = this.get('boardItem').get('position')
    const positions = this.get('movements').map(movement =>
      movement.executeSimulation(currentPosition, this.getBoard()),
    )
    return _.flatten(positions)
  }
}
